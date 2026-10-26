# JobPulse

**El pulso del talento tech.** Prototipo funcional para evaluar las condiciones de ofertas laborales y convertir votos, motivos de rechazo y recomendaciones anónimas en métricas útiles.

> **DEMO:** todas las empresas, ofertas y opiniones iniciales son ficticias. Las evaluaciones que envíes sí actualizan los resultados del prototipo. No son estadísticas del mercado laboral.

## Ejecutar

Requiere Node.js 22.12+ (verificado con 22.17.0) y npm.

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Abre **http://127.0.0.1:5173**. Mantén la terminal abierta. Para detener el servidor, pulsa `Ctrl+C`.

```sh
npm test       # Lógica, persistencia, resultados y contratos de renderizado
npm run build # Genera dist/
npm run preview -- --host 127.0.0.1
```

La vista previa abre en http://127.0.0.1:4173. Cada dirección/origen tiene su propio almacenamiento; usa la misma URL durante la grabación.

Con el servidor de desarrollo activo, `npm run test:browser` comprueba el circuito en Chrome instalado en Windows, con un perfil temporal independiente. No descarga navegadores ni frameworks. Si Chrome está en otra ruta, indica `BROWSER_PATH`. Las capturas de verificación se guardan en la carpeta temporal `opencode` del entorno de desarrollo.

## Recorrido de demostración

1. En el panel empresarial, observa **8 evaluaciones iniciales: 5 aprobaciones y 3 rechazos**.
2. En Evaluar ofertas, pulsa Rechazar o desliza a la izquierda. Cierra el panel: no debe cambiar ningún voto.
3. Rechaza otra vez; selecciona Salario y escribe una recomendación sin información personal. Pulsa **Enviar evaluación**.
4. Abre el panel: hay **9 evaluaciones y 4 rechazos**, un nuevo motivo y el comentario enviado.
5. Vuelve a evaluar; aprueba con el botón o deslizando a la derecha. La aprobación se guarda inmediatamente.
6. Recarga: tu progreso y las métricas se conservan.
7. Evalúa la última oferta con **Omitir detalles**: cuenta el rechazo sin añadir motivos ni comentarios.
8. Aparece **Has evaluado todas las ofertas**. Ver resultados abre el panel; **Reiniciar DEMO** devuelve las 3 ofertas y las métricas iniciales.

## Cómo funciona

- HTML, CSS y JavaScript modular; Vite para desarrollo y compilación.
- Plus Jakarta Sans y JetBrains Mono, incluidas localmente mediante paquetes Fontsource con sus licencias.
- `src/data.js`: tres ofertas y votos iniciales ficticios.
- `src/model.js`: reglas, duplicados, pendientes y cálculos de métricas.
- `src/storage.js`: lectura y escritura versionada en `jobpulse.demo.v1`.
- `src/review.js`: tarjeta, gestos y panel de rechazo.
- `src/dashboard.js`: resultados derivados de los votos.
- `src/main.js`: navegación y coordinación entre vistas y almacenamiento.

## Límites

Sin backend, cuentas, postulación ni sincronización entre dispositivos o pestañas. Las nuevas opiniones se guardan solo en este navegador/origen, sin recoger nombres ni correos. No es un servicio de anonimato para producción. Borrar los datos del sitio elimina la ronda local. Reiniciar DEMO solo reemplaza la clave del proyecto.

Los motivos permiten selección múltiple: sus porcentajes usan el total de rechazos y no necesariamente suman 100%. Un rechazo sin detalles cuenta en el total, sin motivos inventados.

Si el almacenamiento falla, no se avanza ni se muestra éxito. Si contiene datos inválidos, la app informa y ofrece restablecer la DEMO sin sobrescribirlos silenciosamente.

## Planificación y entrega

Planes y progreso en `devpost/`. El perfil personal de aprendizaje está excluido de Git. La entrega del hackathon requiere un vídeo breve y un repositorio público de GitHub; el despliegue es opcional.
