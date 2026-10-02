import { C, g, svg, brain, liver, fatCluster, fatClusterFibrotic, vessel, muscle, stream, pancreas, cytokines, legs, cellReceptors, pen } from "../parts.mjs";

export default {
  // capa 520x900: pernas com lipedema, adipócito fibrótico em destaque
  "01-pernas-lipedema": () => svg(520, 900, `
    ${g(60, 40, legs({ lipedema: true }), { s: 1.5 })}
    ${stream({ from: [230, 620], to: [160, 660], ctrl: [200, 620], n: 5, rmin: 3, rmax: 6, tone: 1, seed: 31, spread: 5 })}
    ${g(100, 740, fatClusterFibrotic({ s: 1.1 }))}`),

  // texto café, cena alta 888x440: adipócito saudável x adipócito do lipedema
  "02-tecido": () => svg(888, 440, `
    ${g(230, 220, fatCluster({ s: 1.35 }))}
    ${g(650, 220, fatClusterFibrotic({ s: 1.35 }))}
    ${g(444, 130, cytokines({ n: 7, tone: 1, seed: 8 }), { s: 0.9 })}`),

  // diagrama, miolo 488x370: célula com três receptores
  "03-tres-chaves": () => svg(488, 370, `
    ${g(34, 90, cellReceptors({ keys: [1, 2, 3] }))}
    ${g(60, 20, brain(), { s: 0.36 })}
    ${g(380, 10, fatCluster({ s: 0.36 }))}
    ${g(230, 300, liver(), { s: 0.34 })}`),

  // texto, 888x380 (faixa no topo): caneta → GIP → gordura acalmando
  "04-mounjaro": () => svg(888, 380, `
    ${g(160, 190, pen({ w: 240, h: 34, label: 2 }), { r: -30 })}
    ${stream({ from: [300, 150], to: [560, 190], ctrl: [430, 120], n: 9, tone: 2, seed: 32, spread: 8 })}
    ${g(660, 190, fatCluster({ s: 1.1 }))}
    ${g(520, 300, cytokines({ n: 6, tone: 1, seed: 9 }), { s: 0.7 })}`),

  // diagrama, miolo 488x370: glucagon puxando gordura do fígado, do tronco, da visceral
  "05-glucagon": () => svg(488, 370, `
    ${stream({ from: [244, 150], to: [100, 70], ctrl: [170, 70], n: 8, tone: 3, seed: 33, spread: 7 })}
    ${stream({ from: [244, 150], to: [390, 70], ctrl: [320, 70], n: 8, tone: 3, seed: 34, spread: 7 })}
    ${stream({ from: [244, 230], to: [120, 310], ctrl: [180, 320], n: 8, tone: 3, seed: 35, spread: 7 })}
    ${stream({ from: [244, 230], to: [380, 310], ctrl: [320, 320], n: 8, tone: 3, seed: 36, spread: 7 })}
    ${g(20, 20, liver(), { s: 0.5 })}
    ${g(400, 60, fatCluster({ s: 0.42 }))}
    ${g(110, 310, muscle({ w: 150, h: 54 }), { r: -10 })}
    ${g(380, 310, vessel({ w: 120, h: 40, rbcs: 3 }), { r: -10 })}
    ${g(244, 190, pen({ w: 170, h: 30, label: 3 }), { r: -90 })}`),

  // texto café, 888x380 (faixa no topo): o que foi estudado (visceral) x o que não foi (subcutâneo nas pernas)
  "06-estudo": () => svg(888, 380, `
    ${g(230, 200, fatCluster({ s: 1.2 }))}
    ${g(600, 20, legs({ lipedema: true }), { s: 0.62 })}`),
};
