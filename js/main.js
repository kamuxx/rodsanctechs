/* Aurora cosmos — interacción y movimiento
   Un momento de autor: la constelación conecta sus nodos al hacer scroll;
   el resto es aparición medida y el console de "sistema trabajando".
*/
(function () {
  "use strict";

  // habilita las animaciones que dependen de JS (evita contenido oculto si JS falla)
  document.documentElement.classList.add("js");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- estrellas ---------- */
  (function stars() {
    const host = document.getElementById("stars");
    if (!host || reduced) return;
    const frag = document.createDocumentFragment();
    const n = 90;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "star";
      const size = Math.random() * 1.6 + 1;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.setProperty("--tw", Math.random() * 5 + 3 + "s");
      s.style.animationDelay = Math.random() * 5 + "s";
      frag.appendChild(s);
    }
    host.appendChild(frag);
  })();

  /* ---------- nav sólida al bajar ---------- */
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- menú móvil ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      }
    });
  }

  /* ---------- aparición al hacer scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && !reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    revealEls.forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) {
        el.style.setProperty("--d", (i % 4) * 0.09 + "s");
      }
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- constelación: se enciende nodo por nodo al llegar a la vista ---------- */
  // Los arcos del viaje son geometría SVG estática (escalan con el contenedor);
  // este observador solo prende los nodos en secuencia al entrar a la sección.
  const cosmos = document.getElementById("cosmos");
  const nodes = cosmos ? cosmos.querySelectorAll(".node") : [];
  const lightNodes = () => nodes.forEach((n) => n.classList.add("is-on"));
  if (cosmos && nodes.length) {
    if (!reduced && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              lightNodes();
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(cosmos);
    } else {
      lightNodes();
    }
  }

  /* ---------- console de "sistema trabajando" ---------- */
  const log = document.getElementById("consoleLog");
  const LINES = [
    { kind: "dim", text: "> relevando cómo trabaja tu equipo hoy ..." },
    { kind: "cyan", text: "  ✓ procesos mapeados" },
    { kind: "dim", text: "> diseñando la solución a tu medida ..." },
    { kind: "cyan", text: "  ✓ pantallas y flujos" },
    { kind: "dim", text: "> construyendo en etapas visibles ..." },
    { kind: "violet", text: "  ✓ vos ves el avance real" },
    { kind: "dim", text: "> probando con datos de tu negocio ..." },
    { kind: "cyan", text: "  ✓ corre de verdad, no es una demo" },
    { kind: "dim", text: "> desplegando y acompañando a tu equipo ..." },
    { kind: "teal", text: "  ✓ listo para trabajar" },
  ];
  const spanFor = (kind) =>
    kind === "cyan"
      ? '<span class="cyan">'
      : kind === "violet"
        ? '<span class="violet">'
        : kind === "teal"
          ? '<span class="teal">'
          : "";
  if (log && !reduced) {
    let buffer = "";
    let li = 0;
    const print = (html) => {
      log.innerHTML = html;
    };
    const typeLine = (full, cls, done) => {
      buffer += (buffer ? "\n" : "") + cls;
      let i = 0;
      const step = () => {
        i++;
        buffer += full[i - 1];
        print(buffer);
        if (i < full.length) {
          setTimeout(step, 12);
        } else {
          buffer += cls ? "</span>" : "";
          print(buffer);
          done();
        }
      };
      step();
    };
    const typeCommand = (done) => {
      buffer = '<span class="dim">construir tu sistema</span>';
      print(buffer);
      done();
    };
    const next = () => {
      if (li >= LINES.length) {
        buffer += '<span class="caret">▌</span>';
        print(buffer);
        return;
      }
      const { kind, text } = LINES[li];
      const done = () => {
        li++;
        setTimeout(next, kind === "dim" ? 300 : 500);
      };
      typeLine(text, spanFor(kind), done);
    };
    typeCommand(() => setTimeout(next, 1100));
  } else if (log) {
    const reducedLines = LINES.filter(
      (l) => l.kind === "cyan" || l.kind === "teal",
    )
      .map((l) => spanFor(l.kind) + l.text.replace(/^  /, "") + "</span>")
      .join("<br>");
    log.innerHTML =
      '<span class="dim">construir tu sistema</span><br>' + reducedLines;
  }

  /* ---------- formulario de contacto (compone un correo) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const note = document.getElementById("formNote");
    // PLACEHOLDER: reemplazar por el email real del desarrollador.
    const EMAIL = "hola@tudominio.com";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const contacto = form.contacto.value.trim();
      let ok = true;
      [form.nombre, form.contacto].forEach((f) => {
        const valid = f.value.trim().length > 0;
        f.setAttribute("aria-invalid", String(!valid));
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent =
          "Completá al menos tu nombre y un medio para responderte.";
        note.dataset.err = "true";
        note.dataset.ok = "";
        return;
      }
      const negocio = form.negocio.value.trim() || "sin especificar";
      const tipo = form.tipo.value;
      const tipoLabel = form.tipo.options[form.tipo.selectedIndex].text;
      const msg = form.mensaje.value.trim() || "(sin mensaje)";
      const body =
        "Nombre: " +
        nombre +
        "\n" +
        "Negocio: " +
        negocio +
        "\n" +
        "Contacto: " +
        contacto +
        "\n" +
        "Necesito: " +
        tipoLabel +
        "\n\n" +
        "Mensaje:\n" +
        msg;
      const subject = encodeURIComponent(
        "Consulta web — " + nombre + (tipo ? " (" + tipo + ")" : ""),
      );
      window.location.href =
        "mailto:" +
        EMAIL +
        "?subject=" +
        subject +
        "&body=" +
        encodeURIComponent(body);
      note.textContent =
        "¡Gracias! Se abrió tu correo para enviarme el mensaje.";
      note.dataset.ok = "true";
      note.dataset.err = "";
      form.reset();
    });
  }
})();
