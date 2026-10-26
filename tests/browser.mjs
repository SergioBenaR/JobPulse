// Uses an existing Chrome/Edge installation via its built-in debugging protocol.
// No optional test framework or browser downloads are required.
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const executable = process.env.BROWSER_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = await mkdtemp(join(tmpdir(), 'jobpulse-browser-'));
const browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9224', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let socket;
let sessionId;
let sequence = 0;
const requests = new Map();
const errors = [];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function poll(fn, label) {
  for (let i = 0; i < 80; i++) {
    try { const result = await fn(); if (result) return result; } catch { /* startup/navigation */ }
    await wait(100);
  }
  throw new Error(`Timeout: ${label}`);
}

function call(method, params = {}, inPage = true) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { requests.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    requests.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(inPage && sessionId ? { sessionId } : {}) }));
  });
}

async function evaluate(expression) {
  const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text + ': ' + response.exceptionDetails.exception?.description);
  return response.result.value;
}
const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const text = selector => evaluate(`document.querySelector(${JSON.stringify(selector)})?.textContent`);
async function ready() { await poll(() => evaluate(`!!document.querySelector('#approve, .complete, .recovery')`), 'app ready'); }
async function reload() {
  await evaluate('window.__beforeReload = true');
  await call('Page.reload');
  await poll(() => evaluate('!window.__beforeReload && document.readyState === "complete" && !!document.querySelector("#approve, .complete, .recovery")'), 'new document ready');
}
async function dashboard() { await click('nav [data-view="dashboard"]'); }
async function review() { await click('nav [data-view="review"]'); }
async function screenshot(name) {
  const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const path = join(tmpdir(), 'opencode', `jobpulse-${name}.png`);
  await writeFile(path, Buffer.from(data, 'base64'));
  console.log(`Screenshot: ${path}`);
}

