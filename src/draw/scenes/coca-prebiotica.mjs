import { g, svg, can, intestine, stream, sphere, cytokines, pen, plate, ripples, tree } from "../parts.mjs";

export default {
  // capa: 520 x 900. Lata grande no alto, fibra caindo em arco sobre um intestino pequeno embaixo.
  "01-lata-intestino": () => svg(520, 900, `
    ${stream({ from: [330, 420], to: [250, 640], ctrl: [360, 560], n: 10, rmin: 5, rmax: 11, tone: 3, seed: 41, spread: 12 })}
    ${g(330, 240, can({ w: 170, h: 340 }))}
    ${g(60, 620, intestine(), { s: 1.3 })}`),

  // texto café, cena alta 888 x 440: duas latas, fibra entre elas.
  "02-duas-latas": () => svg(888, 440, `
    ${g(250, 250, can({ w: 150, h: 300 }))}
    ${g(640, 250, can({ w: 150, h: 300 }))}
    ${stream({ from: [340, 180], to: [560, 180], ctrl: [450, 120], n: 8, rmin: 5, rmax: 10, tone: 3, seed: 42, spread: 10 })}`),

  // diagrama: miolo 488 x 370. Caneta no alto à esquerda, açúcar esmaecendo embaixo, lata à direita.
  "03-era-das-canetas": () => svg(488, 370, `
    ${stream({ from: [150, 110], to: [360, 180], ctrl: [250, 90], n: 8, tone: 1, seed: 43, spread: 8 })}
    ${stream({ from: [120, 290], to: [360, 210], ctrl: [240, 320], n: 8, tone: 3, seed: 44, spread: 8, fade: true })}
    ${g(90, 90, pen({ w: 200, h: 30, label: 1 }), { r: -20 })}
    ${g(90, 270, cytokines({ n: 10, tone: 3, seed: 7 }), { s: 1.1 })}
    ${g(400, 190, can({ w: 110, h: 230 }))}`),

  // diagrama café: miolo 488 x 370. Intestino grande com bactérias boas, lata pequena mandando fluxo fraco.
  "04-microbiota": () => svg(488, 370, `
    ${stream({ from: [410, 300], to: [300, 230], ctrl: [380, 220], n: 6, rmin: 4, rmax: 8, tone: 3, seed: 45, spread: 6, fade: true })}
    ${g(30, 70, intestine(), { s: 1.25 })}
    ${g(120, 120, cytokines({ n: 8, tone: 1, seed: 11 }), { s: 0.8 })}
    ${g(220, 200, cytokines({ n: 8, tone: 2, seed: 12 }), { s: 0.8 })}
    ${g(150, 270, cytokines({ n: 7, tone: 3, seed: 13 }), { s: 0.8 })}
    ${g(430, 300, can({ w: 60, h: 120 }))}`),

  // texto claro, cena alta 888 x 440: lata grande com ondas saindo, prato quase vazio ao lado.
  "05-resto-da-lata": () => svg(888, 440, `
    ${g(380, 230, ripples({ n: 4, r0: 120, gap: 32, color: "#6F6356", sweep: 90 }))}
    ${g(230, 230, can({ w: 170, h: 340 }))}
    ${g(650, 250, plate({ r: 110, portion: 0.3 }))}`),

  // texto café: miolo 888 x 250. A Árvore.
  "06-arvore": () => svg(420, 250, `
    ${g(80, -6, tree(), { s: 0.62 })}`),
};
