import { C, g, svg, muscle, brain, liver, fatCluster, vessel, mitochondrion, fiberWithSatellite, stream, runner } from "../parts.mjs";

export default {
  // capa: 520 x 900
  "01-corpo-correndo": () => svg(520, 900, `
    ${stream({ from: [330, 250], to: [470, 120], ctrl: [430, 150], n: 7, rmin: 4, rmax: 9, tone: "mix", seed: 3, spread: 18 })}
    ${stream({ from: [300, 520], to: [470, 640], ctrl: [360, 640], n: 8, rmin: 4, rmax: 9, tone: "mix", seed: 5, spread: 20 })}
    ${stream({ from: [230, 330], to: [60, 420], ctrl: [120, 330], n: 7, rmin: 4, rmax: 8, tone: "mix", seed: 8, spread: 16 })}
    ${runner()}`),

  // diagrama: 888 x 390
  "02-musculo-central": () => svg(888, 390, `
    ${stream({ from: [330, 170], to: [150, 110], ctrl: [250, 100], n: 9, tone: 3, seed: 1 })}
    ${stream({ from: [444, 150], to: [444, 60], ctrl: [444, 110], n: 6, tone: 1, seed: 2, spread: 10 })}
    ${stream({ from: [560, 170], to: [740, 100], ctrl: [640, 100], n: 9, tone: 1, seed: 3 })}
    ${stream({ from: [330, 230], to: [150, 310], ctrl: [250, 300], n: 9, tone: 2, seed: 4 })}
    ${stream({ from: [560, 230], to: [740, 310], ctrl: [640, 300], n: 9, tone: "mix", seed: 5 })}
    ${stream({ from: [600, 200], to: [790, 205], ctrl: [700, 190], n: 7, tone: 2, seed: 6, spread: 10 })}
    ${g(110, 90, fatCluster({ s: 0.62 }))}
    ${g(680, 22, brain(), { s: 0.7 })}
    ${g(40, 270, liver(), { s: 0.6 })}
    ${g(770, 318, vessel({ w: 170, h: 54, rbcs: 4 }), { r: -14 })}
    ${g(820, 206, mitochondrion(), { s: 0.42 })}
    ${g(444, 200, muscle({ w: 300, h: 112 }))}`),

  // texto: 888 x 450
  "03-cerebro": () => svg(888, 450, `
    ${stream({ from: [230, 250], to: [470, 160], ctrl: [330, 140], n: 12, rmin: 4, rmax: 10, tone: "mix", seed: 7, spread: 16 })}
    ${g(60, 100, runner({ muted: true }), { s: 0.34 })}
    ${g(400, 30, brain({ neurons: true }), { s: 2.1 })}`),

  // diagrama: 888 x 390
  "04-gordura-mitocondria": () => svg(888, 390, `
    ${stream({ from: [330, 150], to: [200, 90], ctrl: [280, 90], n: 7, tone: 3, seed: 9 })}
    ${stream({ from: [330, 250], to: [210, 300], ctrl: [280, 310], n: 7, tone: 1, seed: 10 })}
    ${stream({ from: [560, 250], to: [690, 320], ctrl: [620, 330], n: 7, tone: 2, seed: 11 })}
    ${stream({ from: [560, 150], to: [700, 90], ctrl: [630, 90], n: 7, tone: 3, seed: 12 })}
    ${g(130, 90, fatCluster({ s: 0.66 }))}
    ${g(150, 300, mitochondrion(), { s: 0.62 })}
    ${g(745, 332, fiberWithSatellite({ w: 210, h: 60 }), { r: -10 })}
    ${g(760, 70, fatCluster({ s: 0.42 }))}
    ${g(444, 200, muscle({ w: 330, h: 120, cut: true }))}`),

  // texto: 888 x 450
  "05-inflamacao": () => svg(888, 450, `
    ${stream({ from: [330, 180], to: [640, 90], ctrl: [470, 90], n: 11, tone: 1, seed: 13 })}
    ${stream({ from: [340, 225], to: [630, 225], ctrl: [480, 225], n: 10, tone: 2, seed: 14, spread: 12 })}
    ${stream({ from: [330, 270], to: [620, 370], ctrl: [470, 370], n: 11, tone: 3, seed: 15 })}
    ${g(730, 90, fatCluster({ s: 0.62 }))}
    ${g(640, 170, liver(), { s: 0.78 })}
    ${g(740, 380, vessel({ w: 220, h: 64, rbcs: 5 }), { r: -8 })}
    ${g(190, 225, muscle({ w: 280, h: 104 }), { r: -22 })}`),

  // texto: 888 x 450
  "06-figado-vaso": () => svg(888, 450, `
    ${stream({ from: [360, 180], to: [600, 120], ctrl: [470, 110], n: 10, tone: 1, seed: 16 })}
    ${stream({ from: [360, 260], to: [560, 350], ctrl: [450, 350], n: 10, tone: 3, seed: 17 })}
    ${g(590, 50, liver(), { s: 1.15 })}
    ${g(690, 350, vessel({ w: 300, h: 90, rbcs: 7 }), { r: -12 })}
    ${g(220, 225, muscle({ w: 300, h: 116, cut: true }), { r: -16 })}`),
};