try {
  const version = await poll(async () => { const response = await fetch('http://127.0.0.1:9224/json/version'); return response.json(); }, 'browser start');
  socket = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails);
    if (data.id && requests.has(data.id)) {
      const request = requests.get(data.id);
      requests.delete(data.id);
      clearTimeout(request.timer);
      if (data.error) request.reject(new Error(data.error.message)); else request.resolve(data.result);
    }
  });
  const { targetId } = await call('Target.createTarget', { url: 'about:blank' }, false);
  ({ sessionId } = await call('Target.attachToTarget', { targetId, flatten: true }, false));
  await call('Runtime.enable');
  await call('Page.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await call('Page.navigate', { url: 'http://127.0.0.1:5173' });
  await ready();
  await evaluate('document.fonts.ready');
  await screenshot('desktop');
  assert.equal(await evaluate('document.fonts.check(\'400 12px "Plus Jakarta Sans Variable"\')'), true);
  await dashboard();
  assert.equal(await text('[data-metric="total"]'), '8');
  assert.equal(await text('[data-metric="approved"]'), '5');
  assert.equal(await text('[data-metric="rejected"]'), '3');
  console.log('PASS: initial dashboard metrics');

  await review();
  await click('#reject');
  assert.equal(await evaluate('!!document.querySelector("dialog[open]")'), true);
  assert.equal(await evaluate('document.querySelector("dialog").contains(document.activeElement)'), true);
  await evaluate('document.querySelector("textarea").value = "Borrador cancelado"');
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await poll(() => evaluate('!document.querySelector("dialog[open]")'), 'Escape closes dialog');
  assert.equal(await evaluate('document.activeElement.id'), 'reject');
  await click('#reject');
  assert.equal(await evaluate('document.querySelector("textarea").value'), '');
  await click('input[value="salario"]');
  await click('input[value="beneficios"]');
  await evaluate('document.querySelector("textarea").value = \'Mejorar salario <img src=x onerror="alert(1)">\'');
  await evaluate('document.querySelector("form").requestSubmit()');
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'valle-backend');
  await dashboard();
  assert.equal(await text('[data-metric="total"]'), '9');
  assert.equal(await text('[data-metric="rejected"]'), '4');
  assert.ok((await text('[data-reason="salario"]')).startsWith('3'));
  assert.equal(await evaluate('document.querySelectorAll(".comments-list img").length'), 0);
  assert.ok((await text('.comments-list')).includes('<img src=x'));
  console.log('PASS: cancel/Escape, draft discarded, rejection, multiple reasons and text-safe comment');

  await review();
  await click('#approve');
  await reload();
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'oriente-fullstack');
  await dashboard();
  assert.equal(await text('[data-metric="total"]'), '10');
  assert.equal(await text('[data-metric="approved"]'), '6');
  await screenshot('dashboard');
  console.log('PASS: approval saves immediately and survives reload');

  await review();
  await click('#reject');
  await click('input[value="requisitos"]');
  await evaluate('document.querySelector("textarea").value = "Este borrador debe descartarse"');
  await click('#skip-details');
  assert.match(await text('.complete'), /Has evaluado todas las ofertas/);
  await click('.complete [data-view="dashboard"]');
  assert.equal(await text('[data-metric="total"]'), '11');
  assert.equal(await text('[data-metric="rejected"]'), '5');
  assert.ok(!(await text('.comments-list')).includes('Este borrador'));
  assert.ok((await text('[data-reason="requisitos"]')).startsWith('2'));
  console.log('PASS: skip details, completion and result navigation');

  await evaluate('localStorage.setItem("unrelated", "keep")');
  await click('[data-reset]');
  assert.equal(await evaluate('localStorage.getItem("unrelated")'), 'keep');
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'altiplano-frontend');
  await dashboard();
  assert.equal(await text('[data-metric="total"]'), '8');
  console.log('PASS: reset restores exact initial totals and keeps unrelated data');

  await review();
  await evaluate('window.originalSetItem = Storage.prototype.setItem; Storage.prototype.setItem = function () { throw new Error("simulated quota"); }');
  await click('#approve');
  assert.match(await text('#status'), /No se pudo guardar/);
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'altiplano-frontend');
  await click('#reject');
  await evaluate('document.querySelector("textarea").value = "Conservar para reintentar"');
  await evaluate('document.querySelector("form").requestSubmit()');
  assert.match(await text('#dialog-error'), /No se pudo guardar/);
  assert.equal(await evaluate('document.querySelector("textarea").value'), 'Conservar para reintentar');
  await evaluate('Storage.prototype.setItem = window.originalSetItem');
  await evaluate('document.querySelector("form").requestSubmit()');
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'valle-backend');
  console.log('PASS: storage failure preserves offer/draft and retry works');

  await evaluate('localStorage.setItem("jobpulse.demo.v1", "corrupt")');
  await reload();
  assert.ok(await evaluate('!!document.querySelector(".recovery")'));
  assert.equal(await evaluate('localStorage.getItem("jobpulse.demo.v1")'), 'corrupt');
  await click('[data-reset]');
  console.log('PASS: corrupt data recovery without silent overwrite');

  async function swipe(dx) {
    await evaluate('document.querySelector(".offer-card").scrollIntoView({block:"center"})');
    const point = await evaluate('(() => { const r=document.querySelector(".offer-card").getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+80}; })()');
    await call('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x + dx, y: point.y + 2, button: 'left', buttons: 1 });
    await call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: point.x + dx, y: point.y + 2, button: 'left', clickCount: 1 });
  }
  await swipe(120);
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'valle-backend');
  await swipe(-120);
  assert.ok(await evaluate('!!document.querySelector("dialog[open]")'));
  await click('#close-dialog');
  assert.equal(await evaluate('document.querySelector(".offer-card").dataset.offerId'), 'valle-backend');
  console.log('PASS: real pointer swipes, approval and rejection cancellation');

  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('window.scrollTo(0,0)');
  await screenshot('mobile');
  assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'));
  await click('#reject');
  assert.ok(await evaluate('document.querySelector("dialog").getBoundingClientRect().width <= innerWidth'));
  await click('#close-dialog');
  await dashboard();
  assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'));
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".primary, .nav-button")).transitionDuration'), '0s');
  console.log('PASS: mobile layouts, dialog and reduced motion');
  assert.deepEqual(errors, [], 'No browser runtime exceptions');
  console.log('All browser checks passed.');
} finally {
  if (socket?.readyState === WebSocket.OPEN) { try { await call('Browser.close', {}, false); } catch { /* already closed */ } }
  socket?.close();
  browser.kill();
  await wait(500);
  await rm(profile, { recursive: true, force: true, maxRetries: 5 }).catch(() => {});
}
