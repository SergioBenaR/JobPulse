import { offers, reasons } from './data.js';
import { pendingOffers } from './model.js';
import { escapeHTML as esc } from './ui.js';

export function renderReview(entries) {
  const offer = pendingOffers(entries)[0];
  if (!offer) return `<section class="complete panel"><span class="completion-icon">✓</span><p class="eyebrow">ROUND COMPLETE</p><h2>You have reviewed all offers</h2><div class="complete-actions"><button class="primary" data-view="dashboard">View results <span aria-hidden="true">↗</span></button><button class="secondary" data-reset>Reset DEMO</button></div></section>`;
  const money = n => new Intl.NumberFormat('en-US').format(n);
  return `<div class="review-layout">
    <section class="card-stage" aria-label="Current offer"><div class="card-progress"><span class="mono">OFFER ${entries.length + 1} <span class="muted">/ ${offers.length.toString().padStart(2, '0')}</span></span><div class="progress-dots">${offers.map((_, i) => `<span class="${i <= entries.length ? 'filled' : ''}"></span>`).join('')}</div></div>
    <article class="offer-card" data-offer-id="${offer.id}"><div class="offer-top"><div class="company-avatar">${offer.initials}</div><div><p class="company-name">${offer.company}</p><p class="small muted">${offer.location}</p></div></div>
    <div class="offer-title"><div class="pill-row"><span class="pill green"><span class="status-dot"></span>${offer.modality}</span><span class="pill">${offer.seniority}</span></div><h3>${offer.title}</h3><p>${offer.description}</p></div>
    <div class="salary"><span class="eyebrow">SALARY RANGE</span><div><strong>$${money(offer.salaryMin)} <span>–</span> $${money(offer.salaryMax)}</strong><span class="mono">${offer.currency} / ${offer.salaryPeriod}</span></div></div>
    <div class="stack-tags">${offer.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div>
    <div class="conditions"><section><h4><span aria-hidden="true">⌘</span> Requirements</h4><ul>${offer.requirements.map(r => `<li>${esc(r)}</li>`).join('')}</ul></section><section><h4><span aria-hidden="true">✧</span> Benefits</h4><ul class="benefits">${offer.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul></section></div>
    </article>
    <div class="vote-actions"><button class="vote reject" id="reject"><span class="vote-symbol" aria-hidden="true">×</span><span>Reject <small>Room to improve</small></span><span class="direction" aria-hidden="true">←</span></button><button class="vote approve" id="approve"><span class="vote-symbol" aria-hidden="true">✓</span><span>Approve <small>Good conditions</small></span><span class="direction" aria-hidden="true">→</span></button></div><p class="gesture-hint mono">SWIPE THE CARD OR USE THE BUTTONS</p></section>
  </div>`;
}

export function rejectionDialog(offer) {
  return `<dialog id="rejection-dialog" aria-labelledby="rejection-title"><form id="rejection-form"><div class="dialog-heading"><span class="eyebrow">ANONYMOUS FEEDBACK</span><button type="button" class="icon-button" id="close-dialog" aria-label="Close panel">×</button></div><h2 id="rejection-title">What could be improved?</h2><p class="muted">${esc(offer.title)} · ${esc(offer.company)}</p><fieldset><legend>Rejection reasons <span class="muted">(optional)</span></legend><div class="reason-options">${Object.entries(reasons).map(([id, label]) => `<label><input type="checkbox" name="reason" value="${id}"><span>${label}</span></label>`).join('')}</div></fieldset><label class="comment-label" for="comment">Your recommendation <span class="muted">(optional)</span></label><textarea id="comment" maxlength="1000" rows="4" placeholder="What would make this offer more attractive?"></textarea><p class="small muted">Do not include personal details. Your comment will appear without a name.</p><p id="dialog-error" class="error-message" role="alert" hidden></p><div class="dialog-actions"><button class="primary" type="submit">Submit review <span aria-hidden="true">↗</span></button><button class="text-button" type="button" id="skip-details">Skip details</button></div></form></dialog>`;
}

export function bindSwipe(card, { approve, reject }) {
  let start = null;
  card.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a, input, textarea')) return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    card.setPointerCapture(event.pointerId);
  });
  card.addEventListener('pointermove', event => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    card.style.setProperty('--drag', `${Math.max(-100, Math.min(100, dx))}px`);
    card.classList.toggle('drag-approve', dx > 30);
    card.classList.toggle('drag-reject', dx < -30);
  });
  const clear = () => {
    start = null;
    card.style.setProperty('--drag', '0px');
    card.classList.remove('drag-approve', 'drag-reject');
  };
  card.addEventListener('pointerup', event => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    clear();
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx > 0 ? approve : reject)();
  });
  card.addEventListener('pointercancel', clear);
  card.addEventListener('lostpointercapture', clear);
}
