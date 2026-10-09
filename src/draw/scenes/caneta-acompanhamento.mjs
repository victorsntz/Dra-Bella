import { C, g, svg, pen, scale, brain, stomach, muscle, plate, moon, intestine, tree, ripples, stream, sphere } from "../parts.mjs";

// O canto superior esquerdo da capa (x < 180, y < 360) fica vazio: é onde o título passa.
export default {
  // capa 520x900: caneta grande inclinada, esferas saindo da ponta, balança embaixo
  "01-caneta-balanca": () => svg(520, 900, `
    ${stream({ from: [490, 200], to: [380, 40], ctrl: [510, 70], n: 9, rmin: 5, rmax: 11, tone: "mix", seed: 51, spread: 14 })}
    ${g(330, 335, pen({ w: 400, h: 48, label: 2 }), { r: -34 })}
    ${g(90, 560, scale({ needle: 0.68 }), { s: 1.75 })}`),

  // texto café, cena alta 888x440: caneta à esquerda, cérebro com hipotálamo à direita, ondas menores
  "02-caneta-cerebro": () => svg(888, 440, `
    ${stream({ from: [320, 200], to: [600, 240], ctrl: [450, 130], n: 9, rmin: 4, rmax: 9, tone: 2, seed: 52, spread: 10 })}
    ${g(190, 250, pen({ w: 300, h: 40, label: 2 }), { r: -24 })}
    ${g(792, 215, ripples({ n: 3, r0: 26, gap: 18, color: "#ABA597", sweep: 70 }))}
    ${g(410, 40, brain({ hypothalamus: true }), { s: 1.85 })}`),

  // diagrama, miolo 488x370: caneta no topo, estômago à esquerda, cérebro à direita, fluxos descendo
  "03-o-que-faz": () => svg(488, 370, `
    ${stream({ from: [200, 68], to: [120, 160], ctrl: [120, 80], n: 8, tone: 2, seed: 53, spread: 7 })}
    ${stream({ from: [290, 68], to: [360, 170], ctrl: [370, 80], n: 8, tone: 1, seed: 54, spread: 7 })}
    ${g(244, 44, pen({ w: 200, h: 28, label: 2 }))}
    ${g(30, 160, stomach({ full: true }), { s: 1.0 })}
    ${g(430, 250, ripples({ n: 3, r0: 18, gap: 13, color: "#ABA597", sweep: 70 }))}
    ${g(250, 170, brain({ hypothalamus: true }), { s: 0.86 })}`),

  // diagrama café, miolo 488x370: músculo apagado, prato, lua e intestino, cada um num canto
  "04-o-que-nao-faz": () => svg(488, 370, `
    ${g(118, 96, muscle({ w: 190, h: 68, fill: "url(#gMuted)" }), { r: -14 })}
    ${g(120, 282, plate({ r: 72, portion: 0.5 }))}
    ${g(372, 90, moon({ r: 52 }))}
    ${g(284, 212, intestine(), { s: 0.72 })}`),

  // texto, cena alta 888x440: caneta pequena esmaecida, sinal subindo, balança com ponteiro alto
  "05-quando-para": () => svg(888, 440, `
    <g opacity="0.45">${g(170, 340, pen({ w: 260, h: 34, label: 2 }), { r: -22 })}</g>
    ${stream({ from: [270, 270], to: [430, 90], ctrl: [240, 90], n: 10, rmin: 4, rmax: 10, tone: 2, seed: 55, spread: 10 })}
    ${g(450, 115, scale({ needle: 0.82 }), { s: 1.9 })}`),

  // texto café, cena alta 888x440: a Árvore grande e, pequena, a caneta como ferramenta ao lado
  "06-metodo": () => svg(888, 440, `
    ${g(260, -40, tree(), { s: 1.25 })}
    ${g(740, 330, pen({ w: 170, h: 26, label: 2 }), { r: -32 })}`),
};
