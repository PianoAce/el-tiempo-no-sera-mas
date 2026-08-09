import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function showAllStatic() {
  document
    .querySelectorAll<HTMLElement>(
      "[data-hero-reveal], [data-reveal], [data-reveal-cta]",
    )
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
}

if (reduceMotion) {
  showAllStatic();
} else {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Hero (solo Inicio): foto a pantalla completa + nombre del colectivo.
  // Fade in al cargar; se queda visible, no se oculta ni se retira. El
  // usuario lo deja atras haciendo scroll, como cualquier otra seccion.
  const heroReveal = document.querySelector<HTMLElement>("[data-hero-reveal]");
  if (heroReveal) {
    gsap.set(heroReveal, { opacity: 0, y: 16 });
    gsap.to(heroReveal, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: 0.2,
      ease: "power2.out",
    });
  }

  // Secciones inferiores: fade + traslado al entrar en viewport.
  // Los CTAs dentro de cada seccion (data-reveal-cta) llevan su propia
  // entrada con rebote, encadenada un poco despues del resto del bloque.
  const revealEls = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  revealEls.forEach((el) => {
    const ctaEls = el.querySelectorAll<HTMLElement>("[data-reveal-cta]");

    gsap.set(el, { opacity: 0, y: 24 });
    if (ctaEls.length) {
      gsap.set(ctaEls, { opacity: 0, y: 18, scale: 0.92 });
    }

    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
        if (ctaEls.length) {
          tl.to(
            ctaEls,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              stagger: 0.1,
            },
            0.35,
          );
        }
      },
    });
  });

  // Conciertos: la foto y la info del primer slide entran deslizandose
  // desde los extremos de la pantalla (no desde el borde de su propia
  // columna) al hacer scroll hasta la seccion, una sola vez.
  const carouselSection = document.querySelector<HTMLElement>("[data-carousel]");
  if (carouselSection) {
    const sides = carouselSection.querySelectorAll<HTMLElement>(
      ".carousel-slide.is-active [data-side]",
    );
    if (sides.length) {
      sides.forEach((el) => {
        const fromLeft = el.dataset.side === "left";
        gsap.set(el, { x: fromLeft ? -window.innerWidth : window.innerWidth });
      });

      ScrollTrigger.create({
        trigger: carouselSection,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(sides, {
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
      });
    }
  }

  // Texto con revelado linea por linea ligado al scroll (SplitText +
  // ScrollTrigger), inspirado en
  // demos.gsap.com/demo/responsive-line-splits-on-scroll. Se oculta con
  // JS justo antes de dividir en lineas (evita el flash del parrafo sin
  // dividir) y se vuelve a mostrar dentro de onSplit, ya con cada linea
  // enmascarada. autoSplit: true recalcula todo si cambia el ancho.
  const splitEls = gsap.utils.toArray<HTMLElement>("[data-split-reveal]");
  if (splitEls.length) {
    gsap.set(splitEls, { opacity: 0 });
    document.fonts.ready.then(() => {
      splitEls.forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (instance) => {
            gsap.set(el, { opacity: 1 });
            return gsap.from(instance.lines, {
              yPercent: 120,
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                scrub: true,
                start: "clamp(top 93%)",
                end: "clamp(bottom 70%)",
              },
            });
          },
        });
      });
    });
  }

  // Boton magnetico: se acerca levemente al cursor dentro de su zona y
  // vuelve con rebote al salir. Inspirado en
  // demos.gsap.com/demo/magnetic-button-overwrite-modes.
  const magneticZones = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
  magneticZones.forEach((zone) => {
    const label = zone.querySelector<HTMLElement>("[data-magnetic-label]");
    const zoneStrength = 0.3;
    const labelStrength = 0.5;

    zone.addEventListener("mousemove", (e) => {
      const rect = zone.getBoundingClientRect();
      const x = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX,
      );
      const y = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY,
      );

      gsap.to(zone, {
        x: x * zoneStrength,
        y: y * zoneStrength,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
      if (label) {
        gsap.to(label, {
          x: x * labelStrength,
          y: y * labelStrength,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      }
    });

    zone.addEventListener("mouseleave", () => {
      gsap.to(zone, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
      if (label) {
        gsap.to(label, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        });
      }
    });
  });
}
