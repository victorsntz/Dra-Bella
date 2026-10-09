import { C, g, svg, brain, fatCluster, stomach, scale, clock, moon, muscle, tree, stream } from "../parts.mjs";

// Regra de composição: a ilustração vive no miolo (fig.inset no JSON) e as etiquetas nas faixas
// em volta. Cada cena deixa vazio o canto onde uma etiqueta vai entrar.
export default {
  // capa, caixa de largura cheia 1080x930 (o título de 5 linhas ocupa a esquerda até ~x 800, y 24..455).
  // Cérebro em cima à direita, balança grande embaixo à direita, dois fluxos em arco fechando o circuito.
  "01-balanca-cerebro": () => svg(1080, 930, `
    ${stream({ from: [960, 300], to: [900, 575], ctrl: [1040, 450], n: 10, rmin: 5, rmax: 12, tone: 3, seed: 41, spread: 12 })}
    ${stream({ from: [800, 575], to: [880, 300], ctrl: [760, 440], n: 9, rmin: 5, rmax: 11, tone: 2, seed: 42, spread: 12 })}
    ${g(790, 60, brain({ hypothalamus: true }), { s: 1.3 })}
    ${g(580, 535, scale({ needle: 0.72 }), { s: 2.2 })}`),

  // texto (café) com dois parágrafos: cena alta 888x440. Cérebro à esquerda, balança à direita, ida e volta.
  "02-set-point": () => svg(888, 440, `
    ${stream({ from: [360, 190], to: [520, 175], ctrl: [440, 120], n: 7, rmin: 4, rmax: 9, tone: 3, seed: 43, spread: 9 })}
    ${stream({ from: [520, 330], to: [360, 320], ctrl: [440, 392], n: 7, rmin: 4, rmax: 9, tone: 2, seed: 44, spread: 9 })}
    ${g(10, 90, brain({ hypothalamus: true }), { s: 1.75 })}
    ${g(480, 130, scale({ needle: 0.7 }), { s: 1.8 })}`),

  // diagrama, miolo 488x370: cérebro no centro; gordura embaixo à esquerda (sinal fraco, esmaece),
  // estômago embaixo à direita (sinal forte).
  "03-sinais": () => svg(488, 370, `
    ${stream({ from: [95, 265], to: [225, 190], ctrl: [120, 180], n: 7, rmin: 4, rmax: 9, tone: 3, seed: 45, spread: 8, fade: true })}
    ${stream({ from: [385, 245], to: [275, 195], ctrl: [360, 160], n: 11, rmin: 5, rmax: 11, tone: 2, seed: 46, spread: 9 })}
    ${g(72, 298, fatCluster({ s: 0.62 }))}
    ${g(362, 232, stomach({ full: false }), { s: 0.72 })}
    ${g(120, 10, brain({ hypothalamus: true }), { s: 1.25 })}`),

  // texto (café) com dois parágrafos: cena alta 888x440. Relógio à esquerda, balança à direita.
  "04-tempo": () => svg(888, 440, `
    ${stream({ from: [375, 240], to: [500, 250], ctrl: [437, 300], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 47, spread: 7 })}
    ${g(230, 240, clock({ r: 135, h: 4 }))}
    ${g(470, 120, scale({ needle: 0.7 }), { s: 1.85 })}`),

  // diagrama, miolo 488x370: balança equilibrada embaixo à esquerda; músculo (cima esq.), lua (cima dir.)
  // e árvore pequena (baixo dir.) mandando fluxo pra ela.
  "05-protecao": () => svg(488, 370, `
    ${stream({ from: [112, 118], to: [112, 232], ctrl: [80, 175], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 48, spread: 7 })}
    ${stream({ from: [372, 118], to: [228, 246], ctrl: [330, 160], n: 8, rmin: 4, rmax: 8, tone: 1, seed: 49, spread: 7 })}
    ${stream({ from: [300, 292], to: [232, 292], ctrl: [266, 325], n: 5, rmin: 4, rmax: 8, tone: 3, seed: 50, spread: 6 })}
    ${g(112, 80, muscle({ w: 150, h: 54 }), { r: -12 })}
    ${g(415, 82, moon({ r: 38 }))}
    ${g(300, 205, tree(), { s: 0.42 })}
    ${g(10, 215, scale({ needle: 0.5 }))}`),

  // texto com dois parágrafos: cena alta 888x440. A Árvore inteira, frutos em cima e quatro raízes embaixo.
  "06-arvore": () => svg(888, 440, `
    ${g(234, 10, tree(), { s: 1.0 })}`),
};
