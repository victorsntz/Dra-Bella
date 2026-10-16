import { g, svg, hormoneChart, testoChart, cycle, muscle, plate, moon } from "../parts.mjs";

// Curvas esquemáticas, não dosagens. Eixos e nomes vão como etiquetas HTML (ver content/ciclo-ele-ela.json).
export default {
  // capa: figura de largura cheia 888 x 470. Em cima o ciclo dele (a mesma onda todo dia),
  // embaixo o dela (quatro hormônios em 28 dias).
  "01-ele-ela": () => svg(888, 470, `
    ${testoChart({ w: 888, h: 150 })}
    ${g(0, 190, hormoneChart({ w: 888, h: 280 }))}`),

  // texto café, 888 x 300: um dia de testosterona, pico de manhã, vale à noite.
  "02-um-dia": () => svg(888, 420, `
    ${testoChart({ w: 888, h: 420, mode: "day", dark: true })}`),

  // diagrama, 888 x 310: os quatro hormônios do ciclo, com a linha da ovulação.
  "03-quatro-hormonios": () => svg(888, 310, `
    ${hormoneChart({ w: 888, h: 310 })}`),

  // texto café, 888 x 380: o ciclo com as quatro fases marcadas em faixa.
  "04-fases": () => svg(888, 380, `
    ${g(0, 40, hormoneChart({ w: 888, h: 340, dark: true, bands: [
      { from: 1, to: 5, tone: 1 }, { from: 6, to: 12.6, tone: 4 }, { from: 12.8, to: 15.2, tone: 2 }, { from: 15.4, to: 28, tone: 3 }] }))}`),

  // diagrama, 888 x 310: a onda dele (onde a regra foi testada) sobre as curvas dela (onde é aplicada).
  "05-pesquisa": () => svg(888, 310, `
    ${testoChart({ w: 888, h: 120 })}
    ${g(0, 140, hormoneChart({ w: 888, h: 170, areas: false }))}`),

  // texto café, 888 x 420: o ciclo no meio, músculo (treino) de um lado, prato (comida) do outro.
  "06-plano": () => svg(888, 420, `
    ${g(150, 240, muscle({ w: 240, h: 84, fibers: 7 }))}
    ${g(444, 240, cycle({ r: 120, active: 2 }))}
    ${g(444, 240, moon({ r: 36, stars: false }))}
    ${g(740, 240, plate({ r: 100, portion: 0.7 }))}`),
};
