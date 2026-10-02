import { C, g, svg, brain, pancreas, fatCluster, liver, intestine, cellReceptors, pen, stream } from "../parts.mjs";

export default {
  // capa 520x900: três canetas em escada e a célula com os receptores
  "01-tres-canetas": () => svg(520, 900, `
    ${g(260, 200, pen({ w: 220, h: 30, label: 1 }), { r: -18 })}
    ${g(260, 330, pen({ w: 300, h: 34, label: 2 }), { r: -18 })}
    ${g(260, 470, pen({ w: 380, h: 38, label: 3 }), { r: -18 })}
    ${g(50, 600, cellReceptors({ keys: [1, 2, 3] }))}`),

  // texto café, 888x440: intestino solta hormônios pro cérebro, pâncreas e gordura
  "02-hormonios": () => svg(888, 440, `
    ${stream({ from: [330, 180], to: [600, 70], ctrl: [460, 60], n: 9, tone: 1, seed: 41, spread: 8 })}
    ${stream({ from: [340, 230], to: [600, 230], ctrl: [470, 240], n: 9, tone: 2, seed: 42, spread: 8 })}
    ${stream({ from: [330, 280], to: [600, 380], ctrl: [460, 390], n: 9, tone: 3, seed: 43, spread: 8 })}
    ${g(60, 130, intestine(), { s: 1.15 })}
    ${g(640, 10, brain(), { s: 0.6 })}
    ${g(630, 205, pancreas(), { s: 0.8 })}
    ${g(720, 380, fatCluster({ s: 0.55 }))}`),

  // diagramas, miolo 488x370: célula com 1, 2 e 3 chaves
  "03-uma-chave": () => svg(488, 370, `${g(34, 80, cellReceptors({ keys: [1] }))}${g(60, 10, brain(), { s: 0.36 })}`),
  "04-duas-chaves": () => svg(488, 370, `${g(34, 80, cellReceptors({ keys: [1, 2] }))}${g(60, 10, brain(), { s: 0.36 })}${g(400, 40, fatCluster({ s: 0.36 }))}`),
  "05-tres-chaves": () => svg(488, 370, `${g(34, 80, cellReceptors({ keys: [1, 2, 3] }))}${g(60, 10, brain(), { s: 0.36 })}${g(400, 40, fatCluster({ s: 0.36 }))}${g(190, 300, liver(), { s: 0.34 })}`),

  // texto, 888x380: as três canetas lado a lado, mesma escala
  "06-escolha": () => svg(888, 380, `
    ${g(444, 90, pen({ w: 260, h: 32, label: 1 }))}
    ${g(444, 190, pen({ w: 340, h: 36, label: 2 }))}
    ${g(444, 300, pen({ w: 420, h: 40, label: 3 }))}`),
};
