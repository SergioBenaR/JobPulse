---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast — solicitado por el usuario. Menos explicación de código; conserva verificación y revisión práctica.

## Slices

- [x] **1. Evaluar ofertas DEMO y comprobar su efecto real en el panel**
  Becomes usable: Aplicación local completa con dos vistas, aprobación, rechazo con detalles opcionales, métricas derivadas, persistencia, fin de ronda y reinicio.
  Why now: Es un circuito pequeño e inseparable; implementarlo de extremo a extremo demuestra primero el núcleo distintivo, sin dejar el panel para una fase posterior.
  PRD ref: `prd.md > The Core Journey`, `Evaluación de ofertas`, `Panel empresarial`, `Fin de ronda y reinicio`, `Look and Feel`
  Spec ref: `spec.md > Components`, `Data Model`, `File Structure`, `Look and Feel`, `Verification`
  Build: Crear el proyecto Vite con los módulos definidos, tres ofertas y votos iniciales DEMO, ambas vistas, botones y gestos, diálogo cancelable, guardado local antes de avanzar, métricas calculadas y restablecimiento. Aplicar el diseño aprobado e incluir instrucciones de ejecución.
  Verify (mechanical): Run `npm test` and `npm run build`; start the server and check its HTTP response. Verify the browser journey with existing tools, without installing optional test tools that delay delivery. Record which checks ran and which require the user's hands-on review.
  Learner check: Run `npm run dev -- --host 127.0.0.1`, open `http://127.0.0.1:5173` and inspect Company dashboard (8 reviews, 5 approvals, 3 rejections). Return to Review offers; Reject and close the panel to cancel. Reject again with Salary and a comment, then Submit review; confirm 9 reviews and 4 rejections in the dashboard. Approve another offer, reload, use Skip details on the last offer, then View results and Reset DEMO. Confirm real updates, preserved progress and restored initial metrics; report any visual or functional issues.
  Commit: `Build functional JobPulse demo`

Implementación inicial en `e376c30`; ajuste visual en `9d683b7`, aprobado explícitamente por el usuario. Se realiza una revisión adicional de idioma; su confirmación final sigue pendiente antes de cerrar `5-build`.

## Hands-on Checkpoints

- [x] Early usable behavior explored — feedback del usuario recibido y concretado en seis ajustes finales de UX/UI; revisión funcional final y reintento posterior pendientes de confirmación.
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Simplificación final de UX/UI solicitada: eliminar columnas y eslóganes, centrar tarjeta, aviso DEMO único y encabezados directos, conservando tamaños y funciones. Verificada en 9d683b7 y aprobada explícitamente por el usuario: “Apruebo el ajuste visual y funcional”.
- [ ] English revision: translate all interface text, DEMO data, README and test instructions. Preserve logic and design, verify, commit and request the user's final confirmation.

English revision verification: `npm test` (9/9), `npm run build` and `npm run test:browser` passed. English headings, `lang="en"`, all existing vote/storage/reset paths, centered 510 px card, 26 px offer title and one DEMO notice per view were checked. Desktop/mobile screenshots inspected; translated app map opened offline in Chrome. CSS unchanged. Translation implemented and mechanically verified in this revision; final user confirmation pending.

Verificación del ajuste visual: `npm test` (9/9), `npm run build` y `npm run test:browser` correctos. Chrome comprueba tarjeta de 510 px centrada, título de oferta a 26 px, ausencia de columnas laterales, aviso DEMO único en ambas vistas y todo el recorrido funcional. Capturas de escritorio y panel inspeccionadas. Revisión visual y funcional aprobada por el usuario; traducción posterior pendiente de confirmación.

Verificación del agente: 9 pruebas Node correctas; compilación Vite 7.3.7 correcta; servidor local con HTTP 200; recorrido real en Chrome correcto (cancelación y Escape, motivos múltiples, comentario seguro, aprobación, persistencia, omitir detalles, fin de ronda, reinicio, errores de almacenamiento y recuperación, gestos de ratón, vistas móvil y escritorio y movimiento reducido). Capturas inspeccionadas. Confirmación final de la versión inglesa pendiente.

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — breve recapitulación basada en evidencia: recepción del voto, escritura local y métricas derivadas; criterio de 8 a 9 evaluaciones ligado a las pruebas.
- [x] Optional edit and transfer reflection addressed — edición adicional no aplicable: ya se realizó el ajuste solicitado y el usuario pidió pasar directamente a entrega; reflexión opcional no requerida.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse — instantánea de 9d683b7, abierta en Chrome mediante file:// sin dependencias de red y enlazada al usuario.

Map refreshed for the English-only revision, preserving the same source paths and functions; checked offline in Chrome. No repeated learning activity required.

Activity and evidence: Recapitulación comunicada, con referencias a save, commitEvaluation y calculateMetrics, y pruebas de incremento exacto. No se afirma práctica ni dominio del usuario. Ajustes técnicos verificados; confirmación final del usuario pendiente.
Route and stops: Ruta de referencia, no recorrido interactivo: src/main.js > save; src/storage.js > commitEvaluation; src/model.js > calculateMetrics.
Edit outcome: Ajuste de UX solicitado implementado en 9d683b7; sin edición adicional de aprendizaje.
Reflection: No aplicable al avance inmediato solicitado; sin testimonio personal generado.
Activity mode: Recapitulación breve y mapa de referencia, no recorrido práctico. Mapa obligatorio de la skill, separado de los planes Markdown.

## Revisions

- El usuario aprueba la revisión visual/funcional y solicita traducción completa al inglés antes del cierre. Solo textos y metadatos de idioma; se conservan CSS, lógica, identificadores de almacenamiento y comentarios escritos por el usuario. Se actualizan expectativas de texto en pruebas y documentación.

- Revisión del usuario: simplificar la presentación manteniendo el circuito funcional, tipografías y tamaños. Se ajustan PRD y spec para reflejar la tarjeta centrada, ausencia de columnas y aviso DEMO único.

- Fuentes incluidas mediante paquetes Fontsource y sus licencias, en lugar de una carpeta manual `public/fonts`; se corrigió la ruta de importación al detectar el fallo de compilación.
- Chrome ya disponible permite verificar el circuito mediante CDP y WebSocket nativo, sin instalar herramientas opcionales. El comprobador espera al documento nuevo tras recargar para evitar una carrera de navegación.
- `src/ui.js` centraliza iconos y escape de texto compartidos; no cambia el comportamiento aprobado.
