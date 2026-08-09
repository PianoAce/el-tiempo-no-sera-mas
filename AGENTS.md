# Colectivo El tiempo no será más — guía del proyecto

Sitio web del colectivo interdisciplinar de música contemporánea y puesta en
escena (Bogotá). Brief completo en
[`docs/brief-sitio-el-tiempo-no-sera-mas.md`](docs/brief-sitio-el-tiempo-no-sera-mas.md)
y el documento de identidad ampliado en
`docs/Identidad Visual Colectivo Artístico.pdf`. Lee ambos antes de tocar
diseño o copy.

## Posicionamiento (no negociable)

"Alta Cultura Contemporánea" / "Vanguardia Institucional": música académica y
artes vivas al mismo nivel de exigencia. Nunca un concierto con puesta en
escena decorativa, nunca una performance con música de fondo. Personalidad de
marca: sofisticada, ascética, disruptiva. "Que parezca difícil, pero no sea
realmente difícil."

Audiencia dual: programadores/curadores institucionales (Teatro Mayor, Teatro
Colón, IDARTES) y público de arte contemporáneo (circuito San Felipe,
galerías, MAMBO).

## Stack

- Astro + Tailwind CSS v4 (tokens definidos vía `@theme` en
  `src/styles/global.css`, no hay `tailwind.config.js`).
- Sin frameworks de UI (React/Vue). Única excepción de librerías de motion:
  **GSAP + ScrollTrigger** (revelado de texto/secciones) y **Lenis** (scroll
  con inercia), decisión explícita del colectivo tras revisar referentes
  como paulkalkbrenner.net. Todo vive en `src/scripts/motion.ts`, importado
  una sola vez desde `Layout.astro`. Micro-interacciones simples (hover de
  links, botones) se resuelven con CSS puro, no con GSAP.
- **`prefers-reduced-motion: reduce` es obligatorio de respetar**: con esa
  preferencia activa, `motion.ts` no inicializa Lenis/ScrollTrigger y deja
  todo el contenido visible sin animación (ver `showAllStatic()`). Cualquier
  animación nueva que se agregue debe pasar por la misma guarda.
- Nuevas animaciones de scroll (reveals, pines, etc.) usan los patrones
  `[data-hero-reveal]` (fade in al cargar, sin scroll de por medio),
  `[data-reveal]` / `[data-reveal-cta]` (mismo fade, pero disparado al
  entrar en viewport scrolleando; los `[data-reveal-cta]` llevan una
  entrada con rebote, distinta del fade del resto del bloque),
  `[data-split-reveal]` (texto que se revela línea por línea ligado al
  scroll vía SplitText + ScrollTrigger, `mask:"lines"`, inspirado en
  demos.gsap.com/demo/responsive-line-splits-on-scroll; se oculta con JS
  justo antes de dividir en líneas para evitar el flash del párrafo sin
  dividir) y `[data-magnetic]` + `[data-magnetic-label]` (botón que sigue
  levemente el cursor dentro de su zona con `gsap.utils.mapRange` y vuelve
  con rebote elástico al salir, inspirado en
  demos.gsap.com/demo/magnetic-button-overwrite-modes) ya definidos en
  `motion.ts`. Reutilízalos en vez de crear un sistema nuevo por página.
- **Hero de Inicio (`src/pages/index.astro`, primera `<section>`):** foto a
  pantalla completa (fondo, `absolute inset-0`) con el nombre del colectivo
  encima en fade in (`[data-hero-reveal]`) al cargar la página. No es un
  overlay ni un splash que se retira solo: es una sección normal del flujo
  del documento, tan alta como el viewport (`h-dvh`); el usuario la deja
  atrás haciendo scroll, como cualquier otra sección. Antes hubo una
  versión con overlay `position: fixed` que se autodesvanecía tras unos
  segundos (splash clásico); se descartó porque en móvil, al recargar con
  scroll hecho, el overlay tapaba el contenido, y porque el colectivo
  prefirió que la foto y el nombre se comporten como contenido real de la
  página en vez de una animación de entrada que desaparece sola.
- Tipografía autoalojada en `public/fonts/` (ver abajo). Nunca enlazar
  Google Fonts por `<link>` en producción.
