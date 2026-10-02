// Página de revisão das ilustrações vetoriais: cada SVG inline, grande, com o que mostra e onde entra.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2] || "musculo-remedio";
const doc = JSON.parse(await fs.readFile(path.join(ROOT, "content", `${name}.json`), "utf8"));
const dir = path.join(ROOT, "assets", "illustrations", name);

const items = [];
for (let i = 0; i < doc.slides.length; i++) {
  const s = doc.slides[i];
  if (!s.figure?.src) continue;
  const file = path.join(ROOT, s.figure.src);
  let svg; try { svg = await fs.readFile(file, "utf8"); } catch { continue; }
  svg = svg.replace(/width="\d+" height="\d+"/, 'width="100%" height="auto"');
  items.push({ n: i + 1, type: s.type, title: s.title.replace(/\*\*/g, "").replace(/\n/g, " "), prompt: s.figure.prompt, svg, file: path.basename(s.figure.src) });
}

const html = `<title>Ilustrações Dra. Bella</title>
<link rel="stylesheet" href="brand/brand.css">
<style>
  /* mesa de luz: cada vetor numa bancada creme, com ficha ao lado */
  :root { --bg: #ECE8E1; --fg: #362D28; --mute: #6F6356; --line: #CFCABF; --card: #F6F4F0;
    --font-ui: "Montserrat", "Helvetica Neue", Arial, sans-serif; --font-disp: "Cherston", Georgia, serif; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg: #2A2420; --fg: #E6E3DC; --mute: #ABA597; --line: #4A403A; --card: #F6F4F0; color-scheme: dark; } }
  :root[data-theme="dark"] { --bg: #2A2420; --fg: #E6E3DC; --mute: #ABA597; --line: #4A403A; --card: #F6F4F0; color-scheme: dark; }
  html, body { background: var(--bg); } body { color: var(--fg); font-family: var(--font-ui); font-weight: 300; }
  .wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; padding-block: 48px 96px; }
  h1 { font: 300 clamp(40px, 7vw, 76px)/1 var(--font-disp); letter-spacing: -0.06em; margin: 0 0 14px; }
  h2 { font: 300 clamp(26px, 3.4vw, 38px)/1.05 var(--font-disp); letter-spacing: -0.05em; margin: 0 0 6px; }
  .eyebrow { font: 500 12px/1 var(--font-ui); letter-spacing: .2em; text-transform: uppercase; color: var(--mute); margin-bottom: 14px; }
  .intro { max-width: 62ch; font-size: 17px; line-height: 1.55; } .intro p { margin: 0 0 12px; }
  strong { font-weight: 600; }
  .item { margin-top: 56px; padding-top: 28px; border-top: 1px solid var(--line); display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 28px; align-items: start; }
  @media (max-width: 820px) { .item { grid-template-columns: 1fr; } }
  .board { background: var(--card); border-radius: 6px; padding: 28px; min-width: 0; box-shadow: 0 12px 30px rgba(54,45,40,.12); }
  .board svg { display: block; width: 100%; height: auto; }
  .ficha { min-width: 0; font-size: 14px; line-height: 1.5; color: var(--mute); }
  .ficha dt { font: 500 11px/1 var(--font-ui); letter-spacing: .16em; text-transform: uppercase; color: var(--mute); margin: 16px 0 4px; }
  .ficha dd { margin: 0; color: var(--fg); }
  .ficha dd.mute { color: var(--mute); }
  .parts { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-top: 20px; }
  .parts div { background: var(--card); color: #362D28; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.4; min-width: 0; }
  .parts b { display: block; font-weight: 600; margin-bottom: 2px; }
  .rules { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin-top: 18px; }
  .rule { background: var(--card); color: #362D28; border-radius: 6px; padding: 16px 18px; min-width: 0; }
  .rule h4 { margin: 0 0 6px; font: 600 14px/1.3 var(--font-ui); }
  .rule p { margin: 0; font-size: 13.5px; line-height: 1.5; color: #6F6356; }
  #manual { grid-template-columns: 1fr; }
  .sw { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: -1px; margin-right: 6px; }
</style>
<div class="wrap">
  <div class="eyebrow">Dra. Izabella Brasão · carrosséis · ilustrações 01</div>
  <h1>Ilustrações Dra. Bella</h1>
  <div class="intro">
    <p>Seis ilustrações em vetor, desenhadas em código na paleta da marca. Nada de modelo de imagem. Cada cena é montada com as mesmas sete peças, então o traço fica igual em qualquer carrossel e dá pra mudar uma cor em um lugar só.</p>
    <p>As etiquetas (nome da molécula, efeito) não fazem parte do desenho. Entram por cima, em HTML, no slide. Aqui você vê só o desenho. Comente em cima da peça que quiser mudar.</p>
  </div>
  <div class="parts">
    <div><b><span class="sw" style="background:#B9776A"></span>Músculo</b>Fusiforme com tendão, fibras e versão em corte com os feixes.</div>
    <div><b><span class="sw" style="background:#D9BBB0"></span>Cérebro</b>Vista lateral, giros, cerebelo. Variante com neurônios.</div>
    <div><b><span class="sw" style="background:#9B6557"></span>Fígado</b>Dois lobos e vesícula.</div>
    <div><b><span class="sw" style="background:#EBDCBB"></span>Gordura</b>Aglomerado de adipócitos.</div>
    <div><b><span class="sw" style="background:#C4807A"></span>Vaso</b>Tubo em corte com hemácias.</div>
    <div><b><span class="sw" style="background:#CDA893"></span>Mitocôndria</b>Corte com as cristas.</div>
    <div><b><span class="sw" style="background:#A9B3BC"></span>Moléculas</b>Esferas em três tons, em fluxo.</div>
    <div><b><span class="sw" style="background:#CDB9A6"></span>Figura</b>Mulher correndo, musculatura visível. Versão apagada pra apoio.</div>
  </div>

  <section class="item" id="manual" style="display:block">
    <div class="eyebrow">Manual</div>
    <h2>Pra toda ilustração sair igual</h2>
    <p class="intro" style="margin-top:8px">O código já aplica estas regras. O texto existe pra quem desenhar fora dele e pra criar peça nova. A versão completa fica no repositório, em <strong>brand/ILLUSTRATION-GUIDE.md</strong>.</p>
    <div class="rules">
      <div class="rule"><h4>Traço chapado</h4><p>Cor sólida por forma. Contorno de 1,5 px no tom escuro da própria peça. Uma luz branca em forma, a 20%. Sem degradê, sem sombra.</p></div>
      <div class="rule"><h4>Cores nascem da paleta</h4><p>Tudo deriva do Deep Coffee e do Serene Sand puxados pro rosa-terroso. Cor nova só como variação de uma existente. Nunca verde, azul puro ou amarelo vivo.</p></div>
      <div class="rule"><h4>Moléculas com significado</h4><p>Azul-acinzentado: sinal nervoso ou imune. Areia: sinal metabólico. Bege: gordura e energia. Mistura: o corpo todo recebe. Sempre em arco, 6 a 12 esferas.</p></div>
      <div class="rule"><h4>Miolo e faixas</h4><p>Ilustração no miolo, etiquetas nas faixas em volta. Diagrama: colunas de 200 px nas laterais. Texto com figura: faixa de 70 px no topo. Nada cruza.</p></div>
      <div class="rule"><h4>Cada peça inteira</h4><p>Peça principal no centro, secundárias nos cantos, nenhuma cortada pela borda. O canto que recebe etiqueta fica vazio.</p></div>
      <div class="rule"><h4>Figura humana</h4><p>Mulher de perfil correndo pra direita, lado perto com músculo, lado longe apagado, coque, sem rosto. Como apoio, versão apagada a 30%.</p></div>
      <div class="rule"><h4>Linhas internas</h4><p>Fibras, giros e cristas no tom escuro da peça, 30 a 55% de opacidade, pontas arredondadas. É o que faz a peça ser lida sem sombra.</p></div>
      <div class="rule"><h4>Peça nova</h4><p>Caixa própria, cor cadastrada no mapa, contorno, luz em forma, sem filtro. Entra numa cena com posição, escala e rotação. Confere no slide, não solta.</p></div>
    </div>
  </section>
  ${items.map((it) => `
  <section class="item" id="il${it.n}">
    <div class="board">${it.svg}</div>
    <dl class="ficha">
      <dt>Slide</dt><dd>${String(it.n).padStart(2, "0")} · ${it.type}</dd>
      <dt>Título do slide</dt><dd>${it.title}</dd>
      <dt>Cena</dt><dd class="mute">${it.prompt}</dd>
      <dt>Arquivo</dt><dd class="mute">${it.file}</dd>
    </dl>
  </section>`).join("")}
</div>
`;
const outDir = name === "musculo-remedio" ? "illustrations" : `illustrations-${name}`;
await fs.mkdir(path.join(ROOT, "build", outDir), { recursive: true });
await fs.writeFile(path.join(ROOT, "build", outDir, "index.html"), html);
console.log(`✓ build/${outDir}/index.html (${items.length} ilustrações)`);
