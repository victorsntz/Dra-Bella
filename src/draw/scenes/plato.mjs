import { C, g, svg, scale, clock, brain, stomach, fatCluster, vessel, muscle, plate, tree, stream, sphere } from "../parts.mjs";

// O canto superior esquerdo da capa (x < 180, y < 360) fica vazio: é onde o título passa.
export default {
  // capa 520x900: balança grande com o ponteiro no meio, relógio pequeno, esferas paradas em linha
  "01-balanca-parou": () => svg(520, 900, `
    ${g(380, 190, clock({ r: 62, h: 8 }))}
    ${g(40, 330, scale({ needle: 0.5 }), { s: 2.0 })}
    <g>${[[80, 730, 9, 2], [150, 736, 7, 3], [222, 728, 10, 2], [296, 735, 8, 1], [368, 730, 9, 3], [440, 736, 7, 2]].map(([x, y, r, t]) => sphere(x, y, r, t)).join("")}</g>`),

  // texto café, cena alta 888x440: balança à esquerda, relógio grande à direita
  "02-esperado": () => svg(888, 440, `
    ${g(110, 110, scale({ needle: 0.5 }), { s: 1.55 })}
    ${g(680, 240, clock({ r: 125, h: 7 }))}
    <g>${[[470, 250, 7, 2], [500, 262, 6, 3], [532, 254, 7, 2]].map(([x, y, r, t]) => sphere(x, y, r, t)).join("")}</g>`),

  // diagrama, miolo 488x370: cérebro no centro recebendo menos leptina da gordura; estômago e vaso embaixo
  "03-o-que-acontece": () => svg(488, 370, `
    ${stream({ from: [95, 120], to: [235, 160], ctrl: [160, 110], n: 8, tone: 3, seed: 61, spread: 7, fade: true })}
    ${stream({ from: [110, 275], to: [230, 205], ctrl: [160, 215], n: 8, tone: 2, seed: 62, spread: 7 })}
    ${g(62, 108, fatCluster({ s: 0.5 }))}
    ${g(18, 236, stomach(), { s: 0.62 })}
    ${g(398, 300, vessel({ w: 160, h: 52, rbcs: 3 }), { r: -10 })}
    ${g(170, 50, brain({ hypothalamus: true }), { s: 0.98 })}`),

  // diagrama café, miolo 488x370: balança no centro, músculo à esquerda, gordura à direita
  "04-balanca-x-corpo": () => svg(488, 370, `
    ${g(110, 84, muscle({ w: 150, h: 56 }), { r: -14 })}
    ${g(392, 90, fatCluster({ s: 0.6 }))}
    ${g(107, 150, scale({ needle: 0.5 }), { s: 1.25 })}`),

  // texto, cena alta 888x440: prato com porção pequena, músculo apagado e menor ao lado
  "05-cortar-mais": () => svg(888, 440, `
    ${g(250, 220, plate({ r: 150, portion: 0.22 }))}
    ${g(670, 250, muscle({ w: 250, h: 86, fill: "url(#gMuted)" }), { r: -16 })}`),

  // texto café, cena alta 888x440: a Árvore grande
  "06-o-que-fazer": () => svg(888, 440, `
    ${g(260, -40, tree(), { s: 1.25 })}`),
};
