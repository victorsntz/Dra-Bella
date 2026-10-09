import { C, g, svg, intestine, brain, cytokines, stream, plate, moon, tree, sphere } from "../parts.mjs";

// microbiota: esferas pequenas espalhadas ao longo do tubo do intestino (coordenadas da peça, escala 1)
const microbiota = (seed = 7, n = 14, tone = 3) => {
  let s = seed * 4397; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const spots = [[60, 24], [110, 18], [160, 32], [190, 60], [170, 92], [120, 104], [70, 118], [40, 150], [70, 182], [120, 176], [170, 166], [210, 178], [90, 60], [140, 70]];
  return `<g>${spots.slice(0, n).map(([x, y]) => sphere(x + (rnd() - 0.5) * 8, y + (rnd() - 0.5) * 8, 3.5 + rnd() * 3, tone)).join("")}</g>`;
};

export default {
  // capa 520x900: intestino grande embaixo (à direita, longe do título), cérebro no alto,
  // GLP-1 e PYY subindo em arco pelo lado direito.
  "01-intestino-cerebro": () => svg(520, 900, `
    ${stream({ from: [250, 520], to: [380, 300], ctrl: [470, 440], n: 11, rmin: 5, rmax: 12, tone: "mix", seed: 61, spread: 14 })}
    ${g(200, 30, brain(), { s: 1.45 })}
    ${g(30, 500, intestine(), { s: 1.95 })}`),

  // texto café, cena alta 888x440: intestino à esquerda, cérebro à direita, fluxo em arco.
  "02-eixo": () => svg(888, 440, `
    ${stream({ from: [370, 200], to: [590, 200], ctrl: [480, 110], n: 10, tone: "mix", seed: 62, spread: 10 })}
    ${g(40, 100, intestine(), { s: 1.5 })}
    ${g(570, 60, brain(), { s: 1.4 })}`),

  // diagrama, miolo 488x370: intestino grande à esquerda com microbiota, cérebro no canto
  // superior direito, dois fluxos inteiros subindo em arco (GLP-1 e PYY).
  "03-saudavel": () => svg(488, 370, `
    ${stream({ from: [220, 120], to: [372, 112], ctrl: [290, 50], n: 8, tone: 1, seed: 63, spread: 7 })}
    ${stream({ from: [290, 215], to: [405, 150], ctrl: [370, 215], n: 8, tone: 2, seed: 64, spread: 7 })}
    ${g(335, 20, brain(), { s: 0.7 })}
    ${g(20, 100, `${intestine()}${microbiota(7, 14, 3)}`, { s: 1.3 })}`),

  // diagrama café, miolo 488x370: mesmo arranjo, citocinas escapando pela parede do intestino
  // e o fluxo pro cérebro esmaecendo antes de chegar.
  "04-inflamado": () => svg(488, 370, `
    ${stream({ from: [220, 120], to: [372, 112], ctrl: [290, 50], n: 8, tone: 2, seed: 65, spread: 8, fade: true })}
    ${g(335, 20, brain(), { s: 0.7 })}
    ${g(20, 100, `${intestine()}${microbiota(9, 7, 2)}`, { s: 1.3 })}
    ${g(60, 318, cytokines({ n: 8, tone: 1, seed: 13 }), { s: 0.9 })}
    ${g(400, 300, cytokines({ n: 9, tone: 1, seed: 14 }), { s: 1.0 })}
    ${g(330, 200, cytokines({ n: 5, tone: 1, seed: 15 }), { s: 0.7 })}`),

  // texto claro, 420x250 (faixa no topo e na base): prato com pouca comida e lua ao lado.
  "05-gatilhos": () => svg(420, 250, `
    ${g(125, 125, plate({ r: 100, portion: 0.22 }))}
    ${g(315, 120, moon({ r: 64 }))}`),

  // texto café, 420x300 (faixa no topo e na base): a Árvore.
  "06-arvore": () => svg(420, 300, `
    ${g(0, 0, tree(), { s: 0.74 })}`),
};
