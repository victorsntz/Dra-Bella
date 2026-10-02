// Monta a página de revisão do design system (slides ao vivo + paleta + tipografia + componentes).
//   node src/review.mjs musculo-remedio   →  build/review/index.html
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadBrand, loadDoc, slideHTML, setAssetBase } from "./render.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2] || "musculo-remedio";
const brand = await loadBrand();
const doc = await loadDoc(name, brand);
setAssetBase("");

const slides = doc.slides
  .map((s, i) => `<figure class="sl"><div class="sl-box">${slideHTML(doc.brand, s, i, doc.slides.length)}</div>
  <figcaption><b>${String(i + 1).padStart(2, "0")}</b> ${s.type}</figcaption></figure>`)
  .join("\n");

const palette = [
  ["Deep Coffee", "#362D28", "texto, títulos, pílula escura, seta"],
  ["Cozy Brown", "#6F6356", "@, legendas das pílulas, subtítulo do lockup, destaque *itálico*"],
  ["Serene Sand", "#ABA597", "pílula média, marcador dos bullets, linhas finas"],
  ["Soft Cream", "#E6E3DC", "pílula clara, texto sobre café"],
  ["Paper (derivada)", "#F6F4F0", "fundo dos slides. Um creme mais claro que o Soft Cream, pra ilustração de fundo branco não brigar"],
  ["Sand Line (derivada)", "#CFCABF", "contorno da pílula clara, moldura do placeholder"],
];

