# Brief — Sitio web de "El tiempo no será más"

## Contexto
Colectivo colombiano interdisciplinar de música contemporánea y puesta en escena,
con sede en Bogotá. Se posicionan como "Alta Cultura Contemporánea" / "Vanguardia
Institucional": música académica y artes vivas al mismo nivel de exigencia — no
un concierto con puesta en escena decorativa, ni una performance con música de
fondo. El sitio es para **difusión artística y portafolio de presentaciones**,
con audiencia dual: programadores/curadores institucionales (Teatro Mayor, Teatro
Colón, IDARTES) y público de arte contemporáneo (circuito San Felipe, galerías,
MAMBO).

Personalidad de marca: **sofisticada, ascética, disruptiva**. La complejidad debe
sentirse presente pero nunca hermética — "que parezca difícil, pero no sea
realmente difícil".

## Stack
- Astro + Tailwind CSS (ya instalados)
- Skill de diseño base: **Taste Skill** (`design-taste-frontend`)
  ```
  npx skills add leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code
  ```
- MCP de revisión visual: **Playwright**
  ```
  claude mcp add playwright npx @playwright/mcp@latest
  ```
- Opcional, una vez el layout y la tipografía estén resueltos: skill de motion de
  Emil Kowalski (`emil-design-eng`)
  ```
  npx skills add emilkowalski/skill --skill emil-design-eng --agent claude-code
  ```

## Identidad visual

**Filosofía: "Ascetismo táctil"**
- Predominio de blanco, pero NUNCA #FFFFFF puro — blancos matizados (hueso,
  papel, pergamino) que den calidez y textura
- Mucho espacio negativo — el vacío es protagonista, no relleno
- Textura orgánica sutil (grano fotográfico, imperfecciones) contrastando con
  una retícula fría/precisa
- Retículas asimétricas, no centradas — inspiradas en los ritmos no
  retrogradables de Messiaen: bloques tipográficos inesperados, texto empujado
  a los bordes, saltos de línea expansivos

**Capa estructural (fija en todo el sitio, ~90% del uso de color):**
- Blanco hueso/papel — propuesta de partida: `#F5F1E8` (ajustar con el colectivo)
- Grafito profundo / negro ónice (no negro puro) — propuesta: `#17181C`
- Terroso/arena (fondos secundarios, filtros sutiles sobre foto) — propuesta: `#B8A48A`

**Capa de acento (varía por programa/concierto, ~10% del uso de color, un solo
acento por página):**
La base estructural de arriba se mantiene siempre igual; solo este acento
saturado rota por programa. Opciones del documento de identidad:
- Rojo cadmio oscuro — ej. `#8B1E1E`
- Azul Klein — `#002FA7`
- Verde industrial/pino — `#1B4332`

Ejemplo: "Cuarteto para el fin del tiempo" → [asignar uno], otro programa →
[asignar otro]. Uso exclusivo en micro-detalles: numeración, líneas divisorias,
marcadores de tiempo.

**Tipografía (sistema dual):**
- Titulares / voz primaria: serif afilada de alto contraste — referencias: Ogg,
  GT Alpina, Editorial New
- Cuerpo de texto / voz secundaria: neogrotesca modular, aséptica, hiperlegible
  — referencias: Suisse Int'l, Monument Grotesk, Neue Haas Grotesk
- ⚠️ Son tipografías de fundiciones premium (Grilli Type, Swiss Typefaces,
  Production Type, Milieu Grotesque) — confirmar licencia de uso web antes de
  implementar, o usar alternativas gratuitas de look similar (ej. Fraunces para
  la serif de alto contraste, Switzer o General Sans para la neogrotesca)

**Logo:** wordmark dinámico (no símbolo), base neogrotesca con cortes/
sustracciones inusuales, variable en peso/tracking según formato.
[adjuntar archivo del logo]

## Restricciones absolutas (del documento de identidad)
- Cero iconografía musical literal: nada de notas, claves, pentagramas,
  siluetas de instrumentos, ondas de sonido genéricas
- Nada de tipografías caligráficas, góticas o script
- Nada de gradientes multicolor, neón/flúor, brillos artificiales, render 3D
  de baja calidad
- Nada de horror vacui: nunca llenar la página, nunca fotos de fondo
  saturadas, nunca logos de patrocinador sobredimensionados

## Referentes de marca
- **Ensemble Resonanz** (Hamburgo) — referente principal: sistema de identidad
  dinámica que varía por temporada/concierto, bloque de color como "el
  escenario", círculos flotantes como objetos sonoros (nunca literal)
- **CEPROMUSIC** (México) — austero, académico, alto contraste, sans-serif
  modernista
- **Bang on a Can** (NY) — grotescas de gran peso, estética industrial,
  fotografía cruda — buena referencia para el lado de difusión/B2C
- **Evitar**: la estética de Le Balcon (París) — demasiado saturada, oscura y
  maximalista para este colectivo

## Secciones del sitio
Inicio
Sobre nosotros
Repertorio
Proximos cociertos
Contacto

## Referencias de inspiración
https://www.avantgardeartistsagency.com
https://www.paulkalkbrenner.net
https://theirisk.com
https://efimovaudio.com

## Reglas de trabajo para Claude Code
- Después de cada cambio de layout importante: capturar con Playwright MCP y
  revisar el resultado antes de seguir avanzando.
- Priorizar jerarquía tipográfica y ritmo editorial sobre efectos decorativos.
- Mantener la capa estructural (neutros, tipografía, layout) idéntica en todo
  el sitio; solo el acento cambia por programa.
- No introducir un segundo acento dentro de la misma página bajo ninguna
  circunstancia.
- Aplicar las restricciones absolutas de la sección anterior sin excepción.
- Crea un archivo CLAUDE.md para que a la hora de trabajar siempre haya una base la cual sirva para estructurar bien el documento
