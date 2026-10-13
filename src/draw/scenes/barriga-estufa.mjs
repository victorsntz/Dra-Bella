import { g, svg, intestine, stream, cytokines, ripples, clock, fatCluster, cycle, pancreas, vessel, brain, tree } from "../parts.mjs";

export default {
  // capa: 520 x 900. Intestino grande no meio, ondas de inchaço à direita, citocinas chegando por cima.
  "01-intestino-inchaco": () => svg(520, 900, `
    ${stream({ from: [200, 60], to: [230, 330], ctrl: [120, 200], n: 10, rmin: 5, rmax: 11, tone: 1, seed: 51, spread: 14 })}
    ${g(385, 440, ripples({ n: 4, r0: 50, gap: 26, color: "#6F6356", sweep: 90 }))}
    ${g(40, 320, intestine(), { s: 1.6 })}
    ${g(150, 140, cytokines({ n: 9, tone: 1, seed: 14 }), { s: 1.2 })}`),

  // texto café, cena alta 888 x 440: relógio de manhã à esquerda, intestino com ondas à direita.
  "02-manha-noite": () => svg(888, 440, `
    ${g(170, 230, clock({ r: 110, h: 7 }))}
    ${stream({ from: [300, 230], to: [440, 230], ctrl: [370, 170], n: 7, rmin: 5, rmax: 9, tone: 2, seed: 52, spread: 8 })}
    ${g(760, 230, ripples({ n: 4, r0: 50, gap: 24, color: "#ABA597", sweep: 90 }))}
    ${g(450, 120, intestine(), { s: 1.3 })}`),

  // diagrama: miolo 488 x 370. Três origens à esquerda, intestino à direita.
  "03-origens": () => svg(488, 370, `
    ${stream({ from: [120, 60], to: [300, 150], ctrl: [210, 60], n: 8, tone: 1, seed: 53, spread: 7 })}
    ${stream({ from: [120, 185], to: [300, 185], ctrl: [210, 190], n: 8, tone: 1, seed: 54, spread: 7 })}
    ${stream({ from: [120, 310], to: [300, 220], ctrl: [210, 310], n: 8, tone: 1, seed: 55, spread: 7 })}
    ${g(70, 60, fatCluster({ s: 0.5 }))}
    ${g(70, 185, cycle({ r: 40, active: 1 }))}
    ${g(10, 290, pancreas(), { s: 0.55 })}
    ${g(300, 100, intestine(), { s: 0.8 })}`),

  // diagrama café: miolo 488 x 370. Intestino com citocinas escapando pela parede, bactérias crescendo dentro.
  "04-barreira": () => svg(488, 370, `
    ${g(60, 80, intestine(), { s: 1.3 })}
    ${g(150, 110, cytokines({ n: 7, tone: 1, seed: 21 }), { s: 0.8 })}
    ${g(330, 150, cytokines({ n: 12, tone: 3, seed: 22 }), { s: 1.1 })}
    ${g(220, 290, cytokines({ n: 10, tone: 3, seed: 23 }), { s: 1.0 })}
    ${stream({ from: [120, 60], to: [230, 160], ctrl: [120, 150], n: 6, rmin: 4, rmax: 8, tone: 1, seed: 56, spread: 8 })}`),

  // texto claro: miolo 888 x 250. A Árvore com o fruto em destaque.
  "05-sibo-fruto": () => svg(420, 250, `
    ${g(80, -6, tree(), { s: 0.62 })}`),

  // texto café, cena alta 888 x 440: vaso com citocinas chegando a um intestino.
  "06-pesquisa": () => svg(888, 440, `
    ${g(200, 200, vessel({ w: 260, h: 70, rbcs: 4 }), { r: -10 })}
    ${stream({ from: [340, 230], to: [500, 250], ctrl: [420, 180], n: 8, rmin: 5, rmax: 10, tone: 1, seed: 57, spread: 10 })}
    ${g(500, 130, intestine(), { s: 1.25 })}`),

  // texto claro, cena 888 x 380: quatro peças em linha ligadas por um fluxo.
  "07-mulher-inteira": () => svg(888, 380, `
    ${stream({ from: [200, 200], to: [290, 200], ctrl: [245, 170], n: 5, rmin: 5, rmax: 8, tone: 2, seed: 58, spread: 4 })}
    ${stream({ from: [400, 200], to: [500, 200], ctrl: [450, 170], n: 5, rmin: 5, rmax: 8, tone: 2, seed: 59, spread: 4 })}
    ${stream({ from: [620, 200], to: [700, 200], ctrl: [660, 170], n: 5, rmin: 5, rmax: 8, tone: 2, seed: 60, spread: 4 })}
    ${g(30, 120, intestine(), { s: 0.75 })}
    ${g(345, 200, cycle({ r: 55, active: 1 }))}
    ${g(560, 200, cytokines({ n: 12, tone: 1, seed: 24 }), { s: 1.3 })}
    ${g(700, 120, brain({ hypothalamus: true }), { s: 0.9 })}`),
};
