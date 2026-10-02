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
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = 1080, H = 1350;

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const names = argv.filter((a) => !a.startsWith("--"));

// ---------- helpers de texto ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// **negrito**, *destaque*, quebra de linha
const rich = (s = "") =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");

// "Irisina → escurece a gordura" vira chave + seta + resto
const bullet = (s = "") => {
  const m = s.match(/^(.+?)\s*(?:→|->)\s*(.+)$/);
  if (!m) return `<li>${rich(s)}</li>`;
  return `<li><span class="k">${rich(m[1])}</span><span class="arr">→</span>${rich(m[2])}</li>`;
};

const relFromBuild = (p) => path.relative(path.join(ROOT, "build", "x"), path.join(ROOT, p)).split(path.sep).join("/");

// ---------- blocos ----------
function header(brand) {
  return `<div class="hdr">${esc(brand.handle)}</div>`;
}

function footer(brand, slide) {
  const mono = brand.logo ? `<img class="mono" src="${relFromBuild(brand.logo)}" alt="">` : "";
  const arrow = slide.type === "closing" || slide.type === "cta" ? "" : `<div class="arrow"></div>`;
  return `<div class="ftr">${arrow}<div class="lockup">${mono}<div>
    <div class="name">${esc(brand.name)}</div>
    <div class="sub"><span></span>${esc(brand.tagline)}<span></span></div>
  </div></div></div>`;
}

function figure(fig) {
  if (!fig) return "";
  const img = fig.src
    ? `<img src="${relFromBuild(fig.src)}" alt="">`
    : `<div class="placeholder"><span>${rich(fig.placeholder || "ilustração")}</span></div>`;
  const labels = (fig.labels || [])
    .map((l) => {
      const sub = (l.sub || []).map((t) => `<div class="sub">${rich(t)}</div>`).join("");
      return `<div class="label tone-${l.tone || "cream"}${l.align === "right" ? " align-right" : ""}"
        style="left:${l.x}%;top:${l.y}%"><span class="pill">${rich(l.text)}</span>${sub}</div>`;
    })
    .join("");
  const style = fig.style ? ` style="${esc(fig.style)}"` : "";
  return `<figure class="fig"${style}>${img}${labels}</figure>`;
}

const renderers = {
  cover: (s) => `
    <h1 class="title">${rich(s.title)}</h1>
    ${s.lead ? `<p class="lead">${rich(s.lead)}</p>` : ""}
    ${figure(s.figure)}`,

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

function slideHTML(brand, slide, i, total) {
  const r = renderers[slide.type];
  if (!r) throw new Error(`Slide ${i + 1}: tipo desconhecido "${slide.type}"`);
  return `<div class="slide-wrap" data-n="${String(i + 1).padStart(2, "0")} · ${slide.type}">
  <section class="slide ${slide.type}" id="s${i + 1}">
    ${header(brand)}
    ${r(slide)}
    ${footer(brand, slide)}
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
<script>if (location.search.includes("preview")) document.documentElement.classList.add("pv");</script>
<style>html.pv body{padding:40px}</style>
</head><body>
<script>if (document.documentElement.classList.contains("pv")) document.body.classList.add("preview");</script>
<div class="deck">
${slides}
</div></body></html>`;
}

// ---------- pipeline ----------
async function loadBrand() {
  const brand = JSON.parse(await fs.readFile(path.join(ROOT, "brand", "brand.json"), "utf8"));
  if (brand.logo) {
    try { await fs.access(path.join(ROOT, brand.logo)); } catch { brand.logo = null; }
  }
  return brand;
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

  const html = deckHTML(doc);
  const htmlPath = path.join(buildDir, "index.html");
  await fs.writeFile(htmlPath, html);
  if (doc.caption) await fs.writeFile(path.join(outDir, "legenda.txt"), doc.caption.trim() + "\n");
  console.log(`✓ ${name}: ${doc.slides.length} slides → build/${name}/index.html`);
  if (flags.has("--html")) return { name, outDir, count: doc.slides.length };

  const { chromium } = await import("playwright");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
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
  return { name, outDir, count: doc.slides.length };
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

main().catch((e) => { console.error(e); process.exit(1); });
