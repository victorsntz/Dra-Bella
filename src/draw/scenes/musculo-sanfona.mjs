import { C, g, svg, muscle, runner, scale, fatCluster, vessel, mitochondrion, stream, pen, plate, moon } from "../parts.mjs";

// Músculo é o seguro contra o efeito sanfona. Esferas tom 3 (bege) = gordura/energia saindo;
// tom 2 (areia) = sinal metabólico; "mix" = miocinas.
export default {
  // capa 520x900: corredora grande à direita, um músculo em destaque no alto à esquerda,
  // balança pequena no canto inferior esquerdo.
  "01-corredora-musculo": () => svg(520, 900, `
    ${stream({ from: [330, 480], to: [195, 195], ctrl: [200, 420], n: 6, rmin: 3, rmax: 6, tone: 3, seed: 52, spread: 6, fade: true })}
    ${g(80, 0, runner())}
    ${g(100, 140, muscle({ w: 190, h: 68 }), { r: -30 })}
    ${g(0, 790, scale({ needle: 0.42 }), { s: 0.56 })}`),

  // texto café, cena alta 888x440: músculo grande perdendo massa pra balança.
  "02-restricao": () => svg(888, 440, `
    ${stream({ from: [470, 215], to: [640, 245], ctrl: [560, 145], n: 9, rmin: 4, rmax: 9, tone: 3, seed: 53, spread: 8 })}
    ${g(290, 262, muscle({ w: 440, h: 150 }), { r: -8 })}
    ${g(610, 162, scale({ needle: 0.3 }), { s: 1.2 })}`),

  // diagrama, miolo 488x370: músculo no centro; glicose entrando de um vaso (alto à esquerda),
  // gasto de repouso saindo (baixo à esquerda), miocinas saindo (alto à direita), mitocôndria (baixo à direita).
  "03-parado": () => svg(488, 370, `
    ${stream({ from: [120, 95], to: [185, 160], ctrl: [140, 140], n: 7, rmin: 4, rmax: 8, tone: 3, seed: 54, spread: 6 })}
    ${stream({ from: [330, 150], to: [435, 72], ctrl: [400, 100], n: 8, rmin: 4, rmax: 8, tone: "mix", seed: 55, spread: 8 })}
    ${stream({ from: [160, 220], to: [60, 300], ctrl: [100, 240], n: 7, rmin: 4, rmax: 8, tone: 2, seed: 56, spread: 7 })}
    ${g(80, 70, vessel({ w: 130, h: 42, rbcs: 2 }), { r: -10 })}
    ${g(405, 300, mitochondrion(), { s: 0.4 })}
    ${g(244, 185, muscle({ w: 250, h: 92 }))}`),

  // diagrama café, miolo 488x370: dois caminhos. Esquerda, com força: músculo cheio, gordura sai.
  // Direita, sem força: músculo apagado e menor, gordura e músculo saem, metabolismo cai.
  "04-dois-caminhos": () => svg(488, 370, `
    <path d="M244,20 L244,350" stroke="${C.mol2}" stroke-width="2" stroke-dasharray="6 9" stroke-linecap="round" opacity="0.6"/>
    ${stream({ from: [125, 280], to: [40, 335], ctrl: [70, 330], n: 6, rmin: 4, rmax: 8, tone: 3, seed: 57, spread: 6, fade: true })}
    ${stream({ from: [365, 280], to: [450, 335], ctrl: [420, 330], n: 6, rmin: 4, rmax: 8, tone: 3, seed: 58, spread: 6, fade: true })}
    ${stream({ from: [400, 112], to: [462, 52], ctrl: [445, 90], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 59, spread: 6, fade: true })}
    ${g(125, 120, muscle({ w: 200, h: 74 }))}
    ${g(365, 120, muscle({ w: 150, h: 54, fill: "url(#gMuted)" }))}
    ${g(125, 270, fatCluster({ s: 0.42 }))}
    ${g(365, 270, fatCluster({ s: 0.42 }))}`),

  // texto, cena alta 888x440: caneta à esquerda, músculo à direita perdendo massa pra baixo.
  "05-caneta": () => svg(888, 440, `
    ${stream({ from: [700, 330], to: [830, 415], ctrl: [770, 405], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 60, spread: 6, fade: true })}
    ${g(240, 245, pen({ w: 360, h: 48, label: 1 }), { r: -25 })}
    ${g(650, 262, muscle({ w: 320, h: 118 }))}`),

  // texto café, cena alta 888x440: músculo (força), prato (proteína), lua (sono).
  "06-o-que-fazer": () => svg(888, 440, `
    ${g(220, 275, muscle({ w: 330, h: 115 }), { r: -12 })}
    ${g(500, 270, plate({ r: 108, portion: 0.75 }))}
    ${g(760, 178, moon({ r: 62 }))}`),
};
