import { C, g, svg, brain, fatCluster, vessel, stream, stomach, pancreas, adrenalKidney, cytokines, loop, tree, ripples } from "../parts.mjs";

export default {
  // capa: 520 x 900. Cérebro grande com hipotálamo aceso, ondas saindo pra frente,
  // insulina e leptina subindo de baixo e esmaecendo antes de chegar.
  "01-cerebro-ruido": () => svg(520, 900, `
    ${g(418, 400, ripples({ n: 4, r0: 40, gap: 26, color: "#6F6356", sweep: 80 }))}
    ${stream({ from: [110, 800], to: [205, 560], ctrl: [120, 660], n: 9, rmin: 5, rmax: 11, tone: 2, seed: 21, spread: 14, fade: true })}
    ${stream({ from: [400, 800], to: [300, 570], ctrl: [400, 660], n: 9, rmin: 5, rmax: 11, tone: 3, seed: 22, spread: 14, fade: true })}
    ${g(40, 210, brain({ hypothalamus: true }), { s: 2.1 })}`),

  // texto (café) com pouco texto: a cena cresce pra ocupar o espaço (miolo 888 x 520).
  "02-estomago-cheio": () => svg(888, 440, `
    ${g(70, 24, stomach({ full: true }), { s: 1.75 })}
    ${g(742, 190, ripples({ n: 4, r0: 50, gap: 30, color: "#ABA597", sweep: 80 }))}
    ${g(330, 12, brain({ hypothalamus: true }), { s: 2.0 })}`),

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
    ${stream({ from: [120, 62], to: [268, 150], ctrl: [200, 70], n: 8, tone: 1, seed: 25, spread: 7 })}
    ${stream({ from: [130, 185], to: [268, 185], ctrl: [200, 190], n: 8, tone: 2, seed: 26, spread: 7 })}
    ${stream({ from: [120, 308], to: [268, 220], ctrl: [200, 300], n: 8, tone: 3, seed: 27, spread: 7 })}
    ${g(70, 62, cytokines({ n: 9, tone: 1, seed: 3 }))}
    ${g(70, 185, vessel({ w: 110, h: 38, rbcs: 2 }), { r: -8 })}
    ${g(76, 185, cytokines({ n: 7, tone: 3, seed: 5 }), { s: 0.6 })}
    ${g(38, 232, adrenalKidney(), { s: 0.55 })}
    ${g(262, 100, brain({ hypothalamus: true }), { s: 1.0 })}`),

  // texto (café) com pouco texto: cena alta (888 x 520). Cérebro à esquerda, o ciclo da recompensa à direita.
  "05-ciclo-dopamina": () => svg(888, 400, `
    ${stream({ from: [400, 200], to: [520, 202], ctrl: [460, 180], n: 6, tone: 2, seed: 28, spread: 6 })}
    ${g(680, 202, loop({ r: 150, n: 24, tone: "mix", seed: 6 }))}
    ${g(20, 30, brain({ hypothalamus: true }), { s: 1.9 })}`),

  // texto: miolo 888 x 250 (faixa no topo e na base). A Árvore: frutos em cima, quatro raízes embaixo.
  "06-arvore": () => svg(420, 250, `
    ${g(80, -6, tree(), { s: 0.62 })}`),
};
