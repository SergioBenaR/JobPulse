import test from 'node:test';
import assert from 'node:assert/strict';
import { offers, seedEvaluations } from '../src/data.js';
import { addEvaluation, calculateMetrics, pendingOffers, validateEvaluations } from '../src/model.js';
import { commitEvaluation, loadEvaluations, resetDemo, STORAGE_KEY } from '../src/storage.js';
import { renderDashboard } from '../src/dashboard.js';
import { renderReview, rejectionDialog } from '../src/review.js';

const evaluation = (offerId, vote = 'approve', details = {}) => ({
  id: `test-${offerId}`, offerId, vote, reasons: [], comment: '', createdAt: '2026-10-26T12:00:00.000Z', ...details,
});
function memoryStorage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test('initial and new reviews produce exact dashboard changes', () => {
  const before = calculateMetrics(seedEvaluations);
  assert.deepEqual([before.total, before.approved, before.rejected], [8, 5, 3]);
  const added = evaluation(offers[0].id, 'reject', { reasons: ['salario', 'beneficios'], comment: 'Improve the range.' });
  const after = calculateMetrics([...seedEvaluations, added]);
  assert.deepEqual([after.total, after.approved, after.rejected], [9, 5, 4]);
  assert.equal(after.reasonCounts.find(r => r.id === 'salario').count, 3);
  assert.equal(after.reasonCounts.find(r => r.id === 'beneficios').count, 2);
  assert.equal(after.comments[0].comment, 'Improve the range.');
  const html = renderDashboard([added]);
  assert.match(html, /data-metric="total">9/);
  assert.match(html, /Improve the range\./);
});

test('rejection without details counts without inventing reasons or comments', () => {
  const metrics = calculateMetrics([evaluation(offers[0].id, 'reject')]);
  assert.equal(metrics.rejected, 1);
  assert.equal(metrics.rejectionRate, 100);
  assert.equal(metrics.comments.length, 0);
  assert.equal(metrics.reasonCounts.reduce((n, r) => n + r.count, 0), 0);
});

test('zero reviews do not produce invalid percentages', () => {
  const metrics = calculateMetrics([]);
  assert.equal(metrics.approvalRate, 0);
  assert.equal(metrics.rejectionRate, 0);
  assert.ok(metrics.reasonCounts.every(r => r.percentage === 0));
});

test('a round excludes reviewed offers, prevents duplicates and does not count initial votes as progress', () => {
  assert.equal(pendingOffers([]).length, 3);
  const first = evaluation(offers[0].id);
  const entries = addEvaluation([], first);
  assert.equal(pendingOffers(entries).length, 2);
  assert.throws(() => addEvaluation(entries, first), /Invalid/);
  assert.equal(entries.length, 1);
});

test('saving, reloading, completing and resetting restores the exact initial dataset', () => {
  const storage = memoryStorage();
  storage.setItem('other-app', 'keep');
  let entries = loadEvaluations(storage);
  for (const offer of offers) entries = commitEvaluation(storage, entries, evaluation(offer.id));
  assert.deepEqual(loadEvaluations(storage), entries);
  assert.equal(pendingOffers(entries).length, 0);
  assert.match(renderReview(entries), /You have reviewed all offers/);
  assert.match(renderReview(entries), /View results/);
  entries = resetDemo(storage);
  assert.deepEqual(entries, []);
  assert.deepEqual(loadEvaluations(storage), []);
  assert.equal(storage.getItem('other-app'), 'keep');
  assert.equal(pendingOffers(entries).length, offers.length);
  assert.deepEqual(calculateMetrics([...seedEvaluations, ...entries]), calculateMetrics(seedEvaluations));
});

test('a write failure does not advance or modify the current round', () => {
  const storage = { setItem() { throw new Error('QuotaExceededError'); } };
  const entries = [];
  assert.throws(() => commitEvaluation(storage, entries, evaluation(offers[0].id)), /QuotaExceededError/);
  assert.equal(entries.length, 0);
  assert.equal(pendingOffers(entries).length, 3);
});

test('corrupt data, unknown votes and invalid references are rejected without overwriting', () => {
  const storage = memoryStorage();
  storage.setItem(STORAGE_KEY, '{invalid');
  assert.throws(() => loadEvaluations(storage));
  assert.equal(storage.getItem(STORAGE_KEY), '{invalid');
  for (const details of [{ vote: 'maybe' }, { reasons: ['other'] }, { comment: 'x' }, { offerId: 'unknown' }, { createdAt: 'bad' }]) {
    assert.throws(() => validateEvaluations([evaluation(offers[0].id, 'approve', details)]));
  }
});

test('comments are rendered as text, never as executable tags', () => {
  const entry = evaluation(offers[0].id, 'reject', { comment: '<img src=x onerror="alert(1)">' });
  const html = renderDashboard([entry]);
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<img'));
});

test('the interface provides equivalent buttons and optional rejection details', () => {
  const html = renderReview([]);
  assert.match(html, /id="approve"/);
  assert.match(html, /id="reject"/);
  const dialog = rejectionDialog(offers[0]);
  assert.match(dialog, /Submit review/);
  assert.match(dialog, /Skip details/);
  assert.match(dialog, /Close panel/);
  assert.ok(!dialog.includes(' required'));
});
