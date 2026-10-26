---
doc: spec
status: approved
---

# JobPulse — Technical Spec

## How This Works, In Plain Language
Propuesta técnica aprobada: una aplicación que se ejecuta en el navegador. HTML organiza las pantallas, CSS aplica el diseño y JavaScript procesa las evaluaciones. Vite permite abrir y desarrollar la aplicación localmente.

Al confirmar un voto, se guarda en la memoria local del navegador, llamada `localStorage`. Solo después de guardarlo se avanza de oferta. El panel cuenta esas mismas evaluaciones, junto con votos iniciales ficticios: no tiene cifras estáticas independientes. Recargar conserva los votos; Reiniciar DEMO recupera el punto de partida. Los datos pertenecen a ese navegador y dirección local, no se comparten entre equipos.

## The Core Journey Through the System
Implementa `prd.md > The Core Journey`.
1. La aplicación carga las ofertas y votos DEMO iniciales y lee las evaluaciones locales válidas.
2. La vista de evaluación busca la siguiente oferta no evaluada en esta ronda.
3. Deslizar a la derecha o pulsar Aprobar intenta guardar la evaluación positiva.
4. Deslizar a la izquierda o pulsar Rechazar abre el panel. Cerrar o Escape descarta el borrador; enviar u omitir detalles intenta guardar el rechazo.
5. Tras guardar correctamente, se actualiza la memoria de la aplicación, se anuncia el resultado y se muestra la siguiente oferta. Se bloquea el doble envío y se comprueba el identificador de oferta para evitar duplicados.
6. Al entrar al panel, una función calcula cantidades, porcentajes, motivos y comentarios desde todas las evaluaciones. No hay llamadas a servidores.
7. Al terminar, se muestran las acciones del PRD. Reiniciar guarda una ronda vacía y restaura el estado inicial visible, sin borrar otras claves del navegador.

## Stack
Stack aprobado por el usuario:
- **HTML, CSS y JavaScript con módulos:** sin framework de interfaz, para reducir dependencias y mantener comprensible este prototipo de dos vistas. Documentación: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules y https://developer.mozilla.org/en-US/docs/Web/CSS.
- **Vite 7.3.7:** servidor de desarrollo y empaquetado estático. https://vite.dev/guide/. Instalado, compatible con Node 22.17.0 y fijado en el lockfile.
- **Node.js y npm:** herramientas locales, no un backend. Verificados Node `22.17.0` y npm `10.9.2` en este equipo. https://nodejs.org/en y https://docs.npmjs.com/.
- **localStorage:** almacenamiento local versionado. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage.
- **Pointer Events:** gestos con ratón y táctil, sin biblioteca de deslizamiento. https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events.
- **Pruebas:** `node:test` para cálculos y transiciones. Chrome ya instalado se controla con su protocolo de depuración y WebSocket nativo de Node, sin instalar herramientas opcionales. https://nodejs.org/api/test.html y https://chromedevtools.github.io/devtools-protocol/.

## Where It Runs and How Someone Tries It
- Windows, Node and npm are already available. No credentials or remote services are required.
- First run: `npm install`.
- Development: `npm run dev -- --host 127.0.0.1`, using fixed port `5173` with an explicit failure if occupied. Open `http://127.0.0.1:5173`.
- Checks: `npm test` and `npm run build`. With the server running, `npm run test:browser` checks the journey using Chrome installed on Windows; set `BROWSER_PATH` for another compatible path. It uses a separate temporary profile.
- Production preview: `npm run preview -- --host 127.0.0.1`; open the address shown by Vite.
- Record the local demo: show the DEMO notice, Reject with a reason and comment, Submit review, inspect Company dashboard, Approve another offer, complete the round and Reset DEMO.
- Submission requires a short video and a public GitHub repository. Deployment is optional and outside the current scope.

### Submission links
- Public source repository: https://github.com/SergioBenaR/JobPulse — anonymously verified; code licensed under MIT, Copyright (c) 2026 Sergio Benavides. Font licenses remain SIL OFL 1.1.
- Demo video: pending recording/upload and anonymous access check.
- Devpost form/submission: actual URL still needed from the learner; not submitted.
- Detailed technical delivery state: `devpost/ship.md`.

