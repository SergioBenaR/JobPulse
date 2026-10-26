import { offers, reasons } from './data.js';
import { pendingOffers } from './model.js';
import { escapeHTML as esc } from './ui.js';

export function renderReview(entries) {
  const offer = pendingOffers(entries)[0];
  if (!offer) return `<section class="complete panel"><span class="completion-icon">✓</span><p class="eyebrow">RONDA COMPLETADA</p><h2>Has evaluado todas las ofertas</h2><p>Tu perspectiva ya forma parte del pulso. Descubre qué dicen los resultados.</p><div class="complete-actions"><button class="primary" data-view="dashboard">Ver resultados <span aria-hidden="true">↗</span></button><button class="secondary" data-reset>Reiniciar DEMO</button></div></section>`;
  const money = n => new Intl.NumberFormat('en-US').format(n);
  return `<div class="review-layout">
    <aside class="review-aside"><div class="section-number">01 <span>/ EVALUAR</span></div><h2>Una oferta.<br>Tu criterio.<br><span>Un cambio.</span></h2><p>Las mejores oportunidades empiezan escuchando a quienes las hacen posibles.</p><div class="how-it-works"><p class="eyebrow">ASÍ FUNCIONA</p><div><b>01</b><span>Lee las condiciones</span></div><div><b>02</b><span>Aprueba o señala qué mejorar</span></div><div><b>03</b><span>Tu opinión mueve las métricas</span></div></div><div class="privacy-note"><span class="status-dot"></span> Anónimo. Sin registro. Sin postulaciones.</div></aside>
    <section class="card-stage" aria-label="Oferta actual"><div class="card-progress"><span class="mono">OFERTA ${entries.length + 1} <span class="muted">/ ${offers.length.toString().padStart(2, '0')}</span></span><div class="progress-dots">${offers.map((_, i) => `<span class="${i <= entries.length ? 'filled' : ''}"></span>`).join('')}</div></div>
    <article class="offer-card" data-offer-id="${offer.id}"><div class="offer-top"><div class="company-avatar">${offer.initials}</div><div><p class="company-name">${offer.company}</p><p class="small muted">${offer.location}</p></div><span class="demo-tag">DEMO</span></div>
    <div class="offer-title"><div class="pill-row"><span class="pill green"><span class="status-dot"></span>${offer.modality}</span><span class="pill">${offer.seniority}</span></div><h3>${offer.title}</h3><p>${offer.description}</p></div>
    <div class="salary"><span class="eyebrow">RANGO SALARIAL</span><div><strong>$${money(offer.salaryMin)} <span>–</span> $${money(offer.salaryMax)}</strong><span class="mono">${offer.currency} / ${offer.salaryPeriod}</span></div></div>
    <div class="stack-tags">${offer.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div>
    <div class="conditions"><section><h4><span aria-hidden="true">⌘</span> Lo que buscan</h4><ul>${offer.requirements.map(r => `<li>${esc(r)}</li>`).join('')}</ul></section><section><h4><span aria-hidden="true">✧</span> Lo que ofrecen</h4><ul class="benefits">${offer.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul></section></div>
    <div class="offer-bottom mono"><span>EMPRESA Y OFERTA FICTICIAS</span><span>BO <span aria-hidden="true">↗</span></span></div></article>
    <div class="vote-actions"><button class="vote reject" id="reject"><span class="vote-symbol" aria-hidden="true">×</span><span>Rechazar <small>Hay algo que mejorar</small></span><span class="direction" aria-hidden="true">←</span></button><button class="vote approve" id="approve"><span class="vote-symbol" aria-hidden="true">✓</span><span>Aprobar <small>Buenas condiciones</small></span><span class="direction" aria-hidden="true">→</span></button></div><p class="gesture-hint mono">DESLIZA LA TARJETA O UTILIZA LOS BOTONES</p></section>
    <aside class="context-aside"><span class="tiny-label">TU VOZ IMPORTA</span><div class="signal-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><h3>Menos suposiciones.<br>Mejores ofertas.</h3><p>Cada evaluación convierte condiciones laborales en información que las empresas pueden usar.</p><div class="context-divider"></div><p class="small muted">Estás explorando una demostración. Todos los datos y empresas son ficticios.</p></aside>
  </div>`;
}

export function rejectionDialog(offer) {
  return `<dialog id="rejection-dialog" aria-labelledby="rejection-title"><form id="rejection-form"><div class="dialog-heading"><span class="eyebrow">FEEDBACK ANÓNIMO</span><button type="button" class="icon-button" id="close-dialog" aria-label="Cerrar panel">×</button></div><h2 id="rejection-title">¿Qué podría mejorar?</h2><p class="muted">${esc(offer.title)} · ${esc(offer.company)}</p><fieldset><legend>Motivos de rechazo <span class="muted">(opcionales)</span></legend><div class="reason-options">${Object.entries(reasons).map(([id, label]) => `<label><input type="checkbox" name="reason" value="${id}"><span>${label}</span></label>`).join('')}</div></fieldset><label class="comment-label" for="comment">Tu recomendación <span class="muted">(opcional)</span></label><textarea id="comment" maxlength="1000" rows="4" placeholder="¿Qué cambiarías para que esta oferta sea más atractiva?"></textarea><p class="small muted">No incluyas datos personales. Tu comentario se mostrará sin nombre.</p><p id="dialog-error" class="error-message" role="alert" hidden></p><div class="dialog-actions"><button class="primary" type="submit">Enviar evaluación <span aria-hidden="true">↗</span></button><button class="text-button" type="button" id="skip-details">Omitir detalles</button></div></form></dialog>`;
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
