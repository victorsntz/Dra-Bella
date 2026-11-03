// Gera os slides (HTML) de um carrossel e exporta cada um como JPG 1080x1350.
//
//   node src/render.mjs musculo-remedio        # um carrossel
//   node src/render.mjs --all                  # todos em content/
//   node src/render.mjs --all --sheet          # + folha de contato (precisa do ImageMagick)
//   node src/render.mjs nome --html            # só gera o HTML, sem exportar JPG
//
// Entrada:  content/<nome>.json
// Saída:    build/<nome>/index.html   (preview no navegador: abra com ?preview)
//           output/<nome>/01.jpg ...  (pronto pra postar)
//           output/<nome>/legenda.txt

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const exec = promisify(execFile);
// Chromium: o do Playwright se existir; senão o pré-instalado do ambiente (ou CHROMIUM_PATH)
async function launchOpts() {
  const cand = [process.env.CHROMIUM_PATH, "/opt/pw-browsers/chromium"].filter(Boolean);
  const { chromium } = await import("playwright");
  try { await fs.access(chromium.executablePath()); return {}; } catch {}
  for (const c of cand) { try { await fs.access(c); return { executablePath: c }; } catch {} }
  return {};
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1080, H = 1350;

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const names = argv.filter((a) => !a.startsWith("--"));

// ---------- helpers de texto ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Tipografia dos blocos (pedido do Victor/Bella, 31/out/2026): nada de palavra curta solta no fim
// da linha nem viúva na última. Espaço que não quebra (U+00A0) depois de palavra de 1 letra e das
// miudinhas de ligação (de, da, do, em, no, na, um, os, as, ao, ou, se, me, te), e entre as duas últimas
// palavras do bloco. O \n manual não é tocado. Mesma lista no src/check.mjs.
const NB = "\u00A0";
export const CURTAS = ["de", "da", "do", "em", "no", "na", "um", "os", "as", "ao", "ou", "se", "me", "te"];
const curta = (w) => { const t = w.replace(/[*“"(]/g, "").toLowerCase(); return t.length === 1 || CURTAS.includes(t); };
export const tipografia = (s = "") =>
  String(s)
    .split("\n")
    .map((seg) => seg
      .replace(/(?<=^|[ \u00A0(“"])([^ \u00A0]+) +(?=\S)/g, (m, w) => (curta(w) ? `${w}${NB}` : m))
      .replace(/ +(?=[^ \u00A0]+$)/, NB))
    .join("\n");

// **negrito**, *destaque*, quebra de linha
const rich = (s = "") =>
  esc(tipografia(s))
    .replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");

// "Irisina → escurece a gordura" vira chave + seta + resto
const bullet = (s = "") => {
  const m = s.match(/^(.+?)\s*(?:→|->)\s*(.+)$/);
  if (!m) return `<li>${rich(s)}</li>`;
  return `<li><span class="k">${rich(m[1])}</span><span class="arr">→</span>${rich(m[2])}</li>`;
};

let assetBase = "../../";           // de build/<nome>/ até a raiz do repo
export const setAssetBase = (b) => { assetBase = b; };
const relFromBuild = (p) => assetBase + p;

// ---------- blocos ----------
function header(brand) {
  return `<div class="hdr">${esc(brand.handle)}</div>`;
}

// Regra da assinatura: logo completo no primeiro e no último slide; só o monograma nos do meio,
// no canto inferior esquerdo, alinhado com a margem do texto. A seta fica à direita, no traço
// das ilustrações (linha fina, ponta aberta, uma molécula na cauda).
// Sem os arquivos (brand/logo.png e brand/monogram.png), cai no lockup tipográfico.
const ARROW = `<svg class="arrow" viewBox="0 0 120 16" width="120" height="16" aria-hidden="true">
  <circle cx="5" cy="8" r="4" fill="currentColor" opacity="0.55"/>
  <path d="M12,8 H112 M103,2 L112,8 L103,14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
function footer(brand, slide, i, total) {
  const arrow = slide.type === "closing" || slide.type === "cta" ? "" : `<div class="ftr-right">${ARROW}</div>`;
  const edge = i === 0 || i === total - 1;
  const dark = slide.theme === "coffee";
  const logo = dark && brand.logoLight ? brand.logoLight : brand.logo;
  const mono = dark && brand.monogramLight ? brand.monogramLight : brand.monogram;
  let mark;
  const BADGE = `<svg class="badge" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 1.5l2.6 2 3.2-.5 1.2 3 3 1.2-.5 3.2 2 2.6-2 2.6.5 3.2-3 1.2-1.2 3-3.2-.5-2.6 2-2.6-2-3.2.5-1.2-3-3-1.2.5-3.2-2-2.6 2-2.6-.5-3.2 3-1.2 1.2-3 3.2.5z" fill="#1D9BF0"/><path d="M7.5 12.4l3 3 6-6.4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  // primeiro e último slide: card de perfil (foto redonda com anel, nome com selo, @)
  if (edge && brand.profile) mark = `<div class="profile"><div class="avatar"><img src="${relFromBuild(brand.profile)}" alt=""></div>
    <div class="who"><div class="pname">${esc(brand.displayName || brand.name)} ${BADGE}</div><div class="phandle">${esc(brand.handle)}</div></div></div>`;
  else if (edge && logo) mark = `<img class="logo" src="${relFromBuild(logo)}" alt="${esc(brand.name)}">`;
  else if (edge) mark = `<div class="lockup"><div><div class="name">${esc(brand.name)}</div>
    <div class="sub"><span></span>${esc(brand.tagline)}<span></span></div></div></div>`;
  // slides do meio: sem marca (pedido da Bella). Só a seta. brand.monogramOnMiddle = true reativa o IB.
  else if (brand.monogramOnMiddle && mono) mark = `<img class="monogram" src="${relFromBuild(mono)}" alt="${esc(brand.name)}">`;
  else mark = "";
  return `${mark ? `<div class="ftr-left">${mark}</div>` : ""}${arrow}`;
}

function figure(fig) {
  if (!fig) return "";
  const img = fig.src
    ? `<img src="${relFromBuild(fig.src)}" alt="">`
    : `<div class="placeholder"><span>${rich(fig.prompt || fig.placeholder || "ilustração")}</span></div>`;
  const ins = fig.inset || {};
  const GAP = -14; // negativo: a pílula invade a borda do miolo e fica por cima da ilustração
  const labels = (fig.labels || [])
    .map((l) => {
      const sub = (l.sub || []).map((t) => `<div class="sub">${rich(t)}</div>`).join("");
      let pos, align = l.align;
      switch (l.edge) {
        case "top":    pos = `left:${l.x}%;top:${(ins.top || 0) - GAP}px;transform:translate(-50%,-100%)`; break;
        case "bottom": pos = `left:${l.x}%;bottom:${(ins.bottom || 0) - GAP}px;transform:translate(-50%,100%)`; break;
        case "left":   pos = `top:${l.y}%;left:${(ins.left || 0) - GAP}px;transform:translate(-100%,-50%)`; align = align || "right"; break;
        case "right":  pos = `top:${l.y}%;right:${(ins.right || 0) - GAP}px;transform:translate(100%,-50%)`; align = align || "left"; break;
        default:
          // sx/sy: coordenadas em pixels da própria cena (figura de largura cheia desenha em escala 1:1)
          pos = l.sx != null ? `left:${(ins.left || 0) + l.sx}px;top:${(ins.top || 0) + l.sy}px` : `left:${l.x}%;top:${l.y}%`;
      }
      return `<div class="label tone-${l.tone || "cream"}${align === "right" ? " align-right" : ""}" style="${pos}"><span class="pill">${rich(l.text)}</span>${sub}</div>`;
    })
    .join("");
  const style = fig.style ? ` style="${esc(fig.style)}"` : "";
  const r = fig.recorte; // { w, h, x, y, bw, bh }: tamanho da cena e caixa do desenho de fato (src/render.mjs → medeRecortes)
  const data = r ? ` data-nat="${r.w} ${r.h}" data-bbox="${r.x} ${r.y} ${r.bw} ${r.bh}"${fig.capa && r.p ? ` data-partes="${r.p.map((q) => q.join(",")).join(";")}"` : ""}` : "";
  const i = fig.inset || {};
  const inner = `<div class="fig-inner" style="top:${i.top || 0}px;right:${i.right || 0}px;bottom:${i.bottom || 0}px;left:${i.left || 0}px">${img}</div>`;
  return `<figure class="fig"${style}${data}>${inner}${labels}</figure>`;
}

const renderers = {
  cover: (s) => `
    <h1 class="title"${s.titleSize || s.titleWidth ? ` style="${s.titleSize ? `font-size:${s.titleSize}px;` : ""}${s.titleWidth ? `max-width:${s.titleWidth}px;` : ""}"` : ""}>${rich(s.title)}</h1>
    ${s.lead ? `<p class="lead">${rich(s.lead)}</p>` : ""}
    ${figure(s.figure && { ...s.figure, capa: true })}`,

  diagram: (s) => `
    <h2 class="title">${rich(s.title)}</h2>
    ${s.lead ? `<p class="lead">${rich(s.lead)}</p>` : ""}
    ${figure(s.figure)}
    ${s.bullets ? `<ul class="bullets">${s.bullets.map(bullet).join("")}</ul>` : ""}
    ${s.note ? `<p class="note">${rich(s.note)}</p>` : ""}`,

  text: (s) => `
    <h2 class="title">${rich(s.title)}</h2>
    <div class="body">${(s.paragraphs || []).map((p) => `<p>${rich(p)}</p>`).join("")}</div>
    ${s.bullets ? `<ul class="bullets" style="margin-top:36px">${s.bullets.map(bullet).join("")}</ul>` : ""}
    ${figure(s.figure)}`,

  closing: (s) => `
    <div class="body">${(s.paragraphs || []).map((p) => `<p>${rich(p)}</p>`).join("")}</div>`,

  cta: (s) => `
    <h2 class="title">${rich(s.title)}</h2>
    ${s.lead ? `<p class="lead">${rich(s.lead)}</p>` : ""}
    ${s.hint ? `<div class="hint">${esc(s.hint)}</div>` : ""}`,
};

export function slideHTML(brand, slide, i, total) {
  const r = renderers[slide.type];
  if (!r) throw new Error(`Slide ${i + 1}: tipo desconhecido "${slide.type}"`);
  return `<div class="slide-wrap" data-n="${String(i + 1).padStart(2, "0")} · ${slide.type}">
  <section class="slide ${slide.type}${slide.theme === "coffee" ? " coffee" : ""}" id="s${i + 1}">
    ${header(brand)}
    ${r(slide)}
    ${footer(brand, slide, i, total)}
    ${brand.pager ? `<div class="pager">${i + 1} / ${total}</div>` : ""}
  </section></div>`;
}

function deckHTML(doc) {
  const slides = doc.slides.map((s, i) => slideHTML(doc.brand, s, i, doc.slides.length)).join("\n");
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>${esc(doc.title)}</title>
<link rel="stylesheet" href="../../brand/brand.css">
<link rel="stylesheet" href="../../templates/slide.css">
<script src="../../templates/fit.js"></script>
<script>if (location.search.includes("preview")) document.documentElement.classList.add("pv");</script>
<style>html.pv body{padding:40px}</style>
</head><body>
<script>if (document.documentElement.classList.contains("pv")) document.body.classList.add("preview");</script>
<div class="deck">
${slides}
</div></body></html>`;
}

// ---------- pipeline ----------
export async function loadBrand() {
  const brand = JSON.parse(await fs.readFile(path.join(ROOT, "brand", "brand.json"), "utf8"));
  for (const k of ["logo", "monogram", "logoLight", "monogramLight", "profile"]) {
    if (!brand[k]) continue;
    try { await fs.access(path.join(ROOT, brand[k])); } catch { brand[k] = null; }
  }
  return brand;
}

// Recorte das cenas: onde está o desenho de fato dentro de cada SVG (as cenas têm borda vazia).
// O fit.js usa isso pra ampliar a ilustração até o desenho preencher a caixa, e leva as pílulas junto.
const recorteArq = (name) => path.join(ROOT, "assets", "illustrations", name, "_recorte.json");
async function leRecortes(name) { try { return JSON.parse(await fs.readFile(recorteArq(name), "utf8")); } catch { return {}; } }
function aplicaRecortes(doc, cache) {
  for (const s of doc.slides) if (s.figure?.src && cache[s.figure.src]) s.figure.recorte = cache[s.figure.src].r;
}
export async function medeRecortes(name, doc, browser) {
  const cache = await leRecortes(name); let mudou = false, page = null;
  for (const s of doc.slides) {
    const src = s.figure?.src; if (!src || !src.endsWith(".svg")) continue;
    const st = await fs.stat(path.join(ROOT, src)).catch(() => null); if (!st) continue;
    if (cache[src] && cache[src].mtime === st.mtimeMs && cache[src].r.p) continue;
    page ||= await browser.newPage();
    await page.setContent(`<body style="margin:0">${await fs.readFile(path.join(ROOT, src), "utf8")}</body>`);
    const r = await page.evaluate(() => {
      const svg = document.querySelector("svg"), o = svg.getBoundingClientRect();
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; const p = [];
      svg.querySelectorAll(":scope > :not(defs)").forEach((el) => {
        const b = el.getBoundingClientRect(); if (!b.width && !b.height) return;
        p.push([Math.round(b.left - o.left), Math.round(b.top - o.top), Math.round(b.width), Math.round(b.height)]);
        x0 = Math.min(x0, b.left - o.left); y0 = Math.min(y0, b.top - o.top); x1 = Math.max(x1, b.right - o.left); y1 = Math.max(y1, b.bottom - o.top);
      });
      const w = svg.viewBox.baseVal.width || o.width, h = svg.viewBox.baseVal.height || o.height, pad = 6;
      if (x0 > x1) return { w, h, x: 0, y: 0, bw: w, bh: h, p: [] };
      x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w, x1 + pad); y1 = Math.min(h, y1 + pad);
      return { w, h, x: Math.round(x0), y: Math.round(y0), bw: Math.round(x1 - x0), bh: Math.round(y1 - y0), p: p.slice(0, 400) };
    });
    cache[src] = { mtime: st.mtimeMs, r }; mudou = true;
  }
  if (page) await page.close();
  if (mudou) await fs.writeFile(recorteArq(name), JSON.stringify(cache, null, 1));
  aplicaRecortes(doc, cache);
}

export async function loadDoc(name, brand) {
  const file = path.join(ROOT, "content", `${name}.json`);
  const doc = JSON.parse(await fs.readFile(file, "utf8"));
  doc.brand = { ...brand, ...(doc.brand || {}) };
  for (const s of doc.slides) {
    if (s.figure?.src) {
      try { await fs.access(path.join(ROOT, s.figure.src)); }
      catch { s.figure.missing = s.figure.src; s.figure.src = null; }
    }
  }
  aplicaRecortes(doc, await leRecortes(name));
  return doc;
}

async function buildOne(name, brand) {
  const file = path.join(ROOT, "content", `${name}.json`);
  const doc = JSON.parse(await fs.readFile(file, "utf8"));
  doc.brand = { ...brand, ...(doc.brand || {}) };

  // ilustração ainda não existe? mostra o placeholder com a descrição em vez de imagem quebrada
  for (const s of doc.slides) {
    if (s.figure?.src) {
      try { await fs.access(path.join(ROOT, s.figure.src)); }
      catch { s.figure.missing = s.figure.src; s.figure.src = null; }
    }
  }
  const missing = doc.slides.filter((s) => s.figure?.missing).map((s) => s.figure.missing);
  if (missing.length) console.log(`  (${missing.length} ilustração(ões) ainda não existem, usando placeholder)`);

  const buildDir = path.join(ROOT, "build", name);
  const outDir = path.join(ROOT, "output", name);
  await fs.mkdir(buildDir, { recursive: true });
  await fs.mkdir(outDir, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch(await launchOpts());
  await medeRecortes(name, doc, browser);
  const html = deckHTML(doc);
  const htmlPath = path.join(buildDir, "index.html");
  await fs.writeFile(htmlPath, html);
  await fs.writeFile(path.join(outDir, "legenda.txt"), (doc.caption || "").trim() + "\n");
  console.log(`✓ ${name}: ${doc.slides.length} slides → build/${name}/index.html`);
  if (flags.has("--html")) { await browser.close(); return { name, outDir, count: doc.slides.length }; }

  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.documentElement.dataset.fit === "done", null, { timeout: 30000 });
  await page.waitForTimeout(150);

  for (let i = 0; i < doc.slides.length; i++) {
    const nn = String(i + 1).padStart(2, "0");
    await page.locator(`#s${i + 1}`).screenshot({
      path: path.join(outDir, `${nn}.jpg`),
      type: "jpeg",
      quality: 92,
    });
  }
  await browser.close();
  console.log(`  → output/${name}/01..${String(doc.slides.length).padStart(2, "0")}.jpg`);
  await zipDelivery(name, outDir, doc.slides.length);
  return { name, outDir, count: doc.slides.length };
}

// Zip de entrega: JPGs + legenda.txt, pronto pra mandar.
async function zipDelivery(name, outDir, count) {
  const files = Array.from({ length: count }, (_, i) => `${String(i + 1).padStart(2, "0")}.jpg`).concat(["legenda.txt"]);
  const zipName = `${name}.zip`;
  try {
    await fs.rm(path.join(outDir, zipName), { force: true });
    await exec("zip", ["-q", "-j", zipName, ...files], { cwd: outDir });
    console.log(`  → output/${name}/${zipName}`);
  } catch (e) {
    console.warn("  (zip pulado: " + e.message.split("\n")[0] + ")");
  }
}

async function sheet({ name, outDir, count }) {
  const files = Array.from({ length: count }, (_, i) => path.join(outDir, `${String(i + 1).padStart(2, "0")}.jpg`));
  const out = path.join(outDir, "_folha-de-contato.jpg");
  try {
    await exec("montage", [...files, "-tile", "4x", "-geometry", "360x450+12+12", "-background", "#d9d5cd", out]);
    console.log(`  → output/${name}/_folha-de-contato.jpg`);
  } catch (e) {
    console.warn("  (folha de contato pulada: ImageMagick 'montage' não encontrado)");
  }
}

async function main() {
  const brand = await loadBrand();
  let list = names;
  if (flags.has("--all") || list.length === 0) {
    list = (await fs.readdir(path.join(ROOT, "content")))
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""));
  }
  if (list.length === 0) {
    console.error("Nenhum carrossel em content/. Crie content/<nome>.json (veja o README).");
    process.exit(1);
  }
  for (const name of list) {
    const r = await buildOne(name, brand);
    if (flags.has("--sheet") && !flags.has("--html")) await sheet(r);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
