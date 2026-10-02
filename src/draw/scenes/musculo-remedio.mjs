import { C, g, svg, muscle, brain, liver, fatCluster, vessel, mitochondrion, fiberWithSatellite, stream, runner } from "../parts.mjs";

// Regra de composição: a ilustração vive no miolo (fig.inset no JSON) e as etiquetas nas faixas
// em volta. Cada cena deixa vazio o canto onde uma etiqueta vai entrar.
export default {
  // capa: miolo 520 x 900, etiquetas nas laterais da figura
  "01-corpo-correndo": () => svg(520, 900, `
    ${stream({ from: [330, 250], to: [470, 120], ctrl: [430, 150], n: 7, rmin: 4, rmax: 9, tone: "mix", seed: 3, spread: 18 })}
    ${stream({ from: [300, 520], to: [470, 640], ctrl: [360, 640], n: 8, rmin: 4, rmax: 9, tone: "mix", seed: 5, spread: 20 })}
    ${stream({ from: [230, 330], to: [60, 420], ctrl: [120, 330], n: 7, rmin: 4, rmax: 8, tone: "mix", seed: 8, spread: 16 })}
    ${runner()}`),

  // diagrama: miolo 488 x 370 (colunas de 200 px de cada lado pras etiquetas; topo e base centrais livres)
  "02-musculo-central": () => svg(488, 370, `
    ${stream({ from: [160, 160], to: [95, 100], ctrl: [120, 110], n: 6, tone: 3, seed: 1, spread: 8 })}
    ${stream({ from: [330, 160], to: [395, 100], ctrl: [370, 110], n: 6, tone: 1, seed: 3, spread: 8 })}
    ${stream({ from: [160, 210], to: [95, 275], ctrl: [120, 265], n: 6, tone: 2, seed: 4, spread: 8 })}
    ${stream({ from: [330, 210], to: [395, 275], ctrl: [370, 265], n: 6, tone: "mix", seed: 5, spread: 8 })}
    ${stream({ from: [360, 185], to: [440, 185], ctrl: [400, 178], n: 5, tone: 2, seed: 6, spread: 6 })}
    ${stream({ from: [128, 185], to: [48, 185], ctrl: [88, 178], n: 5, tone: 3, seed: 7, spread: 6 })}
    ${g(62, 72, fatCluster({ s: 0.46 }))}
    ${g(372, 28, brain(), { s: 0.5 })}
    ${g(8, 268, liver(), { s: 0.44 })}
    ${g(424, 300, vessel({ w: 120, h: 40, rbcs: 3 }), { r: -14 })}
    ${g(458, 185, mitochondrion(), { s: 0.26 })}
    ${g(244, 185, muscle({ w: 232, h: 86 }))}`),

  // texto: miolo 888 x 380 (faixa de 70 px no topo pras etiquetas)
  "03-cerebro": () => svg(888, 380, `
    ${stream({ from: [230, 210], to: [470, 120], ctrl: [330, 100], n: 12, rmin: 4, rmax: 10, tone: "mix", seed: 7, spread: 16 })}
    ${g(60, 70, runner({ muted: true }), { s: 0.32 })}
    ${g(400, 10, brain({ neurons: true }), { s: 2.0 })}`),

  // diagrama: miolo 508 x 370 (colunas de 190 px)
  "04-gordura-mitocondria": () => svg(508, 370, `
    ${stream({ from: [170, 150], to: [110, 100], ctrl: [140, 105], n: 6, tone: 3, seed: 9, spread: 8 })}
    ${stream({ from: [170, 230], to: [110, 280], ctrl: [140, 285], n: 6, tone: 1, seed: 10, spread: 8 })}
    ${stream({ from: [340, 230], to: [400, 285], ctrl: [370, 290], n: 6, tone: 2, seed: 11, spread: 8 })}
    ${stream({ from: [340, 150], to: [400, 95], ctrl: [370, 100], n: 6, tone: 3, seed: 12, spread: 8 })}
    ${g(70, 72, fatCluster({ s: 0.48 }))}
    ${g(72, 300, mitochondrion(), { s: 0.46 })}
    ${g(432, 302, fiberWithSatellite({ w: 150, h: 46 }), { r: -10 })}
    ${g(438, 70, fatCluster({ s: 0.34 }))}
    ${g(254, 190, muscle({ w: 250, h: 94, cut: true }))}`),

  // texto: miolo 718 x 370 (faixa de 70 no topo, coluna de 170 à direita)
  "05-inflamacao": () => svg(718, 370, `
    ${stream({ from: [290, 160], to: [560, 70], ctrl: [420, 70], n: 10, tone: 1, seed: 13, spread: 10 })}
    ${stream({ from: [300, 195], to: [540, 190], ctrl: [420, 190], n: 9, tone: 2, seed: 14, spread: 10 })}
    ${stream({ from: [290, 230], to: [560, 320], ctrl: [420, 320], n: 10, tone: 3, seed: 15, spread: 10 })}
    ${g(620, 70, fatCluster({ s: 0.5 }))}
    ${g(540, 142, liver(), { s: 0.62 })}
    ${g(630, 322, vessel({ w: 170, h: 54, rbcs: 4 }), { r: -8 })}
    ${g(160, 200, muscle({ w: 240, h: 90 }), { r: -22 })}`),

  // texto: miolo 888 x 380 (faixa de 70 no topo)
  "06-figado-vaso": () => svg(888, 380, `
    ${stream({ from: [360, 150], to: [600, 100], ctrl: [470, 90], n: 10, tone: 1, seed: 16 })}
    ${stream({ from: [360, 230], to: [560, 310], ctrl: [450, 310], n: 10, tone: 3, seed: 17 })}
    ${g(590, 30, liver(), { s: 1.05 })}
    ${g(690, 300, vessel({ w: 280, h: 84, rbcs: 7 }), { r: -12 })}
    ${g(220, 195, muscle({ w: 290, h: 110, cut: true }), { r: -16 })}`),
};
