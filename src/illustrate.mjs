// Gera as ilustrações de um carrossel a partir do campo figure.prompt de cada slide.
//
//   node src/illustrate.mjs musculo-remedio          # gera só as que ainda não existem
//   node src/illustrate.mjs musculo-remedio --force  # regenera todas
//   node src/illustrate.mjs musculo-remedio --only 03
//   node src/illustrate.mjs musculo-remedio --dry    # só imprime os prompts
//
// Provedor escolhido pela variável de ambiente IMAGE_PROVIDER:
//   gemini  → GEMINI_API_KEY   (modelo: IMAGE_MODEL ou gemini-2.5-flash-image)
//   openai  → OPENAI_API_KEY   (modelo: IMAGE_MODEL ou gpt-image-1)
// A chave nunca fica no repositório: vem do ambiente.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const only = argv[argv.indexOf("--only") + 1];
const name = argv.find((a) => !a.startsWith("--") && a !== only);
if (!name) { console.error("uso: node src/illustrate.mjs <carrossel> [--force] [--dry] [--only NN]"); process.exit(1); }

const STYLE = (await fs.readFile(path.join(ROOT, "brand", "illustration-style.txt"), "utf8")).trim();
const NEGATIVE = "No labels, no text, no typography, no arrows, no watermark, no logo.";

const providers = {
  async gemini(prompt) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY não definida no ambiente");
    const model = process.env.IMAGE_MODEL || "gemini-2.5-flash-image";
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "4:5" } },
      }),
    });
    if (!r.ok) throw new Error(`gemini ${r.status}: ${(await r.text()).slice(0, 400)}`);
    const j = await r.json();
    const part = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (!part) throw new Error("gemini não devolveu imagem: " + JSON.stringify(j).slice(0, 400));
    return Buffer.from(part.inlineData.data, "base64");
  },

  async openai(prompt) {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY não definida no ambiente");
    const model = process.env.IMAGE_MODEL || "gpt-image-1";
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, prompt, size: "1024x1536", quality: "high", n: 1 }),
    });
    if (!r.ok) throw new Error(`openai ${r.status}: ${(await r.text()).slice(0, 400)}`);
    const j = await r.json();
    const b64 = j.data?.[0]?.b64_json;
    if (!b64) throw new Error("openai não devolveu imagem: " + JSON.stringify(j).slice(0, 400));
    return Buffer.from(b64, "base64");
  },
};

const provider = process.env.IMAGE_PROVIDER || "gemini";
if (!providers[provider]) { console.error(`IMAGE_PROVIDER desconhecido: ${provider}`); process.exit(1); }

const doc = JSON.parse(await fs.readFile(path.join(ROOT, "content", `${name}.json`), "utf8"));

for (let i = 0; i < doc.slides.length; i++) {
  const s = doc.slides[i];
  const nn = String(i + 1).padStart(2, "0");
  const fig = s.figure;
  if (!fig?.src) continue;
  if (only && !path.basename(fig.src).startsWith(only)) continue;

  const brief = fig.prompt || fig.placeholder;
  if (!brief) { console.log(`${nn}: sem prompt, pulando`); continue; }
  const target = path.join(ROOT, fig.src);

  let exists = true;
  try { await fs.access(target); } catch { exists = false; }
  if (exists && !flags.has("--force")) { console.log(`${nn}: já existe (${fig.src}), use --force pra refazer`); continue; }

  const prompt = `${STYLE}\n\nCena: ${brief}\n\n${NEGATIVE}`;
  if (flags.has("--dry")) { console.log(`\n── ${nn} → ${fig.src}\n${prompt}\n`); continue; }

  process.stdout.write(`${nn}: gerando via ${provider} … `);
  try {
    const png = await providers[provider](prompt);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, png);
    console.log(`ok → ${fig.src} (${(png.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log("falhou");
    console.error("   ", e.message);
  }
}