## Look and Feel
Implementa `prd.md > Look and Feel`.
- Variables CSS exactas: fondo `#0D1117`, superficie `#161B22`, texto `#F0F6FC`, acento `#6366F1`, aprobación `#22C55E`, rechazo `#EF4444`.
- Plus Jakarta Sans en interfaz y JetBrains Mono en etiquetas técnicas. Incluidas localmente desde paquetes Fontsource 5.3.0, con sus licencias; fuentes de sistema como respaldo. Referencias: https://fonts.google.com/specimen/Plus+Jakarta+Sans, https://fonts.google.com/specimen/JetBrains+Mono y https://fontsource.org/docs/getting-started/install.
- Jerarquía tipográfica marcada, tarjeta central con salario destacado, bordes discretos y etiquetas técnicas. Diseño adaptable a móvil y escritorio, sin desbordamiento horizontal.
- Panel con cifras claras, barras CSS para motivos y comentarios legibles. No se necesita una librería de gráficos.
- Revisión final: contenedor de evaluación de ancho máximo 510 px centrado, sin columnas laterales; un único aviso global DEMO, títulos “Review offers” y “Company dashboard”, secciones “Rejection reasons” y “Anonymous recommendations”. Sin eslóganes repetidos; no cambiar tamaños ni tipografías.
- DEMO visible en ambas vistas; interfaz, datos ficticios e instrucciones de uso/prueba en inglés por solicitud final del usuario. Nombres propios, identificadores internos y comentarios ya escritos por el usuario se conservan. No añadir motivos culturales específicos no definidos en el PRD.
- Botones Aprobar/Rechazar con texto, foco visible y estado deshabilitado cuando corresponda. El color no es la única señal.
- Panel de rechazo como diálogo accesible: foco dentro, cierre por botón/Escape, vuelta del foco al cerrar. Respetar `prefers-reduced-motion`.

## Components

### App Shell
`src/main.js`: monta la interfaz, controla navegación entre vistas y mensajes de éxito/error. No se necesitan rutas ni cuentas. Implementa `prd.md > Screens and Layout`.

### Offer Review
`src/review.js`: renderiza la oferta pendiente y los botones; reconoce gesto horizontal deliberado (aproximadamente 90 px y predominio horizontal), sin impedir desplazamiento vertical ni disparar votos al pulsar controles interiores. Cancela gestos incompletos. Deshabilita interacciones durante un envío. Implementa `prd.md > Evaluación de ofertas`.

### Rejection Dialog
Dentro de `src/review.js`: selección múltiple de salario, requisitos y beneficios; comentario opcional. Enviar preserva los detalles, omitir los descarta, cerrar elimina el borrador. El texto se inserta como texto, no como HTML. Implementa `prd.md > Evaluación de ofertas` y `States and Boundaries`.

### Dashboard
`src/dashboard.js`: resumen global de las ofertas DEMO, cantidades y porcentajes de aprobación/rechazo, motivos ordenados por frecuencia y recomendaciones con referencia a la oferta. Porcentaje de motivos respecto al total de rechazos, explicado por permitir selección múltiple. Si no hay votos, porcentaje cero; si no hay motivos/comentarios, mensaje vacío. Implementa `prd.md > Panel empresarial`.

### Evaluation Model
`src/model.js`: funciones puras para validar evaluaciones, detectar duplicados, obtener pendientes y calcular métricas. Suma votos iniciales y nuevos sin confundir votos iniciales de otros participantes ficticios con ofertas evaluadas en esta ronda. Implementa `prd.md > Evaluación de ofertas`, `Panel empresarial` y `Fin de ronda y reinicio`.

### Local Repository
`src/storage.js`: carga, valida y guarda bajo `jobpulse.demo.v1`. Persistir antes de actualizar la interfaz; un fallo mantiene oferta y detalles para reintentar. Reiniciar reemplaza únicamente esta clave. Implementa `prd.md > States and Boundaries` y `Fin de ronda y reinicio`.

### Demo Dataset
`src/data.js`: tres ofertas ficticias de desarrollo, con condiciones, requisitos y beneficios, y una colección pequeña de evaluaciones iniciales ficticias. Identificadores estables, empresas inventadas y moneda/unidad salarial explícita. No presentar muestras como empresas o estadísticas reales. Implementa `prd.md > The Core Journey` y `Panel empresarial`.