- Skill de diseño base instalado en `.claude/skills/design-taste-frontend`
  (Taste Skill). Sus reglas de composición (retícula, densidad, anti-clichés
  de IA, ban de em-dash, etc.) aplican a todo el sitio salvo que este
  documento las sustituya explícitamente.
- MCP de revisión visual: Playwright (`claude mcp add playwright npx
  @playwright/mcp@latest`).

## Design tokens (`src/styles/global.css`)

**Capa estructural — fija en todo el sitio, ~90% del uso de color. Nunca
cambia entre páginas:**

| Token | Valor | Uso |
|---|---|---|
| `--color-paper` (`bg-paper` / `text-paper`) | `#F5F1E8` | Blanco hueso/papel, fondo base. Ajustar con el colectivo, nunca sustituir por `#FFFFFF`. |
| `--color-ink` (`bg-ink` / `text-ink`) | `#17181C` | Grafito profundo / negro ónice. Texto y bloques oscuros. |
| `--color-sand` (`bg-sand`) | `#B8A48A` | Terroso/arena. Fondos secundarios y filtros sutiles sobre foto. |

**Capa de acento — varía por programa/concierto, ~10% del uso de color, un
solo acento por página:**

- `--accent` en `:root` (`src/styles/global.css`), consumido como
  `var(--accent)` o vía `--color-accent`. Por defecto: rojo cadmio oscuro
  `#8B1E1E` (acento flagship del sitio, sin programa asignado todavía).
- Otras opciones del documento de identidad: azul Klein `#002FA7`, verde
  industrial/pino `#1B4332`.
- Para una página de programa/concierto específico, sobrescribe `--accent`
  en un `style` local del layout de esa página (o un wrapper con
  `style="--accent: #002FA7"`), nunca añadas un segundo color saturado.
- Uso exclusivo del acento: numeración, líneas divisorias, marcadores de
  tiempo. Nunca como relleno de botones ni como fondo de sección.

**Tipografía (`--font-display` / `--font-sans`):**

- `Bodoni Moda` (voz primaria, titulares): serif afilada de alto contraste,
  alternativa gratuita a Ogg / GT Alpina / Editorial New. Variable font,
  archivos en `public/fonts/bodoni-variable(-italic).woff2`.
- `Archivo` (voz secundaria, cuerpo/UI): neogrotesca aséptica e
  hiperlegible, alternativa gratuita a Suisse Int'l / Neue Haas Grotesk.
  Variable font, archivos en `public/fonts/archivo-variable(-italic).woff2`.
- Confirmar con el colectivo si eventualmente licencian las tipografías
  premium originales (Grilli Type, Swiss Typefaces); mientras tanto estas
  son las fuentes de producción, no un placeholder temporal.
- **Bifur (`.font-wordmark` en `global.css`, archivo
  `public/fonts/BIFUR___.TTF`): en prueba, no confirmada para producción.**
  Se usa únicamente en las tres apariciones del nombre completo del
  colectivo (`h1` del hero, `#intro-name` del splash, nombre en el footer),
  nunca en titulares generales (`h2`, menú, etc.), porque sus letras son
  intencionalmente incompletas por diseño (revival de la Bifur de Cassandre,
  1929) y dejan de leerse bien en frases largas. **Pendiente**: en dafont
  figura como "gratis para uso personal", así que antes de lanzar hay que
  resolver una licencia comercial con el autor (Tomoyuki "Tee-Wat"
  Watanabe) o reemplazarla por una alternativa con licencia comercial clara.

**Radios:** cero curvas en todo el sitio (`--radius-none`). El ascetismo
táctil no admite esquinas redondeadas.

**Grano fotográfico:** clase `.grain` en `global.css`, un overlay `fixed`
`pointer-events-none` de opacidad muy baja aplicado una sola vez en
`Layout.astro`. Nunca lo repitas dentro de contenedores con scroll (coste de
repintado en móvil).

## Restricciones absolutas (sin excepción)

1. Cero iconografía musical literal: nada de notas, claves, pentagramas,
   siluetas de instrumentos, ondas de sonido genéricas.
2. Nada de tipografías caligráficas, góticas o script.
3. Nada de gradientes multicolor, neón/flúor, brillos artificiales, render
   3D de baja calidad.
4. Nada de horror vacui: nunca llenar la página, nunca fotos de fondo
   saturadas, nunca logos de patrocinador sobredimensionados.
