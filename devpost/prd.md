---
doc: prd
status: approved
---

# JobPulse — Product Requirements

Prototipo para que desarrolladores evalúen condiciones laborales y empresas vean feedback accionable. JobPulse es el nombre de trabajo, tomado de la carpeta del proyecto; no se ha solicitado una decisión de marca adicional.

Fuente: `scope.md > The Unique Kernel`, `The Core Loop` y `The POC Boundary`.

## The Core Journey
1. Abrir Evaluar ofertas y ver una oferta ficticia identificada como DEMO, con condiciones, salario destacado y requisitos.
2. Deslizar para aprobar o rechazar.
3. Aprobar guarda inmediatamente el voto y permite continuar con la siguiente oferta.
4. Rechazar abre un panel de detalles, sin guardar todavía. Se pueden seleccionar motivos y escribir una recomendación anónima opcional.
5. “Enviar evaluación” guarda un rechazo con los detalles aportados. “Omitir detalles” guarda un rechazo sin motivos ni comentario. Cerrar el panel cancela y mantiene la oferta sin evaluar.
6. Abrir el Panel empresarial y comprobar los votos, motivos y comentarios actualizados realmente.
7. Tras la última oferta, ver “Has evaluado todas las ofertas”, con “Ver resultados” y “Reiniciar DEMO”. Este último restablece los datos iniciales.

Fuente: `scope.md > The Core Loop` y `What "Working" Looks Like`.

## Screens and Layout
- **Evaluar ofertas:** tarjeta legible como foco principal, salario destacado, condiciones y requisitos; gesto de aprobación/rechazo y panel de rechazo asociado. “Tarjeta clara” se interpreta como información legible, respetando el fondo oscuro indicado.
- **Panel empresarial:** resumen de aprobación y rechazo, principales motivos y listado de recomendaciones anónimas. Las cifras corresponden a las ofertas de la DEMO; presentación del desglose concreto a definir en la especificación sin añadir pantallas.
- Cambio entre ambas vistas en el mismo navegador, sin registro. No hay una tercera vista de postulación.
- Botones equivalentes a los deslizamientos para aprobar y rechazar desde computadora.

## Look and Feel
- Revisión de idioma aprobada: interfaz, datos DEMO, README e instrucciones de prueba en inglés. Las etiquetas españolas citadas en este documento de planificación representan su equivalente inglés actual: “Review offers”, “Company dashboard”, “Submit review”, “Skip details”, “You have reviewed all offers”, “View results” y “Reset DEMO”. No cambiar lógica, diseño, tamaños ni tipografías; conservar nombres propios y comentarios guardados del usuario.
- Oscuro, minimalista, moderno y orientado a desarrolladores; identidad visual memorable.
- Fondo `#0D1117`, tarjetas `#161B22`, texto `#F0F6FC`, índigo `#6366F1`, verde `#22C55E`, rojo `#EF4444`.
- Plus Jakarta Sans para la interfaz; JetBrains Mono para etiquetas técnicas.
- Datos ficticios identificados claramente como **DEMO** en ambas vistas.
- Ajuste final solicitado: un único aviso DEMO por vista, sin columnas laterales ni textos promocionales repetitivos; tarjeta de 510 px centrada en escritorio, encabezados directos y tamaños/tipografías conservados.
- Sin corazones, “Match” ni funciones de postulación.
- La inspiración boliviana se mencionó antes; la dirección visual final especificada por el usuario es la anterior. No se han definido motivos culturales concretos: no inventar símbolos o requisitos decorativos adicionales.

Fuente: `scope.md > Inspiration & Identity`, concretada por la dirección final del usuario.

## Features and Behavior

### Evaluación de ofertas
- Una oferta pendiente se puede aprobar o rechazar. La aprobación guarda una única evaluación inmediatamente.
- Deslizar a la izquierda abre el panel de rechazo; el gesto por sí solo no cambia votos ni métricas.
- Motivos seleccionables: salario, requisitos y beneficios como categorías iniciales derivadas del alcance. Se permiten varios motivos o ninguno.
- Comentario opcional, sin pedir nombre, correo ni cuenta. Las recomendaciones se muestran sin identidad de autor.
- “Enviar evaluación” no exige motivos ni comentario, ya que ambos son opcionales.
- “Omitir detalles” descarta cualquier detalle introducido y guarda solo el rechazo.
- Cerrar el panel no guarda nada; reabrirlo no debe recuperar un borrador cancelado.
- Tras guardar, la oferta deja de estar pendiente en esa ronda. Repetir clics o el gesto no debe duplicar el voto.