const html = `<title>${name === "musculo-remedio" ? "Design System Dra. Bella" : "Carrossel " + doc.title.replace(/\*\*/g, "")}</title>
<link rel="stylesheet" href="brand/brand.css">
<link rel="stylesheet" href="templates/slide.css">
<style>
  /* página de revisão: cartela de atelier, slides como peças sobre a mesa */
  :root {
    --bg: #ECE8E1; --fg: #362D28; --mute: #6F6356; --line: #CFCABF; --card: #F6F4F0; --accent: #362D28;
    --font-ui: "Montserrat", "Helvetica Neue", Arial, sans-serif;
    --font-disp: "Cherston", Georgia, serif;
  }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
    --bg: #2A2420; --fg: #E6E3DC; --mute: #ABA597; --line: #4A403A; --card: #362D28; --accent: #E6E3DC; color-scheme: dark; } }
  :root[data-theme="dark"] {
    --bg: #2A2420; --fg: #E6E3DC; --mute: #ABA597; --line: #4A403A; --card: #362D28; --accent: #E6E3DC; color-scheme: dark; }

  html, body { background: var(--bg); }
  body { color: var(--fg); font-family: var(--font-ui); font-weight: 300; }
  .wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; padding-block: 48px 96px; }
  h1 { font: 300 clamp(40px, 7vw, 76px)/1 var(--font-disp); letter-spacing: -0.06em; margin: 0 0 14px; text-wrap: balance; }
  h2 { font: 300 clamp(30px, 4vw, 44px)/1.05 var(--font-disp); letter-spacing: -0.05em; margin: 0 0 8px; }
  .eyebrow { font: 500 12px/1 var(--font-ui); letter-spacing: .2em; text-transform: uppercase; color: var(--mute); margin-bottom: 14px; }
  .intro { max-width: 62ch; font-size: 17px; line-height: 1.55; }
  .intro p { margin: 0 0 12px; }
  section { margin-top: 72px; padding-top: 32px; border-top: 1px solid var(--line); }
  .sub { color: var(--mute); max-width: 62ch; font-size: 15px; line-height: 1.5; margin: 0 0 28px; }
  strong { font-weight: 600; }

  /* slides ao vivo, escalados */
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 28px 24px; }
  .sl { margin: 0; min-width: 0; }
  .sl-box { position: relative; width: 100%; aspect-ratio: 1080 / 1350; overflow: hidden;
    box-shadow: 0 12px 30px rgba(54,45,40,.14); border-radius: 4px; }
  .sl-box .slide-wrap { position: absolute; left: 0; top: 0; width: 1080px; height: 1350px;
    transform-origin: top left; transform: scale(var(--s, .3)); }
  .sl figcaption { margin-top: 10px; font-size: 13px; color: var(--mute); letter-spacing: .04em; }
  .sl figcaption b { font-weight: 600; color: var(--fg); margin-right: 6px; }

  /* paleta */
  .sw { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 16px; }
  .sw div { min-width: 0; }
  .chip { height: 96px; border-radius: 6px; border: 1px solid var(--line); }
  .sw h4 { margin: 10px 0 2px; font: 600 14px/1.2 var(--font-ui); }
  .sw code { font: 500 12px/1 ui-monospace, Menlo, monospace; color: var(--mute); letter-spacing: .04em; }
  .sw p { margin: 6px 0 0; font-size: 13px; line-height: 1.45; color: var(--mute); }

  /* tipografia */
  .type { display: grid; gap: 22px; }
  .spec { display: grid; grid-template-columns: 180px 1fr; gap: 20px; align-items: baseline; padding: 18px 0; border-bottom: 1px dashed var(--line); }
  .spec small { font: 500 11px/1.5 var(--font-ui); letter-spacing: .14em; text-transform: uppercase; color: var(--mute); }
  .spec .sample { min-width: 0; overflow-wrap: anywhere; }
  @media (max-width: 640px) { .spec { grid-template-columns: 1fr; gap: 6px; } }

  /* componentes: cada um numa bancada creme (as cores dos slides, não da página) */
  .bench { background: #F6F4F0; color: #362D28; border-radius: 6px; padding: 28px; display: flex; flex-wrap: wrap; gap: 28px 40px; align-items: flex-start; }
  .bench .lbl { width: 100%; font: 500 11px/1 var(--font-ui); letter-spacing: .16em; text-transform: uppercase; color: #6F6356; }
  .bench .label { position: static; transform: none; }
  .bench .bullets li { font-size: 24px; }
  .bench .ftr-left, .bench .ftr-right { position: static; }
  .bench .hdr { position: static; }
  .bench .pager { position: static; }

  /* regras do grid */
  .rules { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
  .rule { background: var(--card); border: 1px solid var(--line); border-radius: 6px; padding: 18px 20px; min-width: 0; }
  .rule h4 { margin: 0 0 6px; font: 600 14px/1.3 var(--font-ui); }
  .rule p { margin: 0; font-size: 14px; line-height: 1.5; color: var(--mute); }

  /* perguntas abertas */
  .q { counter-reset: q; display: grid; gap: 12px; max-width: 70ch; }
  .q div { padding: 16px 18px; background: var(--card); border: 1px solid var(--line); border-radius: 6px; font-size: 15px; line-height: 1.5; }
  .q div::before { counter-increment: q; content: counter(q, decimal-leading-zero); display: inline-block; margin-right: 12px; font: 600 12px/1 var(--font-ui); letter-spacing: .1em; color: var(--mute); }

  @media (prefers-reduced-motion: no-preference) { .sl-box { transition: box-shadow .2s; } .sl-box:hover { box-shadow: 0 18px 40px rgba(54,45,40,.22); } }
</style>

<div class="wrap">
  <div class="eyebrow">Dra. Izabella Brasão · carrosséis · revisão 01</div>
  <h1>Design System Dra. Bella</h1>
  <div class="intro">
    <p>Esta página existe pra fechar as decisões de uma vez. Tudo que está aqui é regra que o gerador aplica em todos os carrosséis: fonte, tamanho, cor, posição de cada elemento. Comente direto em cima do que quiser mudar.</p>
    <p>Os slides abaixo são HTML ao vivo, não imagem. As ilustrações ainda não existem, por isso o quadro tracejado com a descrição da cena.</p>
  </div>

  <section id="slides">
    <div class="eyebrow">01 · As peças</div>
    <h2>${doc.title}</h2>
    <p class="sub">Oito slides, cinco tipos de layout: capa, diagrama, texto com figura, fechamento e pergunta. Todo carrossel novo é uma combinação desses cinco.</p>
    <div class="grid">
${slides}
    </div>
  </section>

  <section id="paleta">
    <div class="eyebrow">02 · Cor</div>
    <h2>Paleta</h2>
    <p class="sub">As quatro cores do manual mais duas derivadas que eu precisei criar. Uma pílula escura, uma média e uma clara dão três níveis de importância sem sair da paleta.</p>
    <div class="sw">
      ${palette.map(([n, hex, use]) => `<div><div class="chip" style="background:${hex}"></div><h4>${n}</h4><code>${hex}</code><p>${use}</p></div>`).join("")}
    </div>
  </section>

  <section id="tipo">
    <div class="eyebrow">03 · Tipografia</div>
    <h2>Escala</h2>
    <p class="sub">Cherston só existe em caixa alta, então todo título sai em maiúsculas, como no manual. Tracking de -9% nos títulos, como o manual pede. Montserrat Light no corpo, Semibold só na palavra que carrega o mecanismo.</p>
    <div class="type">
      <div class="spec"><small>Capa · Cherston Light 112 / 0.98 · -9%</small><div class="sample" style="font:300 clamp(44px,8vw,112px)/.98 var(--font-disp);letter-spacing:-.09em">Seu músculo fabrica o próprio <span style="font-weight:400">remédio.</span></div></div>
      <div class="spec"><small>Título · Cherston Light 62 / 1.06 · -9%</small><div class="sample" style="font:300 clamp(34px,5vw,62px)/1.06 var(--font-disp);letter-spacing:-.09em">Músculo em contração é um <span style="font-weight:400">órgão.</span></div></div>
      <div class="spec"><small>Lead · Montserrat Light 31 / 1.42</small><div class="sample" style="font:300 clamp(20px,2.6vw,31px)/1.42 var(--font-ui)">Ele libera centenas de moléculas sinalizadoras chamadas <strong>miocinas</strong>.</div></div>
      <div class="spec"><small>Corpo · Montserrat Light 31 / 1.5</small><div class="sample" style="font:300 clamp(18px,2.4vw,31px)/1.5 var(--font-ui);max-width:60ch">O <strong>BDNF</strong> ajuda os neurônios a sobreviver, se adaptar e formar novas conexões.</div></div>
      <div class="spec"><small>Bullet · Montserrat Light 29 / 1.38</small><div class="sample" style="font:300 clamp(17px,2.2vw,29px)/1.38 var(--font-ui)"><strong>Irisina</strong> <span style="color:var(--mute)">→</span> gordura branca vira gordura que gasta energia.</div></div>
      <div class="spec"><small>Fechamento · Montserrat Light 40 / 1.4</small><div class="sample" style="font:300 clamp(22px,3vw,40px)/1.4 var(--font-ui);max-width:40ch"><strong>Músculo é remédio.</strong> E você fabrica ele.</div></div>
      <div class="spec"><small>Pílula · Montserrat Semibold 19</small><div class="sample" style="font:600 19px/1 var(--font-ui)">BDNF &nbsp; <span style="font-weight:500;font-size:17px;color:var(--mute)">↑ Neuroplasticidade (legenda · Medium 17)</span></div></div>
      <div class="spec"><small>@ e tagline · Montserrat Medium 18 / 13 · caixa alta · +16–20%</small><div class="sample" style="font:500 18px/1 var(--font-ui);letter-spacing:.16em;text-transform:uppercase;color:var(--mute)">@bellabrasao &nbsp;&nbsp; <span style="font-size:13px;letter-spacing:.2em">Obesidade &amp; Emagrecimento</span></div></div>
    </div>
  </section>

  <section id="comp">
    <div class="eyebrow">04 · Componentes</div>
    <h2>Peças repetidas</h2>
    <p class="sub">O que aparece em todo slide, sempre no mesmo lugar: @ no canto superior esquerdo, logo ou monograma no canto inferior esquerdo alinhado com o texto, seta no canto inferior direito. As pílulas marcam moléculas e órgãos em cima da ilustração.</p>
    <div class="bench">
      <span class="lbl">Pílulas · cinco tons</span>
      <div class="label tone-cream"><span class="pill">Irisina</span><div class="sub">↑ Gordura ativa</div></div>
      <div class="label tone-sand"><span class="pill">IL-6</span><div class="sub">↓ Inflamação</div></div>
      <div class="label tone-coffee"><span class="pill">BDNF</span><div class="sub">↑ Neuroplasticidade</div></div>
      <div class="label tone-brown"><span class="pill">Fígado</span><div class="sub">↓ Sinal inflamatório</div></div>
      <div class="label tone-outline"><span class="pill">Miostatina</span><div class="sub">↓ Perda de massa</div></div>
    </div>
    <div class="bench" style="margin-top:16px">
      <span class="lbl">Bullets · chave em Semibold, seta em Cozy Brown, marcador Serene Sand</span>
      <ul class="bullets"><li><span class="k">Irisina</span><span class="arr">→</span>gordura branca vira gordura que gasta energia.</li><li><span class="k">IL-6</span><span class="arr">→</span>o sinal mestre: acalma a inflamação, libera combustível.</li></ul>
    </div>
    <div class="bench" style="margin-top:16px; justify-content: space-between">
      <span class="lbl">Cabeçalho, card de perfil (capa e último), monograma (meio) e seta</span>
      <div class="hdr">@bellabrasao</div>
      <div class="ftr-left"><div class="profile"><div class="avatar"><img src="brand/profile.jpg" alt=""></div><div class="who"><div class="pname">Dra. Izabella Brasão <svg class="badge" viewBox="0 0 24 24" width="26" height="26"><path d="M12 1.5l2.6 2 3.2-.5 1.2 3 3 1.2-.5 3.2 2 2.6-2 2.6.5 3.2-3 1.2-1.2 3-3.2-.5-2.6 2-2.6-2-3.2.5-1.2-3-3-1.2.5-3.2-2-2.6 2-2.6-.5-3.2 3-1.2 1.2-3 3.2.5z" fill="#1D9BF0"/><path d="M7.5 12.4l3 3 6-6.4" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="phandle">@bellabrasao</div></div></div></div><div class="ftr-left"><img class="monogram" src="brand/monogram.png" alt="IB"></div><div class="ftr-right"><svg class="arrow" viewBox="0 0 120 16" width="120" height="16"><circle cx="5" cy="8" r="4" fill="currentColor" opacity="0.55"/><path d="M12,8 H112 M103,2 L112,8 L103,14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </div>
  </section>

  <section id="grid">
    <div class="eyebrow">05 · Grid</div>
    <h2>Regras de espaço</h2>
    <div class="rules">
      <div class="rule"><h4>Formato 1080 × 1350</h4><p>Retrato 4:5 do Instagram. Tudo é desenhado nesse tamanho e exportado em JPG qualidade 92.</p></div>
      <div class="rule"><h4>Margens 96 px</h4><p>Laterais de 96. Topo de 108 (o @ fica a 96 do topo). Card de perfil, monograma e seta a 120 da base. Embaixo, 268 reservados pro conteúdo nunca encostar na assinatura.</p></div>
      <div class="rule"><h4>Capa</h4><p>Título ocupa a metade esquerda, até 510 px de largura. Ilustração ocupa a direita, 520 × 900, e pode invadir um pouco o título, como na referência.</p></div>
      <div class="rule"><h4>Diagrama</h4><p>Figura com altura fixa de 390 px. Até quatro bullets de uma linha. Nota opcional no canto inferior esquerdo, ao lado da assinatura.</p></div>
      <div class="rule"><h4>Texto com figura</h4><p>Até três parágrafos curtos. A figura ocupa tudo o que o texto deixar. Com pouco texto, a cena é composta mais alta e as peças maiores: nunca sobra um vazio no slide.</p></div>
      <div class="rule"><h4>Fechamento e pergunta</h4><p>Só texto, centralizado na vertical. Sem seta. A pergunta leva a dica "comenta aqui" em caixa alta.</p></div>
      <div class="rule"><h4>Negrito</h4><p>Nos títulos, a palavra em negrito vira Cherston Regular. No corpo, Montserrat Semibold. Nunca uma frase inteira.</p></div>
      <div class="rule"><h4>Etiquetas</h4><p>Sempre em cima da peça que nomeiam, na borda superior dela, como na capa. Colunas laterais só quando a ilustração não tem onde receber a pílula, e aí encostadas e por cima da borda. Pílula em cima, legenda com ↑ ou ↓ embaixo, também com caixa pra ler sobre qualquer cor. Alinhadas pra dentro, em direção à peça que nomeiam.</p></div>
    </div>
  </section>

  <section id="perguntas">
    <div class="eyebrow">06 · Decisões</div>
    <h2>Fechado</h2>
    <p class="sub">As sete perguntas da primeira rodada, com o que foi decidido. Tudo já está aplicado no gerador.</p>
    <div class="q">
      <div><strong>Fundo. Decidido:</strong> alterna creme e café escuro. Neste carrossel, os slides 3, 5 e 7 vão no café. No JSON é <code>"theme": "coffee"</code> no slide.</div>
      <div><strong>Caixa alta. Decidido:</strong> fica. Cherston em todo título, sempre em maiúsculas.</div>
      <div><strong>Assinatura. Decidido:</strong> card de perfil (foto com anel, nome com selo, @) na capa e no último slide, monograma IB nos do meio.</div>
      <div><strong>Cabeçalho. Decidido:</strong> só o @bellabrasao.</div>
      <div><strong>Pílulas. Decidido:</strong> três tons da paleta (café, areia, creme). Sem cor extra.</div>
      <div><strong>Tagline. Decidido:</strong> "Obesidade &amp; Emagrecimento", como está no logo.</div>
      <div><strong>Numeração. Decidido:</strong> sem numeração de slide.</div>
    </div>
  </section>
</div>

<script>
  // escala cada slide (1080 px) pra largura da sua caixa
  (function () {
    const boxes = document.querySelectorAll(".sl-box");
    const fit = () => boxes.forEach((b) => b.style.setProperty("--s", (b.clientWidth / 1080).toFixed(4)));
    fit();
    if (window.ResizeObserver) { const ro = new ResizeObserver(fit); boxes.forEach((b) => ro.observe(b)); }
    else window.addEventListener("resize", fit);
  })();
</script>
`;

const outDir = name === "musculo-remedio" ? "review" : `review-${name}`;
await fs.mkdir(path.join(ROOT, "build", outDir), { recursive: true });
await fs.writeFile(path.join(ROOT, "build", outDir, "index.html"), html);
console.log(`✓ build/${outDir}/index.html`);