5. Nunca introducir un segundo acento saturado dentro de la misma página.
6. Cero em-dash (`—`) en cualquier texto visible (título, headline, copy,
   botón, alt text). Usa coma, punto o dos puntos. Regla del Taste Skill,
   no negociable.

## Estructura de secciones (IA del sitio)

Inicio (`/`), Sobre nosotros (`/sobre-nosotros`), Repertorio (`/repertorio`),
Próximos conciertos (`/proximos-conciertos`), Contacto (`/contacto`). Los
labels de navegación viven en `Header.astro` (menú de pantalla completa,
detrás de un botón "Menú"); si cambian los slugs, actualízalos ahí y en
cualquier CTA que enlace a esas rutas (por ejemplo `src/pages/index.astro`).

## Sobre nosotros (`src/pages/sobre-nosotros/`)

Grilla de integrantes (`index.astro`) + ficha individual
(`[slug].astro`, con `getStaticPaths()`), inspirada en la sección de
artistas de avantgardeartistsagency.com: wordmark `ETNSM` gigante seguido
de una grilla de tarjetas (foto + nombre en etiqueta papel superpuesta,
`MusicianCard.astro`), y al hacer click una ficha completa con foto grande,
nombre, instrumento, bio y un link "Volver" a la grilla. Los datos viven en
`src/data/musicians.ts` (nombre, slug, instrumento, bio, foto) con
contenido placeholder pendiente de reemplazar por los integrantes reales;
las fotos se cargan igual que las de conciertos, vía `import.meta.glob`
sobre `src/assets/musicians/` y `musicianImage("archivo.jpg")`, sin un
`import` por foto. Si un integrante no trae foto, tarjeta y ficha muestran
el mismo placeholder etiquetado ("Fotografía pendiente") que el carrusel.

La transición de fade entre la grilla y cada ficha (y en general entre
cualquier navegación interna del sitio) es la regla `@view-transition {
navigation: auto; }` en `global.css`, guardada tras
`prefers-reduced-motion: no-preference`. Es la View Transitions API nativa
del navegador (soportada en Chromium), sin router ni SPA: cada click sigue
siendo una carga de página real, por lo que no afecta a Lenis/GSAP/
`motion.ts`, que se reinicializan normalmente en cada carga como siempre.
En navegadores sin soporte, la navegación es instantánea, sin animación,
sin errores.

La biografía del colectivo (`bioParagraphs` en `sobre-nosotros/index.astro`)
es una sección normal, con el mismo patrón `data-reveal` (fade al entrar en
viewport) que el resto del sitio: se probó primero un desplazamiento
horizontal pineado al scroll (inspirado en gsap.com) y se descartó porque
al colectivo no le gustó el resultado.

## Navegación

El header NO muestra una barra de nav persistente: solo el wordmark y un
botón "Menú" que abre un panel lateral (`#site-menu` en `Header.astro`),
fondo papel, que entra desde la derecha y ocupa la mitad del ancho en
desktop (`md:w-1/2`, full width en mobile), dejando el resto de la página
visible detrás, inspirado en el menú de guggenheim-bilbao.eus. Esto es
deliberado (decisión del colectivo): evita que el visitante vea la misma
lista de secciones repetida en el header mientras hace scroll por una
página que ya cubre esas mismas secciones. Cada letra de cada link vive en
su propio `<span class="menu-letter">` (agrupadas por palabra en
`.menu-word` para que el salto de línea no parta una palabra) y gira
`rotateX(360deg)` en hover con un pequeño stagger, terminando legible
igual que al inicio; todo en CSS puro dentro del `<style>` scoped del
componente, guardado tras `prefers-reduced-motion: no-preference`. El
footer no repite la lista de navegación por la misma razón; solo lleva
marca, contacto y copyright.

**Header transparente (`transparent` prop en `Header.astro`, expuesto como
`transparentHeader` en `Layout.astro`):** para páginas con una foto oscura
a pantalla completa debajo (como el hero de Inicio), el header nace sin
fondo y con texto claro (`text-paper`), y solo adopta su estilo sólido de
siempre (`bg-paper/90`, texto `text-ink`) después de hacer scroll (`> 24px`,
ver script de `Header.astro`). En este modo el header es `fixed` en vez de
`sticky`: si fuera `sticky` reservaría su propio alto en el flujo del
documento y empujaría la foto hacia abajo, dejando ver el fondo papel del
`<body>` detrás en vez de la foto. Páginas sin una foto oscura arriba deben
omitir el prop (por defecto `false`, header sólido siempre) para no
terminar con texto claro sobre un fondo claro.

