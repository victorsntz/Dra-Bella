// Confere cada slide renderizado antes de entregar:
//   - texto ou figura invadindo a zona do rodapé (reserva de 252 px na base)
//   - pílula/etiqueta saindo da área do slide
//   - ilustração faltando (placeholder no lugar)
//
//   node src/check.mjs exemplo        # precisa de build/exemplo/index.html (rode o render antes)
//   node src/check.mjs --all
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const H = 1350, RESERVE = 252, TOL = 4;
const argv = process.argv.slice(2);
let names = argv.filter((a) => !a.startsWith("--"));
if (argv.includes("--all") || names.length === 0) {
  names = (await fs.readdir(path.join(ROOT, "content"))).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
}

const { chromium } = await import("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: H } });
let problems = 0;

for (const name of names) {
  const html = path.join(ROOT, "build", name, "index.html");
  try { await fs.access(html); } catch { console.log(`✗ ${name}: build/${name}/index.html não existe (rode npm run render ${name})`); problems++; continue; }
  await page.goto(pathToFileURL(html).href);
  await page.evaluate(() => document.fonts.ready);
  const report = await page.evaluate(({ H, RESERVE, TOL }) => {
    const out = [];
    document.querySelectorAll(".slide").forEach((slide, i) => {
      const sr = slide.getBoundingClientRect();
      const limit = sr.top + H - RESERVE + TOL;
      const n = String(i + 1).padStart(2, "0");
      slide.querySelectorAll(".title, .lead, .body, .bullets, .hint").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height && r.bottom > limit) out.push(`${n}: ${el.className.split(" ")[0]} entra ${Math.round(r.bottom - limit)}px na zona do rodapé`);
        if (el.scrollWidth > el.clientWidth + 2) out.push(`${n}: ${el.className.split(" ")[0]} tem texto cortado na largura`);
      });
      slide.querySelectorAll(".label").forEach((l) => {
        const r = l.getBoundingClientRect();
        if (r.left < sr.left - TOL || r.right > sr.right + TOL || r.top < sr.top - TOL || r.bottom > sr.bottom + TOL)
          out.push(`${n}: etiqueta "${l.textContent.trim().slice(0, 24)}" sai do slide`);
      });
      slide.querySelectorAll(".fig .placeholder").forEach(() => out.push(`${n}: ilustração faltando (placeholder)`));
      const fig = slide.querySelector(".fig");
      if (fig) {
        const r = fig.getBoundingClientRect();
        if (r.height < 120 && !slide.classList.contains("cover")) out.push(`${n}: figura com só ${Math.round(r.height)}px de altura (texto demais?)`);
      }
    });
    return out;
  }, { H, RESERVE, TOL });
  if (report.length) { console.log(`✗ ${name}`); report.forEach((r) => console.log("   " + r)); problems += report.length; }
  else console.log(`✓ ${name}: nada estourando`);
}
await browser.close();
process.exit(problems ? 1 : 0);
