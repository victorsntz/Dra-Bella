import { C, g, svg, brain, stomach, plate, loop, tree, ripples, stream, sphere } from "../parts.mjs";

export default {
  // capa 520x900: prato quase vazio grande no alto, cérebro com hipotálamo embaixo soltando ondas fortes.
  "01-prato-cerebro": () => svg(520, 900, `
    ${g(345, 225, plate({ r: 170, portion: 0.14 }))}
    ${stream({ from: [340, 405], to: [250, 575], ctrl: [250, 470], n: 7, rmin: 4, rmax: 9, tone: 2, seed: 51, spread: 10, fade: true })}
    ${g(386, 718, ripples({ n: 4, r0: 40, gap: 26, color: "#6F6356", sweep: 90 }))}
    ${g(30, 565, brain({ hypothalamus: true }), { s: 1.7 })}`),

  // texto café, cena alta 888x440: prato vazio → estômago → fluxo de grelina pro cérebro.
  "02-escassez": () => svg(888, 440, `
    ${g(150, 230, plate({ r: 120, portion: 0 }))}
    ${stream({ from: [500, 190], to: [600, 190], ctrl: [550, 150], n: 8, rmin: 5, rmax: 10, tone: 2, seed: 52, spread: 8 })}
    ${g(330, 110, stomach({ full: false }), { s: 1.25 })}
    ${g(590, 60, brain({ hypothalamus: true }), { s: 1.45 })}`),

  // diagrama, miolo 488x370: o ciclo (anel de esferas) com o prato pequeno no centro.
  "03-ciclo": () => svg(488, 370, `
    ${g(244, 185, loop({ r: 162, n: 26, tone: "mix", seed: 7 }))}
    ${g(244, 185, plate({ r: 70, portion: 0.14 }))}`),

  // diagrama café, miolo 488x370: cérebro à esquerda, ciclo de recompensa à direita, esferas de dopamina entre os dois.
  "04-recompensa": () => svg(488, 370, `
    ${stream({ from: [200, 180], to: [300, 170], ctrl: [250, 140], n: 7, rmin: 5, rmax: 10, tone: 2, seed: 53, spread: 7 })}
    ${g(370, 185, loop({ r: 100, n: 18, tone: 2, seed: 8 }))}
    ${g(370, 185, plate({ r: 40, portion: 0.5 }))}
    ${g(10, 95, brain({ hypothalamus: true }), { s: 1.05 })}`),

  // texto, cena alta 888x440: cérebro grande no centro com ondas saindo pra direita.
  "05-fisiologia": () => svg(888, 440, `
    ${g(660, 215, ripples({ n: 5, r0: 56, gap: 32, color: "#ABA597", sweep: 90 }))}
    ${g(230, 40, brain({ hypothalamus: true }), { s: 2.0 })}`),

  // texto café, cena alta 888x440: prato cheio grande à esquerda, árvore pequena à direita.
  "06-saida": () => svg(888, 440, `
    ${g(270, 225, plate({ r: 175, portion: 1 }))}
    ${g(560, 20, tree(), { s: 0.95 })}`),
};
