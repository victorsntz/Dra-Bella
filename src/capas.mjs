// Página de escolha de um lote: todas as capas grandes no topo, cada carrossel inteiro abaixo.
//   node src/capas.mjs reganho leptina ...   →  build/capas/index.html (pasta completa, publicável)
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadBrand, loadDoc, slideHTML, setAssetBase } from "./render.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const names = process.argv.slice(2);
if (!names.length) { console.error("uso: node src/capas.mjs <slug> <slug> ..."); process.exit(1); }
const brand = await loadBrand();
setAssetBase("");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const docs = [];
for (const n of names) docs.push({ name: n, doc: await loadDoc(n, brand) });

const box = (doc, s, i) => `<div class="sl-box">${slideHTML(doc.brand, s, i, doc.slides.length)}</div>`;
const covers = docs.map(({ name, doc }, k) => `<a class="cover" href="#c-${name}">
  ${box(doc, doc.slides[0], 0)}
  <div class="cap"><b>${String(k + 1).padStart(2, "0")}</b> ${esc(doc.title.replace(/\*\*/g, ""))}<span>${doc.slides.length} slides</span></div></a>`).join("\n");
const full = docs.map(({ name, doc }, k) => `<section id="c-${name}">
  <div class="eyebrow">${String(k + 1).padStart(2, "0")} · ${esc(name)}</div>
  <h2>${esc(doc.title.replace(/\*\*/g, ""))}</h2>
  <div class="grid">${doc.slides.map((s, i) => `<figure class="sl">${box(doc, s, i)}<figcaption><b>${String(i + 1).padStart(2, "0")}</b> ${s.type}</figcaption></figure>`).join("")}</div>
  <details class="legenda"><summary>Legenda</summary><pre>${esc(doc.caption || "")}</pre></details>
</section>`).join("\n");

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lote de carrosséis</title>
<link rel="stylesheet" href="brand/brand.css">
<link rel="stylesheet" href="templates/slide.css">
<style>
  :root { --bg: #ECE8E1; --fg: #362D28; --mu: #6F6356; --ln: #CFCABF; --card: #F6F4F0; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #2A2420; --fg: #E6E3DC; --mu: #ABA597; --ln: #4A403A; --card: #362D28; color-scheme: dark; } }
  :root[data-theme="dark"] { --bg: #2A2420; --fg: #E6E3DC; --mu: #ABA597; --ln: #4A403A; --card: #362D28; color-scheme: dark; }
  html, body { background: var(--bg); } body { color: var(--fg); font-family: var(--font-body); font-weight: 300; }
  .wrap { max-width: 1240px; margin: 0 auto; padding: 48px 16px 96px; }
  h1 { font: 300 clamp(36px, 6vw, 68px)/1 var(--font-display); letter-spacing: -0.06em; margin: 0 0 12px; }
  h2 { font: 300 clamp(26px, 3.6vw, 40px)/1.05 var(--font-display); letter-spacing: -0.05em; margin: 0 0 16px; text-wrap: balance; }
  .eyebrow { font: 500 12px/1 var(--font-body); letter-spacing: .2em; text-transform: uppercase; color: var(--mu); margin-bottom: 12px; }
  .intro { max-width: 64ch; color: var(--mu); font-size: 16px; line-height: 1.55; margin-bottom: 36px; }
  section { margin-top: 72px; padding-top: 32px; border-top: 1px solid var(--ln); }
  .covers { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 28px 20px; }
  .cover { text-decoration: none; color: inherit; display: block; }
  .cover .cap { margin-top: 10px; font-size: 14px; line-height: 1.35; } .cap b { font-weight: 600; margin-right: 6px; } .cap span { display: block; color: var(--mu); font-size: 12px; margin-top: 2px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 22px 16px; }
  .sl { margin: 0; min-width: 0; } .sl figcaption { margin-top: 8px; font-size: 12px; color: var(--mu); } .sl figcaption b { color: var(--fg); font-weight: 600; margin-right: 6px; }
  .sl-box { position: relative; width: 100%; aspect-ratio: 1080 / 1350; overflow: hidden; border-radius: 4px; box-shadow: 0 10px 26px rgba(54,45,40,.16); }
  .sl-box .slide-wrap { position: absolute; left: 0; top: 0; width: 1080px; height: 1350px; transform: scale(var(--s, .2)); transform-origin: top left; }
  .legenda { margin-top: 20px; } .legenda summary { cursor: pointer; font-weight: 500; color: var(--mu); font-size: 14px; }
  .legenda pre { white-space: pre-wrap; font: 300 15px/1.55 var(--font-body); background: var(--card); border: 1px solid var(--ln); border-radius: 10px; padding: 18px; margin-top: 10px; max-width: 70ch; }
</style></head><body><div class="wrap">
  <div class="eyebrow">${esc(brand.handle)} · lote de temas</div>
  <h1>${docs.length} carrosséis pra escolher</h1>
  <p class="intro">As capas estão aqui em cima; clique numa pra ver o carrossel inteiro e a legenda. Comente direto no slide: "esse sim", "esse não", "troca isso". Tudo já está renderizado e zipado, é só aprovar.</p>
  <div class="covers">${covers}</div>
  ${full}
</div>
<script>
  (function () { const boxes = document.querySelectorAll(".sl-box");
    const fit = () => boxes.forEach((b) => b.style.setProperty("--s", (b.clientWidth / 1080).toFixed(4)));
    fit(); if (window.ResizeObserver) { const ro = new ResizeObserver(fit); boxes.forEach((b) => ro.observe(b)); } else window.addEventListener("resize", fit); })();
</script></body></html>`;

const outDir = path.join(ROOT, "build", "capas");
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "index.html"), html);
for (const it of ["brand.css", "fonts", "profile.jpg", "logo.png", "logo-light.png", "monogram.png", "monogram-sand.png"]) {
  try { await fs.cp(path.join(ROOT, "brand", it), path.join(outDir, "brand", it), { recursive: true }); } catch {}
}
await fs.cp(path.join(ROOT, "templates", "slide.css"), path.join(outDir, "templates", "slide.css"));
for (const n of names) { try { await fs.cp(path.join(ROOT, "assets", "illustrations", n), path.join(outDir, "assets", "illustrations", n), { recursive: true }); } catch {} }
console.log(`✓ build/capas/index.html (${docs.length} carrosséis, pasta completa)`);
