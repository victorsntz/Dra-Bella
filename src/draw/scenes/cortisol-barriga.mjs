import { C, g, svg, moon, adrenalKidney, clock, stomach, pancreas, fatCluster, liver, cytokines, loop, ripples, stream } from "../parts.mjs";

export default {
  // capa 520x900: lua grande no alto (à direita, longe do título), rim com adrenal embaixo,
  // cortisol subindo da adrenal pra noite em arco.
  "01-lua-adrenal": () => svg(520, 900, `
    ${g(300, 212, moon({ r: 140 }))}
    ${stream({ from: [250, 540], to: [330, 360], ctrl: [190, 420], n: 12, rmin: 5, rmax: 12, tone: 2, seed: 51, spread: 14 })}
    ${g(130, 490, adrenalKidney(), { s: 2.4 })}`),

  // texto café, cena alta 888x440: relógio às três da manhã à esquerda, adrenal à direita
  // soltando cortisol que corre pro resto do dia.
  "02-relogio-adrenal": () => svg(888, 440, `
    ${stream({ from: [600, 180], to: [400, 230], ctrl: [500, 300], n: 9, tone: 2, seed: 52, spread: 10 })}
    ${g(220, 230, clock({ r: 150, h: 3 }))}
    ${g(580, 40, adrenalKidney(), { s: 2.2 })}`),

  // diagrama, miolo 488x370: adrenal no centro mandando cortisol pro estômago (grelina),
  // pâncreas (insulina) e gordura visceral (leptina / estoque) nos cantos.
  "03-quatro-sinais": () => svg(488, 370, `
    ${stream({ from: [230, 150], to: [120, 90], ctrl: [170, 90], n: 7, tone: 2, seed: 53, spread: 7 })}
    ${stream({ from: [230, 240], to: [120, 300], ctrl: [170, 300], n: 7, tone: 2, seed: 54, spread: 7 })}
    ${stream({ from: [270, 190], to: [380, 190], ctrl: [320, 170], n: 7, tone: 2, seed: 55, spread: 7 })}
    ${g(20, 20, stomach(), { s: 0.7 })}
    ${g(10, 300, pancreas(), { s: 0.62 })}
    ${g(418, 190, fatCluster({ s: 0.78 }))}
    ${g(190, 95, adrenalKidney(), { s: 1.1 })}`),

  // texto claro, cena alta 888x440: gordura visceral grande, citocinas saindo dela, fígado ao lado.
  "04-visceral": () => svg(888, 440, `
    ${stream({ from: [400, 230], to: [600, 180], ctrl: [500, 140], n: 9, tone: 1, seed: 56, spread: 9 })}
    ${g(270, 230, fatCluster({ s: 1.75 }))}
    ${g(470, 320, cytokines({ n: 9, tone: 1, seed: 11 }), { s: 1.0 })}
    ${g(590, 110, liver(), { s: 1.2 })}`),

  // diagrama café, miolo 488x370: lua no centro de um anel de esferas (o ciclo), anel largo
  // pra encostar nas pílulas das colunas.
  "05-ciclo": () => svg(488, 370, `
    ${g(244, 185, loop({ r: 168, n: 32, tone: "mix", seed: 12 }))}
    ${g(244, 185, moon({ r: 72, stars: false }))}`),

  // texto claro, cena alta 888x440: lua grande à esquerda e ondas se espalhando pra direita.
  "06-lua-ondas": () => svg(888, 440, `
    ${g(300, 240, moon({ r: 150 }))}
    ${g(490, 240, ripples({ n: 6, r0: 80, gap: 44, color: "#6F6356", sweep: 96 }))}`),
};