## Imágenes

Fotografía real del colectivo vive en `src/assets/` (no en `public/`), para
que pase por el pipeline de optimización de Astro. Úsala siempre con el
componente `<Image />` de `astro:assets`, nunca con `<img>` directo ni
enlazada desde `public/`. Primer ejemplo: `src/assets/etnsm-cuarteto.jpg`,
usado en `src/pages/index.astro` y como imagen Open Graph por defecto en
`Layout.astro`.

No se usa fotografía de stock genérica (picsum, Unsplash) para simular
presentaciones reales: sería una representación falsa de la marca. Donde
falte una imagen real todavía, deja un bloque placeholder claramente
etiquetado en vez de rellenar con una imagen genérica.

## Conciertos (`src/components/ConcertCarousel.astro`)

Carrusel de dos columnas (foto + info) que alternan de lado en cada slide
(par: foto izquierda/info derecha, impar: al revés), inspirado en la
sección de exposiciones de guggenheim-bilbao.eus. Usado en Inicio
(`src/pages/index.astro`, arreglo `concertSlides`) con contenido de
ejemplo/placeholder pendiente de reemplazar por conciertos reales. Las
fotos se cargan solas desde `src/assets/carousel/` con `import.meta.glob`
(sin un `import` por foto): para agregar una, deja el archivo en esa
carpeta y referéncialo por nombre con `concertImage("archivo.jpg")` en el
arreglo (`{ title, meta, image: concertImage(...), ctaHref }`); si un
slide no trae `image`, se muestra un bloque placeholder etiquetado
("Fotografía pendiente"), nunca una foto genérica. La caja de la foto usa
`aspect-13/12` (no `h-full`) para que su proporción se acerque a la de la
foto real y `object-cover` no tenga que recortar mucho; ajusta ese ratio
si una foto queda muy recortada. Navegación con flechas prev/next
(`data-carousel-prev`/`data-carousel-next`), sin caja ni fondo, solo el
ícono en `text-ink/40` que pasa a `text-ink` en hover (nunca el acento:
ver regla de uso exclusivo del acento arriba). Transición de opacidad
entre slides guardada tras `prefers-reduced-motion`, numeración del slide
actual en `--accent` (uso permitido del acento: numeración), y una entrada
única al hacer scroll donde la foto y la info del primer slide llegan
deslizándose desde los bordes reales de la pantalla (no desde el borde de
su propia columna: se calcula con `window.innerWidth`, no `xPercent`) vía
`[data-side="left"|"right"]` + ScrollTrigger en `motion.ts`.

## Flujo de trabajo

- Después de cada cambio de layout importante: capturar con Playwright MCP
  y revisar el resultado antes de seguir avanzando.
- Priorizar jerarquía tipográfica y ritmo editorial sobre efectos
  decorativos.
- Mantener la capa estructural (neutros, tipografía, layout) idéntica en
  todo el sitio; solo el acento cambia por programa.
- No avanzar a nuevas secciones/páginas sin aprobación explícita sobre la
  base visual ya construida.

## Pendiente antes de lanzar

- `astro.config.mjs` todavía no define `site`. Sin eso, las URLs canónicas y
  las de Open Graph/Twitter (generadas en `Layout.astro`) resuelven contra
  `localhost` en vez del dominio real. Configúralo apenas se defina el
  dominio de producción.
- Licencia comercial de Bifur sin resolver (ver nota en Tipografía). No
  lanzar a producción con `public/fonts/BIFUR___.TTF` hasta confirmarla.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and
`astro dev logs`.

Si un servidor de dev lleva mucho tiempo corriendo (varios días) y una
clase de Tailwind nueva no se aplica pese a que `astro check` no marca
errores, reinícialo (`astro dev stop` + `astro dev --background`) antes de
seguir investigando: se ha visto quedar con una cache obsoleta que no
genera CSS para clases usadas por primera vez en archivos nuevos.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
