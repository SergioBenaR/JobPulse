import { offers, reasons } from './data.js';

export function validateEvaluations(entries) {
  if (!Array.isArray(entries) || entries.length > offers.length) throw new Error('Datos locales inválidos.');
  const seen = new Set();
  const ids = new Set();
  for (const e of entries) {
    if (!e || typeof e.id !== 'string' || !e.id || ids.has(e.id)
      || !offers.some(o => o.id === e.offerId) || seen.has(e.offerId)
      || !['approve', 'reject'].includes(e.vote)
      || !Array.isArray(e.reasons) || !e.reasons.every(r => Object.hasOwn(reasons, r))
      || new Set(e.reasons).size !== e.reasons.length
      || typeof e.comment !== 'string' || e.comment.length > 1000
      || typeof e.createdAt !== 'string' || !Number.isFinite(Date.parse(e.createdAt))
      || (e.vote === 'approve' && (e.reasons.length || e.comment))) {
      throw new Error('Datos locales inválidos.');
    }
    seen.add(e.offerId);
    ids.add(e.id);
  }
  return entries;
}

export function addEvaluation(entries, evaluation) {
  return validateEvaluations([...entries, evaluation]);
}

export function pendingOffers(entries) {
  return offers.filter(o => !entries.some(e => e.offerId === o.id));
}

export function calculateMetrics(entries) {
  const total = entries.length;
  const approved = entries.filter(e => e.vote === 'approve').length;
  const rejected = total - approved;
  const reasonCounts = Object.entries(reasons).map(([id, label]) => {
    const count = entries.filter(e => e.vote === 'reject' && e.reasons.includes(id)).length;
    return { id, label, count, percentage: rejected ? Math.round(count / rejected * 100) : 0 };
  }).sort((a, b) => b.count - a.count);
  return {
    total, approved, rejected,
    approvalRate: total ? Math.round(approved / total * 100) : 0,
    rejectionRate: total ? Math.round(rejected / total * 100) : 0,
    reasonCounts,
    comments: entries.filter(e => e.vote === 'reject' && e.comment.trim()).slice().reverse(),
  };
}
