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
  Verify (mechanical): Ejecutar `npm test` y `npm run build`; iniciar el servidor y comprobar respuesta HTTP. Verificar el recorrido en navegador con herramientas ya disponibles si existen, sin instalar pruebas opcionales que retrasen el desarrollo. Registrar claramente qué verificaciones se ejecutaron y cuáles requieren la revisión práctica del usuario.
  Learner check: Ejecutar `npm run dev -- --host 127.0.0.1`, abrir `http://127.0.0.1:5173`, comprobar panel inicial, cancelar un rechazo, enviar otro con motivo y comentario, aprobar, recargar, completar la ronda y reiniciar. Confirmar cambios reales y describir cualquier problema visual o funcional.
  Commit: `Build functional JobPulse demo`

Implementación inicial en `e376c30`; ajuste final verificado y guardado en `9d683b7`. Sigue pendiente el reintento/confirmación del usuario tras el ajuste; no se considera completada `5-build` todavía.

## Hands-on Checkpoints

- [x] Early usable behavior explored — feedback del usuario recibido y concretado en seis ajustes finales de UX/UI; revisión funcional final y reintento posterior pendientes de confirmación.
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Simplificación final de UX/UI solicitada: eliminar columnas y eslóganes, centrar tarjeta, aviso DEMO único y encabezados directos, conservando tamaños y funciones. Verificar y guardar commit; pendiente de reintento del usuario.

Verificación del ajuste: `npm test` (9/9), `npm run build` y `npm run test:browser` correctos. Chrome comprueba tarjeta de 510 px centrada, título de oferta a 26 px, ausencia de columnas laterales, aviso DEMO único en ambas vistas y todo el recorrido funcional. Capturas de escritorio y panel inspeccionadas. Falta confirmación del usuario tras volver a probar esta revisión.

Verificación del agente: 9 pruebas Node correctas; compilación Vite 7.3.7 correcta; servidor local con HTTP 200; recorrido real en Chrome correcto (cancelación y Escape, motivos múltiples, comentario seguro, aprobación, persistencia, omitir detalles, fin de ronda, reinicio, errores de almacenamiento y recuperación, gestos de ratón, vistas móvil y escritorio y movimiento reducido). Capturas inspeccionadas. Revisión práctica del usuario pendiente.

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — breve recapitulación basada en evidencia: recepción del voto, escritura local y métricas derivadas; criterio de 8 a 9 evaluaciones ligado a las pruebas.
- [x] Optional edit and transfer reflection addressed — edición adicional no aplicable: ya se realizó el ajuste solicitado y el usuario pidió pasar directamente a entrega; reflexión opcional no requerida.
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse — instantánea de 9d683b7, abierta en Chrome mediante file:// sin dependencias de red y enlazada al usuario.

Activity and evidence: Recapitulación comunicada, con referencias a save, commitEvaluation y calculateMetrics, y pruebas de incremento exacto. No se afirma práctica ni dominio del usuario. Ajustes técnicos verificados; confirmación final del usuario pendiente.
Route and stops: Ruta de referencia, no recorrido interactivo: src/main.js > save; src/storage.js > commitEvaluation; src/model.js > calculateMetrics.
Edit outcome: Ajuste de UX solicitado implementado en 9d683b7; sin edición adicional de aprendizaje.
Reflection: No aplicable al avance inmediato solicitado; sin testimonio personal generado.
Activity mode: Recapitulación breve y mapa de referencia, no recorrido práctico. Mapa obligatorio de la skill, separado de los planes Markdown.

## Revisions

- Revisión del usuario: simplificar la presentación manteniendo el circuito funcional, tipografías y tamaños. Se ajustan PRD y spec para reflejar la tarjeta centrada, ausencia de columnas y aviso DEMO único.

- Fuentes incluidas mediante paquetes Fontsource y sus licencias, en lugar de una carpeta manual `public/fonts`; se corrigió la ruta de importación al detectar el fallo de compilación.
- Chrome ya disponible permite verificar el circuito mediante CDP y WebSocket nativo, sin instalar herramientas opcionales. El comprobador espera al documento nuevo tras recargar para evitar una carrera de navegación.
- `src/ui.js` centraliza iconos y escape de texto compartidos; no cambia el comportamiento aprobado.