## Data Model
- `Offer`: `{id, title, company, location, modality, salaryMin, salaryMax, currency, salaryPeriod, seniority, stack[], requirements[], benefits[]}`; vive en `data.js`, no se modifica desde la interfaz.
- `Evaluation`: `{id, offerId, vote: 'approve'|'reject', reasons: string[], comment: string, createdAt}`. Aprobar siempre tiene motivos vacíos y comentario vacío; solo rechazo permite detalles.
- Votos iniciales viven en `data.js`; las nuevas evaluaciones viven en `localStorage` como `{version: 1, evaluations: Evaluation[]}`. Validar estructura, referencias a ofertas, motivos conocidos y una evaluación por oferta en la ronda.
- Navegación, gesto y borrador del diálogo viven solo en memoria. Cambiar de vista descarta el borrador, no las evaluaciones guardadas.
- Reiniciar produce nuevas evaluaciones vacías, conserva los votos iniciales ficticios y vuelve a la primera oferta. La conservación al recargar está aprobada.

## File Structure
```text
JobPulse/
├── index.html              # Entrada de la aplicación
├── package.json            # Scripts y dependencias
├── package-lock.json       # Versiones reproducibles
├── vite.config.js          # Puerto y servidor local
├── src/
│   ├── main.js             # Marco, navegación y coordinación
│   ├── styles.css          # Paleta, tipografía, layouts y estados
│   ├── data.js             # Ofertas y evaluaciones iniciales DEMO
│   ├── model.js            # Reglas y métricas
│   ├── storage.js          # Persistencia local y validación
│   ├── review.js           # Tarjeta, gestos, botones y diálogo
│   ├── dashboard.js        # Resultados derivados
│   └── ui.js               # Iconos y escape de texto
├── tests/
│   ├── model.test.js       # Conteos, pendientes, duplicados y reinicio
│   └── browser.mjs         # Recorrido real con Chrome/CDP sin descargas
├── README.md               # Instalación, demo y límites
├── .gitignore              # Excluye perfil, secretos, dependencias y dist
└── devpost/                # Planes y checklist canónicos en Markdown
```
Las herramientas del curso ya presentes se conservan. No enumerar contenido generado de `node_modules` o `dist`.

## External Services and Dependencies
No API, base de datos alojada, backend, autenticación ni claves. npm obtiene Vite y los paquetes de fuentes Fontsource. Las fuentes se empaquetan localmente para que la ejecución no dependa de peticiones externas. Versiones verificadas en `package-lock.json`. No hay coste de servicio para ejecutar esta propuesta localmente.

## Important Failure Modes
- **Almacenamiento bloqueado o lleno:** mensaje visible; no avanzar ni alterar métricas; conservar borrador y permitir reintentar.
- **Contenido local inválido:** informar del problema y ofrecer restablecer DEMO; no sobrescribir silenciosamente el dato inválido ni inventar un guardado exitoso.
- **Fuentes no disponibles:** usar respaldo del sistema sin bloquear el circuito funcional.
- **Gesto ambiguo:** volver la tarjeta a reposo; botones siempre disponibles. Probar móvil y ratón.

## Verification
- Model checks: combined initial/new votes, exact counts, multiple reasons, rejection without details, zero total and duplicate prevention.
- Browser checks: immediate approval; canceled rejection without changes; submission with details; Skip details discards the draft; reload preserves data; comments render as text; round completion; Reset DEMO restores exact initial results.
- Review both views on desktop and mobile, dialog focus and buttons equivalent to swipes. Build production without errors.

## What Was Simplified and Why
- Un navegador y persistencia local: evita infraestructura y permite demostrar votos reales y métricas derivadas hoy.
- Tres ofertas ficticias y votos iniciales en código: demostración repetible sin editor ni integraciones.
- Barras CSS, dos vistas y módulos JavaScript: suficientes para el PRD, sin librerías de gráficos, navegación o gestos.

## Decisions and Open Issues
- **Decisiones del usuario:** sin backend ni autenticación; sencillez y estabilidad; persistencia local si conviene; botones equivalentes a deslizamientos; modo rápido.
- **Propuesta aprobada por el usuario:** HTML/CSS/JavaScript con Vite y localStorage, demo local y conservación al recargar. Ventaja: pocas piezas; límite: datos solo de este navegador/origen, sin sincronización.
- **Punto abierto aclarado:** la conveniencia de persistencia local se resuelve proponiendo conservar evaluaciones tras recargar y borrarlas con Reiniciar DEMO. Es una explicación/propuesta técnica, no evidencia de dominio del usuario.
- **Comprobado:** Node 22.17.0, npm 10.9.2, Vite 7.3.7 y Fontsource 5.3.0; pruebas y compilación correctas. Chrome disponible; Playwright no instalado, reemplazado por un comprobador CDP sin dependencias adicionales.
- Especificación aprobada; no quedan decisiones técnicas bloqueantes.
