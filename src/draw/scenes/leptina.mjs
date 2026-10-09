import { C, g, svg, brain, fatCluster, vessel, pancreas, cytokines, moon, scale, ripples, stream } from "../parts.mjs";

// Regra de composição: a ilustração vive no miolo (fig.inset no JSON) e as etiquetas nas faixas
// em volta. Cada cena deixa vazio o canto onde uma etiqueta vai entrar.
export default {
  // capa 520x900: gordura embaixo à esquerda, fluxo que esmaece subindo até o cérebro em cima à direita.
  // O título (4 linhas) invade a caixa até x ~272 nas linhas 1 e 4; o cérebro fica à direita disso.
  "01-sinal-esmaece": () => svg(520, 900, `
    ${stream({ from: [220, 640], to: [380, 360], ctrl: [330, 530], n: 11, rmin: 5, rmax: 12, tone: 3, seed: 51, spread: 14, fade: true })}
    ${g(262, 130, brain({ hypothalamus: true }), { s: 1.15 })}
    ${g(150, 720, fatCluster({ s: 1.6 }))}`),

  // texto (café), dois parágrafos: cena alta 888x440. Gordura à esquerda manda leptina em arco até o hipotálamo.
  "02-leptina-nasce": () => svg(888, 440, `
    ${stream({ from: [300, 230], to: [590, 260], ctrl: [450, 150], n: 10, rmin: 5, rmax: 11, tone: 3, seed: 52, spread: 10 })}
    ${g(170, 240, fatCluster({ s: 1.55 }))}
    ${g(420, 50, brain({ hypothalamus: true }), { s: 1.85 })}`),

  // diagrama, miolo 488x370: gordura grande embaixo à esquerda, fluxo denso (não esmaece) até o cérebro à direita.
  "03-paradoxo": () => svg(488, 370, `
    ${stream({ from: [140, 245], to: [315, 195], ctrl: [160, 145], n: 14, rmin: 5, rmax: 11, tone: 3, seed: 53, spread: 11 })}
    ${g(86, 288, fatCluster({ s: 0.9 }))}
    ${g(200, 30, brain({ hypothalamus: true }), { s: 1.3 })}`),

  // diagrama (café), miolo 488x370: cérebro no centro, quatro fontes de ruído nos cantos.
  "04-ruidos": () => svg(488, 370, `
    ${stream({ from: [95, 85], to: [215, 175], ctrl: [170, 90], n: 7, rmin: 4, rmax: 8, tone: 1, seed: 54, spread: 7 })}
    ${stream({ from: [110, 285], to: [220, 225], ctrl: [170, 290], n: 7, rmin: 4, rmax: 8, tone: 3, seed: 55, spread: 7 })}
    ${stream({ from: [400, 85], to: [262, 180], ctrl: [320, 95], n: 7, rmin: 4, rmax: 8, tone: 2, seed: 56, spread: 7 })}
    ${stream({ from: [395, 285], to: [258, 225], ctrl: [330, 290], n: 7, rmin: 4, rmax: 8, tone: 1, seed: 57, spread: 7 })}
    ${g(62, 70, cytokines({ n: 9, tone: 1, seed: 11 }))}
    ${g(70, 300, vessel({ w: 110, h: 38, rbcs: 3 }), { r: -8 })}
    ${g(372, 40, pancreas(), { s: 0.55 })}
    ${g(425, 300, moon({ r: 34 }))}
    ${g(134, 100, brain({ hypothalamus: true }), { s: 1.0 })}`),

  // texto, dois parágrafos: cena alta 888x440. Balança com ponteiro baixo à esquerda, fluxo fraco até o cérebro.
  "05-despenca": () => svg(888, 440, `
    ${stream({ from: [330, 190], to: [600, 260], ctrl: [470, 130], n: 7, rmin: 4, rmax: 9, tone: 3, seed: 58, spread: 10, fade: true })}
    ${g(40, 110, scale({ needle: 0.3 }), { s: 1.85 })}
    ${g(470, 50, brain({ hypothalamus: true }), { s: 1.85 })}`),

  // texto (café), dois parágrafos: cena alta 888x440. Ruído à esquerda, cérebro grande, sinal limpo chegando pela direita.
  "06-ruido": () => svg(888, 440, `
    ${g(190, 230, ripples({ n: 4, r0: 50, gap: 30, color: "#ABA597", sweep: 80 }), { r: 180 })}
    ${stream({ from: [840, 330], to: [565, 320], ctrl: [720, 410], n: 8, rmin: 4, rmax: 9, tone: 1, seed: 59, spread: 8 })}
    ${g(300, 45, brain({ hypothalamus: true }), { s: 2.0 })}`),
};
