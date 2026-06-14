/* =========================================================================
   Showroom — interactions
   Renders an image-forward gallery from window.ATLAS_DATA: a justified
   photo grid of real outputs (with generated poster plates as fallback),
   editorial field nav, search, and a detail lightbox.
   ========================================================================= */
(function () {
  "use strict";
  const DATA = window.ATLAS_DATA;
  if (!DATA) { console.error("ATLAS_DATA missing"); return; }

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const byId = Object.fromEntries(DATA.entries.map(e => [e.id, e]));
  const catColor = Object.fromEntries(DATA.categories.map(c => [c.id, c.color]));
  const catName = Object.fromEntries(DATA.categories.map(c => [c.id, c.name]));
  const surfaceLabel = Object.fromEntries(DATA.surfaces.map(s => [s.id, s.label]));

  const state = { q: "", field: null };

  const esc = s => (s || "").replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtStars = n => n == null ? null :
    n >= 1000 ? ((n / 1000 >= 100 ? Math.round(n / 1000) : (n / 1000).toFixed(1).replace(/\.0$/, "")) + "k") : String(n);
  const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };
  const plateVars = id => {                      // deterministic gradient variety per plate
    let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const ar = (1.2 + (h % 36) / 100).toFixed(2);
    const gx = 8 + ((h >> 3) % 32), gy = 4 + ((h >> 8) % 26), ang = 124 + ((h >> 5) % 64);
    return `--ar:${ar};--gx:${gx}%;--gy:${gy}%;--ang:${ang}deg`;
  };

  /* ---------- hero + chrome --------------------------------------------- */
  function chrome() {
    const t = DATA.meta.totals;
    const stats = [
      [t.tools, "tools"],
      [t.fields, "fields"],
      [t.withPreview, "live previews"],
      [fmtStars(t.stars), "GitHub stars"],
    ];
    $("#heroStats").innerHTML = stats.map(([n, l]) =>
      `<div class="stat"><span class="stat-num">${n}</span><span class="stat-label">${l}</span></div>`).join("");
    $("#eyebrow").textContent =
      `${t.tools} tools · ${t.fields} fields · researched ${DATA.meta.lastResearched}`;
    $("#topCount").textContent = `${t.tools} tools`;
    $("#footBase").textContent =
      `${t.withPreview} of ${t.tools} tools show a real output preview · star counts are snapshots · researched ${DATA.meta.lastResearched} · listing is not endorsement.`;
  }

  function marquee() {
    const shots = DATA.entries.filter(e => e.preview).slice(0, 16);
    if (!shots.length) { $("#marquee").style.display = "none"; return; }
    const html = shots.map(e =>
      `<img src="${esc(e.preview.src)}" alt="" loading="lazy">`).join("");
    $("#marqueeTrack").innerHTML = html + html;   // doubled for seamless loop
  }

  /* ---------- field nav -------------------------------------------------- */
  function fieldNav() {
    $("#fieldLinks").innerHTML = DATA.categories.filter(c => c.count).map(c =>
      `<button class="field-link" data-field="${c.id}" style="--c:${c.color}">
         <span class="dot"></span>${esc(c.name.replace(/ &.*/, m => m))}<span class="n">${c.count}</span>
       </button>`).join("");
    $$("#fieldLinks .field-link").forEach(b =>
      b.addEventListener("click", () => toggleField(b.dataset.field)));
  }
  function toggleField(id) {
    state.field = state.field === id ? null : id;
    applyFilters();
    if (state.field) {
      const el = $(`#sec-${state.field}`);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 104, behavior: "smooth" });
    }
  }

  /* ---------- showcase --------------------------------------------------- */
  function itemHTML(e) {
    const color = catColor[e.category] || "var(--accent)";
    const io = `<span>${esc(e.input)}</span><span class="arr">→</span><span>${esc(e.output)}</span>`;
    const search = esc((e.name + " " + e.note + " " + e.input + " " + e.output + " " +
      (e.deps || []).join(" ") + " " + (surfaceLabel[e.surface] || "") + " " + catName[e.category]).toLowerCase());
    const common = `data-id="${e.id}" data-search="${search}" style="--c:${color};--ar:`;
    if (e.preview) {
      const ar = Math.max(0.9, Math.min(2.4, e.preview.w / e.preview.h)).toFixed(2);
      return `<a class="item reveal" href="${esc(e.url)}" ${common}${ar}" data-lb>
        <img src="${esc(e.preview.src)}" loading="lazy" alt="${esc(e.name)} output">
        <div class="item-cap">
          <h3 class="item-name">${esc(e.name)}</h3>
          <p class="item-io">${io}</p>
        </div></a>`;
    }
    return `<button class="item plate reveal" data-id="${e.id}" data-search="${search}"
        style="--c:${color};${plateVars(e.id)}" data-lb>
      <div class="plate-body">
        <span class="plate-kind">${esc(surfaceLabel[e.surface] || e.surface)}</span>
        <div>
          <h3 class="plate-name">${esc(e.name)}</h3>
          <p class="plate-io"><span>${esc(e.input)}</span> <span class="arr">→</span> ${esc(e.output)}</p>
        </div>
      </div></button>`;
  }

  function showcase() {
    let html = "";
    DATA.categories.forEach((c, i) => {
      const group = DATA.entries.filter(e => e.category === c.id);
      if (!group.length) return;
      // images first so each field leads with real outputs
      group.sort((a, b) => (b.preview ? 1 : 0) - (a.preview ? 1 : 0) || (b.stars || 0) - (a.stars || 0));
      html += `<section class="field-section" id="sec-${c.id}" data-field="${c.id}" style="--c:${c.color}">
        <header class="field-header">
          <span class="field-num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="field-title"><span class="field-marker" style="background:${c.color}"></span>${esc(c.name)}</h2>
          <p class="field-desc">${esc(c.desc)}</p>
          <span class="field-tally">${c.count} tools</span>
        </header>
        <div class="gallery">${group.map(itemHTML).join("")}</div>
      </section>`;
    });
    $("#showcase").innerHTML = html;
    $$("#showcase [data-lb]").forEach(el =>
      el.addEventListener("click", ev => { ev.preventDefault(); openLightbox(el.dataset.id); }));
  }

  /* ---------- filtering -------------------------------------------------- */
  function applyFilters() {
    const terms = state.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    $$(".field-section").forEach(sec => {
      let n = 0;
      $$(".item", sec).forEach(it => {
        const okF = !state.field || sec.dataset.field === state.field;
        const okQ = !terms.length || terms.every(t => it.dataset.search.includes(t));
        const ok = okF && okQ;
        it.hidden = !ok;
        if (ok) { n++; shown++; }
      });
      sec.hidden = n === 0;
    });
    $$("#fieldLinks .field-link").forEach(b =>
      b.classList.toggle("active", b.dataset.field === state.field));
    $("#empty").hidden = shown !== 0;
    $("#showcase").hidden = shown === 0;
  }

  /* ---------- lightbox --------------------------------------------------- */
  let lastFocus = null;
  function openLightbox(id) {
    const e = byId[id]; if (!e) return;
    lastFocus = document.activeElement;
    const color = catColor[e.category] || "var(--accent)";
    const lbMedia = $("#lbMedia");
    lbMedia.className = "lb-media" + (e.preview ? "" : " plate");
    lbMedia.style.setProperty("--c", color);
    lbMedia.innerHTML = e.preview
      ? `<img src="${esc(e.preview.src)}" alt="${esc(e.name)} output preview">`
      : `<div class="plate-body"><span class="plate-kind">${esc(surfaceLabel[e.surface])}</span>
           <div><h3 class="plate-name">${esc(e.name)}</h3>
           <p class="plate-io"><span>${esc(e.input)}</span> <span class="arr">→</span> ${esc(e.output)}</p></div></div>`;

    const stars = fmtStars(e.stars);
    const meta = [];
    meta.push(`<b>${esc(surfaceLabel[e.surface] || e.surface)}</b>`);
    if (stars) meta.push(`★ ${stars}`);
    if (e.license && e.license !== "unknown") meta.push(esc(e.license));
    if (e.updated) meta.push(`updated ${esc(e.updated)}`);

    const primary = [];
    primary.push(`<a href="${esc(e.url)}" target="_blank" rel="noopener">${hostOf(e.url) === "github.com" ? "Repository" : "Visit site"} ↗</a>`);
    if (e.homepage && e.homepage !== e.url)
      primary.push(`<a href="${esc(e.homepage)}" target="_blank" rel="noopener">Homepage ↗</a>`);

    const linkRow = l => `<a class="lb-link" href="${esc(l.url)}" target="_blank" rel="noopener"
        title="${esc(hostOf(l.url))}"><span class="lk">${esc(l.kind || "link")}</span><span class="lt">${esc(l.title)}</span></a>`;
    const exHtml = (e.examples || []).length
      ? `<h5>Examples &amp; demos</h5>${e.examples.map(linkRow).join("")}` : "";
    const docHtml = (e.docs || []).length
      ? `<h5>Docs</h5>${e.docs.map(l => linkRow({ ...l, kind: "docs" })).join("")}` : "";

    $("#lbInfo").innerHTML = `
      <p class="lb-eyebrow"><span class="dot"></span>${esc(catName[e.category])}</p>
      <h3 class="lb-name" id="lbName">${esc(e.name)}</h3>
      <div class="lb-io">
        <div class="row"><span class="k">Input</span><span class="v">${esc(e.input)}</span></div>
        <div class="row"><span class="k">Output</span><span class="v out">${esc(e.output)}</span></div>
      </div>
      <p class="lb-note">${esc(e.note)}</p>
      <p class="lb-meta">${meta.join(" &nbsp;·&nbsp; ")}</p>
      ${(e.deps || []).length ? `<p class="lb-deps">Needs <span>${(e.deps).map(esc).join(" · ")}</span></p>` : ""}
      <div class="lb-primary">${primary.join("")}</div>
      <div class="lb-links">${exHtml}${docHtml}</div>`;
    $(".lb-panel").style.setProperty("--c", color);

    const lb = $("#lightbox");
    lb.hidden = false;
    lb.scrollTop = 0; $(".lb-info").scrollTop = 0;
    document.body.style.overflow = "hidden";
    history.replaceState(null, "", "#tool-" + id);
    $(".lb-close").focus();
  }
  function closeLightbox() {
    $("#lightbox").hidden = true;
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }
  function wireLightbox() {
    $$("#lightbox [data-close]").forEach(el => el.addEventListener("click", closeLightbox));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#lightbox").hidden) closeLightbox(); });
    const fromHash = () => { const m = location.hash.match(/^#tool-(.+)/); if (m && byId[m[1]]) openLightbox(m[1]); };
    addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* ---------- search ----------------------------------------------------- */
  function wireSearch() {
    const input = $("#search");
    let t;
    input.addEventListener("input", () => {
      state.q = input.value; clearTimeout(t); t = setTimeout(applyFilters, 70);
    });
    $("#resetAll").addEventListener("click", () => { input.value = ""; state.q = ""; applyFilters(); input.focus(); });
  }

  /* ---------- scroll ----------------------------------------------------- */
  function wireScroll() {
    const bar = $(".topbar"), toTop = $("#toTop");
    let ticking = false;
    const run = () => {
      const y = scrollY;
      bar.classList.toggle("scrolled", y > 8);
      toTop.hidden = y < 700;
      if (!state.field) spy();
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    run();
  }
  function spy() {
    const secs = $$(".field-section").filter(s => !s.hidden);
    const mid = innerHeight * 0.3;
    let active = null;
    for (const s of secs) { if (s.getBoundingClientRect().top <= mid) active = s.dataset.field; else break; }
    $$("#fieldLinks .field-link").forEach(b => b.classList.toggle("active", b.dataset.field === active));
  }

  /* ---------- reveal ----------------------------------------------------- */
  function wireReveal() {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $$(".reveal").forEach(el => el.classList.add("in")); return;
    }
    const io = new IntersectionObserver((ents, o) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---------- init ------------------------------------------------------- */
  chrome();
  marquee();
  fieldNav();
  showcase();
  wireSearch();
  wireLightbox();
  wireScroll();
  wireReveal();
  applyFilters();
})();
