import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';
import { offers } from './data.js';
import { pendingOffers } from './model.js';
import { loadEvaluations, commitEvaluation, resetDemo } from './storage.js';
import { renderReview, rejectionDialog, bindSwipe } from './review.js';
import { renderDashboard } from './dashboard.js';
import { icons } from './ui.js';

const app = document.querySelector('#app');
let entries = [];
let view = 'review';
let blocked = false;
let busy = false;
let message = '';
let messageIsError = false;
try { entries = loadEvaluations(window.localStorage); }
catch { blocked = true; message = 'No pudimos leer los datos locales. Reinicia la DEMO para recuperar el estado inicial.'; messageIsError = true; }

function notify(text, error = false) {
  message = text;
  messageIsError = error;
  const status = document.querySelector('#status');
  status.textContent = text;
  status.classList.toggle('error-message', error);
}

function render(focusHeading = false) {
  app.innerHTML = `<header class="site-header"><div class="header-inner"><a href="#" class="brand" aria-label="JobPulse, evaluar ofertas"><span class="brand-icon">${icons.pulse}</span><span>Job<span class="brand-light">Pulse</span><span class="brand-period">.</span></span></a><nav aria-label="Vistas principales"><button data-view="review" class="nav-button ${view === 'review' ? 'active' : ''}" ${view === 'review' ? 'aria-current="page"' : ''}>${icons.code} Evaluar ofertas</button><button data-view="dashboard" class="nav-button ${view === 'dashboard' ? 'active' : ''}" ${view === 'dashboard' ? 'aria-current="page"' : ''}>${icons.chart} Panel empresarial</button></nav></div></header>
  <main id="content"><div class="page-heading"><h1 tabindex="-1">${view === 'review' ? 'Evaluar ofertas' : 'Panel empresarial'}</h1><div class="session-progress mono"><span>${entries.length.toString().padStart(2, '0')} / ${offers.length.toString().padStart(2, '0')}</span><small>EVALUADAS EN TU RONDA</small></div></div>
  <div class="demo-banner"><span class="demo-tag">DEMO</span><p>Ofertas, empresas y opiniones iniciales ficticias. <span>Tus evaluaciones se guardan en este navegador.</span></p></div>
  <div id="status" class="status-message ${messageIsError ? 'error-message' : ''}" role="status" aria-live="polite"></div>
  ${blocked ? '<section class="panel recovery"><h2>Recuperemos tu demostración</h2><p>Los datos locales no se han sobrescrito. Puedes intentar recargar o restablecer el estado inicial.</p><button class="primary" data-reset>Reiniciar DEMO</button></section>' : view === 'review' ? renderReview(entries) : renderDashboard(entries)}
  </main><div id="dialog-host"></div>`;
  document.querySelector('#status').textContent = message;
  document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); navigate('review'); });
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.view)));
  document.querySelectorAll('[data-reset]').forEach(button => button.addEventListener('click', reset));
  if (!blocked && view === 'review') {
    const offer = pendingOffers(entries)[0];
    if (offer) {
      const approve = () => save(offer, 'approve');
      const reject = () => openRejection(offer);
      document.querySelector('#approve').addEventListener('click', event => { if (event.detail < 2) approve(); });
      document.querySelector('#reject').addEventListener('click', event => { if (event.detail < 2) reject(); });
      bindSwipe(document.querySelector('.offer-card'), { approve, reject });
    }
  }
  if (focusHeading) document.querySelector('h1').focus();
}

function navigate(next) { view = next; render(true); }

function reset() {
  try {
    entries = resetDemo(window.localStorage);
    blocked = false;
    view = 'review';
    message = 'DEMO restablecida. Todas las ofertas y métricas vuelven al estado inicial.';
    messageIsError = false;
    render(true);
  } catch { notify('No se pudo reiniciar. Comprueba que el navegador permite almacenamiento local e inténtalo de nuevo.', true); }
}

function save(offer, vote, details = { reasons: [], comment: '' }) {
  if (busy || blocked || entries.some(e => e.offerId === offer.id)) return false;
  busy = true;
  document.querySelectorAll('#approve, #reject, #rejection-form button').forEach(b => { b.disabled = true; });
  try {
    entries = commitEvaluation(window.localStorage, entries, {
      id: crypto.randomUUID(), offerId: offer.id, vote, ...details, createdAt: new Date().toISOString(),
    });
    document.querySelector('dialog[open]')?.close();
    message = vote === 'approve' ? 'Aprobación guardada. Tu voto ya actualizó los resultados.' : 'Rechazo guardado. Tu evaluación ya actualizó los resultados.';
    messageIsError = false;
    render();
    const nextFocus = document.querySelector('#approve') ?? document.querySelector('[data-view="dashboard"].primary');
    nextFocus?.focus();
    return true;
  } catch {
    const text = 'No se pudo guardar. Revisa el almacenamiento del navegador y vuelve a intentarlo; tu evaluación no se ha contado.';
    const error = document.querySelector('#dialog-error');
    if (error) { error.hidden = false; error.textContent = text; }
    else notify(text, true);
    return false;
  } finally {
    busy = false;
    document.querySelectorAll('#approve, #reject, #rejection-form button').forEach(b => { b.disabled = false; });
  }
}

function openRejection(offer) {
  if (busy || document.querySelector('dialog[open]')) return;
  const host = document.querySelector('#dialog-host');
  host.innerHTML = rejectionDialog(offer);
  const dialog = host.querySelector('dialog');
  const opener = document.querySelector('#reject');
  dialog.addEventListener('close', () => { host.replaceChildren(); opener?.focus(); }, { once: true });
  dialog.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.querySelector('#skip-details').addEventListener('click', () => save(offer, 'reject'));
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    save(offer, 'reject', {
      reasons: [...dialog.querySelectorAll('input:checked')].map(input => input.value),
      comment: dialog.querySelector('textarea').value.trim(),
    });
  });
  dialog.showModal();
}

render();
