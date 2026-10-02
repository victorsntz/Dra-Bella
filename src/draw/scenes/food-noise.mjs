import { C, g, svg, brain, fatCluster, vessel, stream, stomach, pancreas, adrenalKidney, cytokines, loop, tree, ripples } from "../parts.mjs";

export default {
  // capa: 520 x 900. Cérebro grande com hipotálamo aceso, ondas saindo pra frente,
  // insulina e leptina subindo de baixo e esmaecendo antes de chegar.
  "01-cerebro-ruido": () => svg(520, 900, `
    ${g(418, 400, ripples({ n: 4, r0: 40, gap: 26, color: "#6F6356", sweep: 80 }))}
    ${stream({ from: [110, 800], to: [205, 560], ctrl: [120, 660], n: 9, rmin: 5, rmax: 11, tone: 2, seed: 21, spread: 14, fade: true })}
    ${stream({ from: [400, 800], to: [300, 570], ctrl: [400, 660], n: 9, rmin: 5, rmax: 11, tone: 3, seed: 22, spread: 14, fade: true })}
    ${g(40, 210, brain({ hypothalamus: true }), { s: 2.1 })}`),

  // texto (café): miolo 888 x 310. Estômago cheio à esquerda, cérebro à direita ainda emitindo.
  "02-estomago-cheio": () => svg(888, 310, `
    ${g(120, 60, stomach({ full: true }), { s: 1.0 })}
    ${g(770, 150, ripples({ n: 4, r0: 40, gap: 26, color: "#ABA597", sweep: 80 }))}
    ${g(440, 48, brain({ hypothalamus: true }), { s: 1.3 })}`),

  // diagrama: miolo 488 x 370. Cérebro com hipotálamo no centro; pâncreas e gordura embaixo,
  // mandando sinal que esmaece antes de chegar.
  "03-hipotalamo": () => svg(488, 370, `
    ${stream({ from: [90, 300], to: [215, 215], ctrl: [120, 230], n: 8, tone: 2, seed: 23, spread: 8, fade: true })}
    ${stream({ from: [400, 300], to: [275, 215], ctrl: [370, 230], n: 8, tone: 3, seed: 24, spread: 8, fade: true })}
    ${g(10, 320, pancreas(), { s: 0.55 })}
    ${g(420, 318, fatCluster({ s: 0.44 }))}
    ${g(70, 30, brain({ hypothalamus: true }), { s: 1.6 })}`),

  // diagrama: miolo 488 x 370. Três fontes à esquerda, um destino à direita (o hipotálamo).
  "04-tres-fontes": () => svg(488, 370, `
    ${stream({ from: [120, 62], to: [300, 150], ctrl: [220, 70], n: 8, tone: 1, seed: 25, spread: 7 })}
    ${stream({ from: [130, 185], to: [300, 185], ctrl: [215, 190], n: 8, tone: 2, seed: 26, spread: 7 })}
    ${stream({ from: [120, 308], to: [300, 220], ctrl: [220, 300], n: 8, tone: 3, seed: 27, spread: 7 })}
    ${g(70, 62, cytokines({ n: 9, tone: 1, seed: 3 }))}
    ${g(70, 185, vessel({ w: 110, h: 38, rbcs: 2 }), { r: -8 })}
    ${g(76, 185, cytokines({ n: 7, tone: 3, seed: 5 }), { s: 0.6 })}
    ${g(38, 232, adrenalKidney(), { s: 0.55 })}
    ${g(300, 100, brain({ hypothalamus: true }), { s: 1.0 })}`),

  // texto (café): miolo 888 x 310. Cérebro à esquerda, o ciclo da recompensa à direita.
  "05-ciclo-dopamina": () => svg(888, 310, `
    ${stream({ from: [330, 150], to: [520, 155], ctrl: [425, 130], n: 7, tone: 2, seed: 28, spread: 6 })}
    ${g(640, 155, loop({ r: 100, n: 20, tone: "mix", seed: 6 }))}
    ${g(60, 30, brain({ hypothalamus: true }), { s: 1.35 })}`),

  // texto: miolo 888 x 250 (faixa no topo e na base). A Árvore: frutos em cima, quatro raízes embaixo.
  "06-arvore": () => svg(420, 250, `
    ${g(80, -6, tree(), { s: 0.62 })}`),
};
