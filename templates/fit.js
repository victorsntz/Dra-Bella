// Encaixe de cada slide (pedido do Victor, 03/nov/2026): o respiro tem que ser intenção, não sobra.
// Roda no navegador depois das fontes e das imagens, antes da foto do render e nas páginas de revisão.
//
//   ilustração → as cenas têm borda vazia. O render mede onde está o desenho de fato (data-bbox) e
//               aqui a cena é ampliada até esse desenho preencher a caixa (teto de 1,3x, e nunca
//               menor do que já estava). Cada pílula acompanha o ponto da peça que ela nomeia.
//   diagrama  → a caixa da figura cresce com a sobra, a letra sobe até o maior degrau que cabe, e o
//               que ainda sobrar vira respiro dividido acima e abaixo da figura.
//   texto     → a letra sobe só enquanto a ilustração não diminui.
//   pergunta, fechamento → título e texto sobem até ocupar o miolo, bloco centrado.
//   capa      → subtítulo maior e o bloco título + subtítulo centrado entre o @ e o card de perfil
//               (o título não muda de tamanho nem de quebra, só desce).
//
// Mede com offsetTop/offsetHeight (layout), então funciona igual com o slide escalado na revisão.
(function () {
  const H = 1350, LIMITE = H - 252 - 12, TOPO_MIN = 200, KMAX = 1.3;
  const FAIXAS = {
    diagram: { fs: [1, 1.18], ts: [1, 1.1] },
    text: { fs: [1, 1.12], ts: [1, 1.06] },
    cta: { fs: [1, 1.3], ts: [1, 1.4] },
    closing: { fs: [1, 1.18], ts: [1, 1] },
  };
  const tipo = (s) => ["cover", "diagram", "text", "closing", "cta"].find((c) => s.classList.contains(c));
  const noFluxo = (s) => [...s.children].filter((el) => getComputedStyle(el).position !== "absolute" && el.offsetHeight > 0);
  const base = (s) => Math.max(...noFluxo(s).map((el) => el.offsetTop + el.offsetHeight), 0);
  const topo = (s) => Math.min(...noFluxo(s).map((el) => el.offsetTop), H);
  const passos = ([a, b]) => { const out = []; for (let v = b; v >= a - 1e-9; v -= 0.02) out.push(+v.toFixed(2)); return out; };
  const aplica = (s, fs, ts) => { s.style.setProperty("--fs", fs); s.style.setProperty("--ts", ts); };

  // ---------- ilustração: transformação cena → caixa ----------
  function cena(fig) {
    const img = fig.querySelector(".fig-inner img"), inner = fig.querySelector(".fig-inner");
    if (!img || !inner || !img.naturalWidth) return null;
    const [W, Hh] = (fig.dataset.nat || `${img.naturalWidth} ${img.naturalHeight}`).split(" ").map(Number);
    const bb = (fig.dataset.bbox || `0 0 ${W} ${Hh}`).split(" ").map(Number);
    return { fig, img, inner, W, H: Hh, bb: { x: bb[0], y: bb[1], w: bb[2], h: bb[3] } };
  }
  // transformação atual (object-fit: contain sobre a cena inteira)
  function tfOriginal(c) {
    const w = c.inner.offsetWidth, h = c.inner.offsetHeight, k = Math.min(w / c.W, h / c.H);
    const topo = getComputedStyle(c.img).objectPosition.split(" ")[1] === "0%" || getComputedStyle(c.img).objectPosition.includes("top");
    return { k, ox: (w - c.W * k) / 2, oy: topo ? 0 : (h - c.H * k) / 2 };
  }
  // ponto de ancoragem de cada pílula, em coordenadas da cena
  function ancoras(c, tf) {
    const figW = c.fig.offsetWidth, figH = c.fig.offsetHeight, iL = c.inner.offsetLeft, iT = c.inner.offsetTop;
    return [...c.fig.querySelectorAll(":scope > .label")].map((el) => {
      const st = el.style, cs = getComputedStyle(el);
      const px = st.left ? parseFloat(cs.left) : st.right ? figW - parseFloat(cs.right) : null;
      const py = st.top ? parseFloat(cs.top) : st.bottom ? figH - parseFloat(cs.bottom) : null;
      const borda = /translate\((-100%|100%),/.test(st.transform) ? "lado" : /translate\(-50%,\s*(-100%|100%)\)/.test(st.transform) ? "pe" : null;
      return { el, borda, sx: px == null ? null : (px - iL - tf.ox) / tf.k, sy: py == null ? null : (py - iT - tf.oy) / tf.k };
    });
  }
  // caixa a enquadrar: desenho de fato + pontos das pílulas soltas (com folga pra pílula caber)
  function enquadra(c, anc) {
    let { x, y, w, h } = c.bb, x1 = x + w, y1 = y + h;
    for (const a of anc) {
      if (a.borda || a.sx == null || a.sy == null) continue;
      x = Math.min(x, a.sx - 30); x1 = Math.max(x1, a.sx + 30); y = Math.min(y, a.sy - 24); y1 = Math.max(y1, a.sy + 24);
    }
    x = Math.max(0, x); y = Math.max(0, y); x1 = Math.min(c.W, x1); y1 = Math.min(c.H, y1);
    return { x, y, w: x1 - x, h: y1 - y };
  }
  function posiciona(c, anc, q, k0) {
    const w = c.inner.offsetWidth, h = c.inner.offsetHeight;
    const k = Math.max(k0, Math.min(w / q.w, h / q.h, KMAX));
    const left = (w - q.w * k) / 2 - q.x * k, top = (h - q.h * k) / 2 - q.y * k;
    Object.assign(c.img.style, { position: "absolute", width: c.W * k + "px", height: c.H * k + "px", left: left + "px", top: top + "px", maxWidth: "none", objectFit: "fill" });
    const figW = c.fig.offsetWidth, figH = c.fig.offsetHeight, iL = c.inner.offsetLeft, iT = c.inner.offsetTop;
    for (const a of anc) {
      if (a.sx == null && a.sy == null) continue;
      const X = iL + left + a.sx * k, Y = iT + top + a.sy * k, st = a.el.style;
      if (a.borda !== "lado" && a.sx != null) { if (st.left) st.left = X + "px"; else if (st.right) st.right = figW - X + "px"; }
      if (a.borda !== "pe" && a.sy != null) { if (st.top) st.top = Y + "px"; else if (st.bottom) st.bottom = figH - Y + "px"; }
    }
    return k;
  }
  // altura que a caixa precisa pra mostrar o enquadramento na maior escala permitida
  function alturaIdeal(c, q, k0) {
    const w = c.inner.offsetWidth, insetV = c.fig.offsetHeight - c.inner.offsetHeight;
    return q.h * Math.max(k0, Math.min(w / q.w, KMAX)) + insetV;
  }

  // ---------- capa: subtítulo maior e bloco título + subtítulo centrado entre o @ e o card ----------
  // O título não muda (cada capa foi quebrada à mão); só desce. Pedido do Victor, 03/nov/2026.
  const CAPA = { topo: 196, folgaCard: 80, fsMax: 1.36, otico: 0.42, desceMax: 260 };
  // retângulos em coordenadas do slide (funciona com o slide escalado na revisão)
  function emSlide(s) {
    const o = s.getBoundingClientRect(), sc = o.width / 1080 || 1;
    return (x) => ({ l: (x.left - o.left) / sc, t: (x.top - o.top) / sc, r: (x.right - o.left) / sc, b: (x.bottom - o.top) / sc });
  }
  function linhas(el, conv) {
    if (!el) return [];
    const r = document.createRange(); r.selectNodeContents(el);
    return [...r.getClientRects()].filter((x) => x.width > 1).map(conv);
  }
  // o que a letra não pode tocar: pílulas da capa e o desenho de fato da ilustração
  function obstaculos(s, conv) {
    const fig = s.querySelector(":scope > .fig"); if (!fig) return [];
    const out = [...fig.querySelectorAll(".label")].map((l) => conv(l.getBoundingClientRect()));
    const c = cena(fig);
    if (c) {
      const tf = tfOriginal(c), ir = conv(c.inner.getBoundingClientRect());
      const sc = (ir.r - ir.l) / (c.inner.offsetWidth || 1);
      const caixa = (x, y, w, h) => ({ l: ir.l + (tf.ox + x * tf.k) * sc, t: ir.t + (tf.oy + y * tf.k) * sc,
                                        r: ir.l + (tf.ox + (x + w) * tf.k) * sc, b: ir.t + (tf.oy + (y + h) * tf.k) * sc });
      // uma caixa por peça (mais justa que a caixa da ilustração inteira); sem o dado, a caixa geral
      const partes = (fig.dataset.partes || "").split(";").filter(Boolean).map((q) => q.split(",").map(Number));
      if (partes.length) partes.forEach(([x, y, w, h]) => out.push(caixa(x - 6, y - 6, w + 12, h + 12)));
      else out.push(caixa(c.bb.x, c.bb.y, c.bb.w, c.bb.h));
    }
    return out;
  }
  const inter = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
  function encaixaCapa(s) {
    const title = s.querySelector(":scope > .title"), lead = s.querySelector(":scope > .lead");
    if (!title) return;
    const conv = emSlide(s), obs = obstaculos(s, conv);
    const colisao = () => { let a = 0; for (const r of [...linhas(title, conv), ...linhas(lead, conv)]) for (const o of obs) a += inter(r, o); return a; };
    const card = s.querySelector(".ftr-left");
    const limite = (card ? card.offsetTop : H - 144 - 88) - CAPA.folgaCard;
    const fim = () => (lead ? lead.offsetTop + lead.offsetHeight : title.offsetTop + title.offsetHeight);
    const antes = colisao(), livreDeColisao = () => colisao() <= antes + 4;
    // 1. subtítulo cresce até onde cabe sem encostar na ilustração
    if (lead) {
      const base = parseFloat(getComputedStyle(lead).fontSize);
      for (const k of passos([1, CAPA.fsMax])) {
        lead.style.fontSize = base * k + "px";
        if (fim() <= limite && lead.scrollWidth <= lead.clientWidth + 2 && livreDeColisao()) break;
      }
    }
    // 2. o bloco desce até o centro ótico, ou até onde a ilustração deixar
    const m0 = parseFloat(getComputedStyle(title).marginTop), altura = fim() - title.offsetTop;
    const alvo = CAPA.topo + Math.max(0, limite - CAPA.topo - altura) * CAPA.otico;
    let desceu = false;
    for (let d = Math.min(CAPA.desceMax, alvo - title.offsetTop); d > 0; d -= 8) {
      title.style.marginTop = m0 + d + "px";
      if (fim() <= limite && livreDeColisao()) { desceu = true; break; }
    }
    if (!desceu) title.style.marginTop = m0 + "px";
    // 3. se ainda sobra mais vão embaixo do que em cima, o subtítulo desce sozinho (sem encostar em nada)
    if (lead) {
      const hdr = s.querySelector(".hdr"), emCima = title.offsetTop - (hdr ? hdr.offsetTop + hdr.offsetHeight : 114);
      const embaixo = (card ? card.offsetTop : H - 232) - fim();
      const l0 = parseFloat(getComputedStyle(lead).marginTop);
      for (let d = Math.min(120, (embaixo - emCima) / 2); d > 8; d -= 8) {
        lead.style.marginTop = l0 + d + "px";
        if (fim() <= limite && livreDeColisao()) return;
      }
      lead.style.marginTop = l0 + "px";
    }
  }

  function encaixa(s) {
    const t = tipo(s); if (!t) return;
    if (t === "cover") { if (!s.dataset.capaFixa) encaixaCapa(s); return; }
    const faixa = FAIXAS[t]; aplica(s, 1, 1);
    const fig = s.querySelector(":scope > .fig");
    const c = fig ? cena(fig) : null;
    let anc = null, q = null, k0 = 0;
    if (c) { const tf = tfOriginal(c); k0 = tf.k; anc = ancoras(c, tf); q = enquadra(c, anc); }

    // 1. diagrama: a caixa da figura cresce com a sobra, até a altura ideal
    if (t === "diagram" && c) {
      const sobra = LIMITE - base(s), ideal = alturaIdeal(c, q, k0);
      if (ideal > fig.offsetHeight && sobra > 0) fig.style.height = Math.round(Math.min(ideal, fig.offsetHeight + sobra)) + "px";
    }
    let kFig = c ? posiciona(c, anc, q, k0) : 0;

    // 2. maior degrau de letra que cabe (no texto, sem a ilustração diminuir)
    let ok = false;
    for (const ts of passos(faixa.ts)) {
      for (const fs of passos(faixa.fs)) {
        if (fs < ts - 0.3) continue;
        aplica(s, fs, ts);
        let cabe = base(s) <= LIMITE && ![...s.querySelectorAll(".title, .lead, .body, .bullets li, .hint")].some((el) => el.scrollWidth > el.clientWidth + 2);
        if (t === "cta" || t === "closing") cabe = cabe && topo(s) >= TOPO_MIN;
        if (t === "text" && c) { const w = c.inner.offsetWidth, h = c.inner.offsetHeight; cabe = cabe && Math.min(w / q.w, h / q.h, KMAX) >= Math.min(kFig, KMAX) - 0.005; }
        if (cabe) { ok = true; break; }
      }
      if (ok) break;
    }
    if (!ok) aplica(s, 1, 1);
    if (c) posiciona(c, anc, q, k0);

    // 3. diagrama: o que ainda sobrar vira respiro acima e abaixo da figura
    if (t === "diagram" && fig) {
      const sobra = LIMITE - base(s);
      if (sobra > 8) {
        const cada = Math.min(64, sobra / 2), cs = getComputedStyle(fig);
        fig.style.marginTop = parseFloat(cs.marginTop) + cada + "px";
        fig.style.marginBottom = parseFloat(cs.marginBottom) + cada + "px";
      }
    }
  }

  async function roda() {
    try { await document.fonts.ready; } catch {}
    await Promise.all([...document.images].map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {}))));
    document.querySelectorAll(".slide").forEach((s) => { try { encaixa(s); } catch (e) { console.error("fit", s.id, e); } });
    document.documentElement.dataset.fit = "done";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", roda); else roda();
})();