**Criterios observables:** aprobar incrementa aprobaciones y total en uno; abrir/cerrar el panel no cambia cifras; enviar un rechazo incrementa rechazos y total en uno; cada motivo elegido y el comentario aparecen en los resultados correspondientes.

### Panel empresarial
- Mostrar cantidades de aprobación y rechazo y su relación con el total evaluado; cualquier porcentaje se calcula a partir de esos votos.
- Mostrar motivos de rechazo ordenados por frecuencia y recomendaciones anónimas.
- Los motivos son selección múltiple: sus frecuencias pueden sumar más que el número de rechazos. Los rechazos sin detalles cuentan como rechazos, sin inventar motivos o comentarios.
- Métricas iniciales ficticias y nuevas evaluaciones comparten el mismo cálculo; no usar cifras decorativas que permanezcan estáticas.
- Cambiar de vista refleja la evaluación recién enviada, sin intervención manual en los datos.

**Criterios observables:** comparar el panel antes y después de aprobar y de rechazar; comprobar variación exacta del voto, de los motivos seleccionados y aparición del comentario enviado.

Fuente: `scope.md > The Unique Kernel` y `What "Working" Looks Like`.

### Fin de ronda y reinicio
- Al no quedar ofertas pendientes, sustituir la tarjeta por “Has evaluado todas las ofertas”.
- “Ver resultados” abre el Panel empresarial.
- “Reiniciar DEMO” restaura las ofertas pendientes, votos iniciales, motivos iniciales y comentarios iniciales; elimina evaluaciones añadidas durante la demo.

**Criterio observable:** después de reiniciar, los resultados coinciden con el estado inicial y se pueden evaluar las ofertas otra vez.

## States and Boundaries
- **Primera entrada:** ofertas ficticias y resultados iniciales de demostración, claramente identificados.
- **Rechazo pendiente:** panel abierto, sin efecto sobre los resultados hasta confirmar u omitir detalles.
- **Ronda completada:** mensaje y acciones exactas descritos arriba.
- **Sin comentarios o motivos:** mensaje descriptivo de que todavía no hay datos, sin contenido inventado.
- **Total cero:** cantidades en cero y porcentaje mostrado como cero o sin datos, sin divisiones inválidas.
- **Fallo al guardar:** no comunicar éxito ni avanzar si la evaluación no se pudo guardar; mantener una vía clara para reintentar.
- **Anonimato del prototipo:** no recoger identidad; comentarios sin firma. No hay usuarios reales ni promesa de una infraestructura de anonimato multiusuario.
- **Persistencia al recargar:** aprobada en `4-spec`; conserva la ronda en localStorage del mismo navegador/origen. Reiniciar DEMO elimina las evaluaciones nuevas y restaura la semilla.

## Product Decisions
- Dos vistas: Evaluar ofertas y Panel empresarial.
- Datos ficticios identificados como DEMO y métricas actualizadas realmente.
- Aprobar guarda inmediatamente; rechazar requiere “Enviar evaluación” u “Omitir detalles”; cerrar cancela.
- Fin de ronda con acceso a resultados y reinicio completo de la DEMO.
- Paleta y tipografías indicadas por el usuario; sin convenciones románticas ni postulación.
- Planificación revisada solo en Markdown, para priorizar el tiempo.
- Implementación sencilla y estable, sin backend ni autenticación. El usuario permite persistencia local si conviene y exige botones equivalentes a los gestos.

## What We're Building
El circuito completo de ofertas DEMO, votos, detalles de rechazo opcionales, resultados derivados de las evaluaciones y reinicio. Interfaz con las dos vistas y la dirección visual definida.

## Deferred From the POC
Usuarios y empresas reales, publicación de ofertas y uso compartido entre dispositivos: se difieren para mantener la demo en un navegador y terminar el circuito central.

## Non-Goals
Autenticación, integraciones con portales, pagos y despliegue obligatorio: fuera del alcance aprobado. Corazones, “Match” y postulaciones: excluidos explícitamente por el usuario.

## Open Questions
No quedan decisiones de producto bloqueantes. `4-spec` resolvió la persistencia local y los botones equivalentes a los gestos; se implementaron tres ofertas ficticias.
