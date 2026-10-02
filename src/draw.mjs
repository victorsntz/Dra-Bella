// Gera as ilustrações vetoriais de um carrossel: src/draw/scenes/<nome>.mjs → assets/illustrations/<nome>/*.svg
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2];
if (!name) { console.error("uso: node src/draw.mjs <carrossel>"); process.exit(1); }
const { default: scenes } = await import(`./draw/scenes/${name}.mjs`);
const dir = path.join(ROOT, "assets", "illustrations", name);
await fs.mkdir(dir, { recursive: true });
for (const [file, fn] of Object.entries(scenes)) {
  await fs.writeFile(path.join(dir, `${file}.svg`), fn());
  console.log(`✓ assets/illustrations/${name}/${file}.svg`);
}
