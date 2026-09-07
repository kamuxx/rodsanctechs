/* =============================================
   RodSancTechs — Landing Page JS
   ============================================= */
(function () {
  "use strict";

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---------- Navbar solid on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const setNavBg = () => {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(255,255,255,0.85)";
      navbar.style.backdropFilter = "blur(16px)";
      navbar.style.webkitBackdropFilter = "blur(16px)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.backdropFilter = "none";
      navbar.style.webkitBackdropFilter = "none";
    }
  };
  if (navbar) {
    setNavBg();
    window.addEventListener("scroll", setNavBg, { passive: true });
  }

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      mobileMenu.classList.toggle("hidden", open);
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.add("hidden");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && !reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ---------- Chat: Brief de Intenciones ---------- */
  const ctaView = document.getElementById("ctaView");
  const chatView = document.getElementById("chatView");
  const startChatBtn = document.getElementById("startChatBtn");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatStatus = document.getElementById("chatStatus");
  const ratingView = document.getElementById("ratingView");
  const ratingLabel = document.getElementById("ratingLabel");
  const submitRating = document.getElementById("submitRating");
  const navCotizar = document.getElementById("navCotizar");

  var messages = [];
  var briefComplete = false;
  var lastBriefData = null;
  var selectedRating = 0;
  var ratingLabels = ["", "Mala", "Regular", "Buena", "Muy buena", "Excelente"];

  /* -- Open/close chat -- */
  function openChat() {
    ctaView.classList.add("fade-out");
    setTimeout(() => {
      ctaView.classList.add("hidden");
      chatView.classList.remove("hidden");
      chatView.classList.add("slide-in");
      if (messages.length === 0) startConversation();
    }, 300);
  }

  function closeChat() {
    chatView.classList.remove("slide-in");
    chatView.classList.add("hidden");
    ctaView.classList.remove("hidden", "fade-out");
  }

  if (startChatBtn) startChatBtn.addEventListener("click", openChat);
  if (closeChatBtn) closeChatBtn.addEventListener("click", closeChat);
  if (navCotizar) {
    navCotizar.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("brief").scrollIntoView({ behavior: "smooth" });
      setTimeout(openChat, 600);
    });
  }

  /* -- Chat helpers -- */
  function addMessage(text, sender) {
    var wrapper = document.createElement("div");
    wrapper.className =
      "flex " + (sender === "bot" ? "justify-start" : "justify-end");
    var bubble = document.createElement("div");
    bubble.className =
      "chat-bubble max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-2xl whitespace-pre-line " +
      (sender === "bot"
        ? "bg-slate-100 text-slate-700 rounded-tl-md border border-slate-200"
        : "bg-gradient-to-r from-accent to-accent-deep text-white rounded-tr-md");
    bubble.textContent = text;
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
  }

  function addBriefSummary(briefObj) {
    var wrapper = document.createElement("div");
    wrapper.className = "flex justify-start";
    var el = document.createElement("div");
    el.className = "brief-summary";
    var html = "<strong>Resumen del proyecto</strong>\n\n";
    html += "Tipo: " + (briefObj.projectType || "-") + "\n";
    html += "Idea: " + (briefObj.idea || "-") + "\n";
    html += "Dirigido a: " + (briefObj.target || "-") + "\n";
    html += "Objetivo: " + (briefObj.problem || "-") + "\n";
    html += "Detalle: " + (briefObj.detailLabel + ": " + briefObj.detailValue || "-") + "\n";
    html += "Complejidad: " + (briefObj.complejidad || "-") + "\n";
    html += "Timeline: " + (briefObj.timeline || "-") + "\n";
    html += "Presupuesto: " + (briefObj.presupuesto || "-") + "\n";
    html += "Modalidad: " + (briefObj.modalidad || "-") + "\n\n";
    html += "Contacto\n";
    html += "Nombre: " + (briefObj.nombre || "-") + "\n";
    html += "Email: " + (briefObj.email || "-") + "\n";
    html += "Empresa: " + (briefObj.empresa || "-") + "\n";
    html += "WhatsApp: " + (briefObj.whatsapp || "-");
    el.textContent = html;
    wrapper.appendChild(el);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
  }

  function addTyping() {
    removeTyping();
    var wrapper = document.createElement("div");
    wrapper.className = "flex justify-start";
    wrapper.id = "typingIndicator";
    var el = document.createElement("div");
    el.className =
      "bg-slate-100 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5";
    for (var i = 0; i < 3; i++) {
      var dot = document.createElement("span");
      dot.style.cssText =
        "width:6px;height:6px;border-radius:50%;background:rgb(167 139 250);animation:statusBounce 1.4s infinite ease-in-out;";
      if (i === 1) dot.style.animationDelay = "0.16s";
      if (i === 2) dot.style.animationDelay = "0.32s";
      el.appendChild(dot);
    }
    wrapper.appendChild(el);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
  }

  function removeTyping() {
    var el = document.getElementById("typingIndicator");
    if (el) el.remove();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function setInputEnabled(enabled) {
    chatInput.disabled = !enabled;
  }

  function setStatus(text, show) {
    if (!chatStatus) return;
    chatStatus.textContent = text;
    chatStatus.className = show ? "chat-status is-typing" : "chat-status";
  }

  /* -- Parse brief from AI response -- */
  function parseBrief(text) {
    var m = text.match(/___BRIEF___(\{.*\})/);
    if (m) {
      try {
        return JSON.parse(m[1]);
      } catch (e) {
        console.error("Brief parse error:", e);
      }
    }
    return null;
  }

  /* -- Call AI (OpenRouter) -- */
  var OPENROUTER_KEY = "***REMOVED***";
  var AI_MODEL = "minimax/minimax-m3:free";

  function callAI(userMessage, callback) {
    messages.push({ role: "user", content: userMessage });

    var systemPrompt =
      "Eres Lester, un desarrollador full-stack y backend senior con 9+ años de experiencia. " +
      "Estás en el sitio web de RodSancTechs, dos co-fundadores que ofrecen servicios de desarrollo. " +
      "Tu objetivo es hacer UNA pregunta a la vez para entender el proyecto del visitante. " +
      "Adapta tus preguntas a sus respuestas, no sigas un guión rígido. " +
      "Cuando tengas suficiente información, emite exactamente: ___BRIEF___{JSON} " +
      "con los campos: projectType, idea, target, problem, detailLabel, detailValue, complejidad, timeline, presupuesto, modalidad, nombre, email, empresa, whatsapp. " +
      "IMPORTANTE: después del JSON, NO agregues ningún texto adicional. " +
      "Responde en español, sé amigable y profesional.";

    var body = {
      model: AI_MODEL,
      messages: [{ role: "system", content: systemPrompt }].concat(messages),
      max_tokens: 500,
    };

    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENROUTER_KEY,
        "HTTP-Referer": window.location.href,
      },
      body: JSON.stringify(body),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.choices && data.choices[0]) {
          var reply = data.choices[0].message.content;
          messages.push({ role: "assistant", content: reply });
          callback(null, reply);
        } else {
          callback(new Error("No response from AI"));
        }
      })
      .catch(function (err) { callback(err); });
  }

  /* -- Save to Google Sheets via Apps Script -- */
  var SHEETS_URL = "https://script.google.com/macros/s/AKfycbx_LQTMgSVwXd6ajzG0c_GNpOUv8arwkkRm7TOnFKL90XaikXNE5W4v5SdvN1AWnClY/exec";

  function saveToSheet(briefData, callback) {
    var payload = {
      nombre: briefData.nombre || "",
      email: briefData.email || "",
      empresa: briefData.empresa || "",
      whatsapp: briefData.whatsapp || "",
      projectType: briefData.projectType || "",
      idea: briefData.idea || "",
      target: briefData.target || "",
      problem: briefData.problem || "",
      detailLabel: briefData.detailLabel || "",
      detailValue: briefData.detailValue || "",
      complejidad: briefData.complejidad || "",
      timeline: briefData.timeline || "",
      presupuesto: briefData.presupuesto || "",
      modalidad: briefData.modalidad || "",
      rating: selectedRating || "",
      messages: messages,
    };

    console.log("Saving to Sheets:", JSON.stringify(payload, null, 2));

    fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        console.log("Sheets response:", res.status, res.statusText);
        if (res.ok || res.status === 200) {
          callback(null);
        } else {
          callback(new Error("HTTP " + res.status + " " + res.statusText));
        }
      })
      .catch(function (err) {
        console.error("Sheets fetch error:", err);
        var params = new URLSearchParams(payload);
        var url = SHEETS_URL + "?" + params.toString();
        fetch(url, { method: "GET", mode: "no-cors" })
          .then(function () { callback(null); })
          .catch(function () { callback(err); });
      });
  }

  /* -- Handle user input -- */
  function handleInput(text) {
    if (!text || !text.trim()) return;
    text = text.trim();
    addMessage(text, "client");
    setInputEnabled(false);
    setStatus("Lester esta escribiendo...", true);

    callAI(text, function (err, reply) {
      removeTyping();
      if (err) {
        addMessage(
          "Disculpa, tuve un problema técnico. Intenta de nuevo. " + err,
          "bot",
        );
        setInputEnabled(true);
        setStatus("", false);
        return;
      }

      var briefData = parseBrief(reply);

      if (briefData) {
        briefComplete = true;
        setTimeout(function () {
          addBriefSummary(briefData);

          // Show CTA button
          var btnWrapper = document.createElement("div");
          btnWrapper.className = "flex justify-start mt-3";
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "chat-cta-btn";
          btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
            "Solicitar cotizaci\u00f3n";
          btn.addEventListener("click", function () {
            btn.disabled = true;
            btn.textContent = "Guardando...";
            lastBriefData = briefData;
            saveToSheet(briefData, function (err) {
              if (err) {
                console.error("Sheet save error:", err);
                btn.textContent = "Error al guardar";
                setTimeout(function () {
                  btn.disabled = false;
                  btn.textContent = "Reintentar";
                }, 3000);
                return;
              }
              btn.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
                "Guardado correctamente";
              setTimeout(showRating, 1500);
            });
          });
          btnWrapper.appendChild(btn);
          chatMessages.appendChild(btnWrapper);
          scrollToBottom();

          setStatus("Brief completo", false);
          setInputEnabled(true);
          chatInput.placeholder = "Describe tu proyecto...";
        }, 1000);
      } else {
        addMessage(reply, "bot");
        setStatus("", false);
        setInputEnabled(true);
      }
    });
  }

  /* -- Rating -- */
  function showRating() {
    if (ratingView) ratingView.classList.remove("hidden");
    selectedRating = 0;
    document.querySelectorAll(".star-btn").forEach(function (s) {
      s.classList.remove("active");
    });
    if (ratingLabel) ratingLabel.textContent = "";
  }

  document.querySelectorAll(".star-btn").forEach(function (s) {
    s.addEventListener("mouseenter", function () {
      var val = parseInt(this.getAttribute("data-value"));
      document.querySelectorAll(".star-btn").forEach(function (b) {
        b.classList.toggle(
          "active",
          parseInt(b.getAttribute("data-value")) <= val,
        );
      });
    });
    s.addEventListener("mouseleave", function () {
      document.querySelectorAll(".star-btn").forEach(function (b) {
        b.classList.toggle(
          "active",
          parseInt(b.getAttribute("data-value")) <= selectedRating,
        );
      });
    });
    s.addEventListener("click", function () {
      selectedRating = parseInt(this.getAttribute("data-value"));
      ratingLabel.textContent = ratingLabels[selectedRating];
      document.querySelectorAll(".star-btn").forEach(function (b) {
        b.classList.toggle(
          "active",
          parseInt(b.getAttribute("data-value")) <= selectedRating,
        );
      });
    });
  });

  if (submitRating) {
    submitRating.addEventListener("click", function () {
      if (!selectedRating || !lastBriefData) return;
      submitRating.disabled = true;
      submitRating.textContent = "Enviando...";

      var ratingPayload = {
        nombre: lastBriefData.nombre || "",
        email: lastBriefData.email || "",
        rating: selectedRating,
        ratingLabel: ratingLabels[selectedRating],
      };

      fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ratingPayload),
      })
        .then(function () {
          if (ratingLabel) ratingLabel.textContent = "\u00a1Gracias por tu calificaci\u00f3n!";
          setTimeout(function () {
            if (ratingView) ratingView.classList.add("hidden");
            closeChat();
            resetChat();
          }, 2000);
        })
        .catch(function () {
          submitRating.disabled = false;
          submitRating.textContent = "Reintentar";
        });
    });
  }

  function resetChat() {
    messages = [];
    briefComplete = false;
    lastBriefData = null;
    selectedRating = 0;
    if (chatMessages) chatMessages.innerHTML = "";
    document.querySelectorAll(".star-btn").forEach(function (s) {
      s.classList.remove("active");
    });
    if (ratingLabel) ratingLabel.textContent = "";
    if (submitRating) {
      submitRating.disabled = false;
      submitRating.textContent = "Enviar calificaci\u00f3n";
      submitRating.classList.add("hidden");
    }
    if (chatInput) chatInput.placeholder = "Cu\u00e9ntame tu idea...";
  }

  /* -- Start conversation -- */
  function startConversation() {
    addTyping();
    setInputEnabled(false);
    setStatus("Lester esta escribiendo...", true);

    callAI(
      "Un nuevo visitante llego a tu sitio web. Inicia la conversacion con un saludo breve y pidele que te cuente su proyecto.",
      function (err, reply) {
        removeTyping();
        if (err) {
          addMessage(
            "Hola! Bienvenido. Cu\u00e9ntame: \u00bfqu\u00e9 necesitas construir?",
            "bot",
          );
          setInputEnabled(true);
          setStatus("", false);
          return;
        }
        var briefData = parseBrief(reply);
        if (!briefData) {
          addMessage(reply, "bot");
        }
        setInputEnabled(true);
        setStatus("", false);
      },
    );
  }

  /* -- Chat form submit -- */
  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = chatInput.value.trim();
      if (!val || chatInput.disabled || briefComplete) return;
      chatInput.value = "";
      chatInput.style.height = "auto";
      handleInput(val);
    });
  }

  /* -- Auto-resize textarea -- */
  if (chatInput) {
    chatInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 120) + "px";
    });
  }

  /* ---------- Tech tags hover effect ---------- */
  document.querySelectorAll(".tech-tag").forEach(function (tag) {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 4px 12px rgba(124, 58, 237, 0.15)";
    });
    tag.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

})();
