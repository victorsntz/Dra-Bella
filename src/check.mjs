// Confere cada slide renderizado antes de entregar:
//   - texto ou figura invadindo a zona do rodapé (reserva de 252 px na base)
//   - pílula/etiqueta saindo da área do slide
//   - ilustração faltando (placeholder no lugar)
//   - fonte dos títulos sem algum acento (src/confere_fonte.py)
//   - tipografia dos blocos: palavra curta (1 ou 2 letras) solta no fim da linha e viúva
//     (uma palavra sozinha na última linha de um bloco com duas linhas ou mais)
//
//   node src/check.mjs exemplo        # precisa de build/exemplo/index.html (rode o render antes)
//   node src/check.mjs --all
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

// Chromium: o do Playwright se existir; senão o pré-instalado do ambiente (ou CHROMIUM_PATH)
async function launchOpts() {
  const cand = [process.env.CHROMIUM_PATH, "/opt/pw-browsers/chromium"].filter(Boolean);
  const { chromium } = await import("playwright");
  try { await fs.access(chromium.executablePath()); return {}; } catch {}
  for (const c of cand) { try { await fs.access(c); return { executablePath: c }; } catch {} }
  return {};
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const H = 1350, RESERVE = 252, TOL = 4;
const argv = process.argv.slice(2);
let names = argv.filter((a) => !a.startsWith("--"));
if (argv.includes("--all") || names.length === 0) {
  names = (await fs.readdir(path.join(ROOT, "content"))).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));
}

// a fonte dos títulos desenha todos os acentos? (a Cherston original vinha com o "á" sem acento)
const fonte = spawnSync("python3", [path.join(ROOT, "src", "confere_fonte.py")], { encoding: "utf8" });
let problems = 0;
if (fonte.status === 1) { console.log(fonte.stdout.trim()); problems++; }
else if (fonte.error || fonte.status !== 0) console.log("  (conferência da fonte pulada: " + (fonte.stdout || fonte.stderr || fonte.error?.message || "").trim().split("\n")[0] + ")");

const { chromium } = await import("playwright");
const browser = await chromium.launch(await launchOpts());
const page = await browser.newPage({ viewport: { width: 1080, height: H } });

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
      // linhas de cada bloco de texto: mede onde cada palavra cai
      slide.querySelectorAll(".title, .lead, .body p, .bullets li, .note").forEach((el) => {
        const words = [];
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode, txt = node.textContent;
          const re = /[^\s\u00A0]+/g; let m;
          while ((m = re.exec(txt))) {
            const r = document.createRange(); r.setStart(node, m.index); r.setEnd(node, m.index + m[0].length);
            const rects = [...r.getClientRects()].filter((x) => x.width > 0);
            if (rects.length) words.push({ w: m[0], top: Math.round(rects[0].top) });
          }
        }
        if (!words.length) return;
        const lines = [];
        for (const w of words) {
          const last = lines[lines.length - 1];
          if (last && Math.abs(last.top - w.top) < 6) last.words.push(w.w); else lines.push({ top: w.top, words: [w.w] });
        }
        if (lines.length < 2) return;
        const kind = el.className.split(" ")[0] || el.tagName.toLowerCase();
        const CURTAS = ["de", "da", "do", "em", "no", "na", "um", "os", "as", "ao", "ou", "se", "me", "te"];
        const clean = (w) => w.replace(/[.,;:!?…"'“”()*]/g, "").toLowerCase();
        const curta = (w) => clean(w).length === 1 || CURTAS.includes(clean(w));
        lines.slice(0, -1).forEach((l, i) => {
          const end = l.words[l.words.length - 1];
          if (curta(end)) out.push(`${n}: ${kind} com "${end}" solto no fim da linha ${i + 1}`);
        });
        // capa empilhada à mão (com <br>): uma palavra por linha é desenho, não viúva
        const lastLine = lines[lines.length - 1];
        if (lastLine.words.length === 1 && !el.querySelector("br")) out.push(`${n}: ${kind} com viúva na última linha ("${lastLine.words[0]}")`);
      });
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
