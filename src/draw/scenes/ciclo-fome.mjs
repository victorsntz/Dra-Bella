import { C, g, svg, brain, plate, cycle, moon, scale, stream, sphere } from "../parts.mjs";

export default {
  // capa 520x900: o ciclo grande no centro com a fase lútea ativa, lua pequena no alto, esferas soltas.
  "01-ciclo": () => svg(520, 900, `
    ${g(430, 120, moon({ r: 44 }))}
    ${g(275, 600, cycle({ r: 200, active: 2 }))}
    ${sphere(70, 470, 9, 2)}${sphere(130, 420, 6, 3)}${sphere(490, 400, 7, 2)}
    ${sphere(90, 820, 7, 3)}${sphere(480, 790, 9, 1)}${sphere(300, 860, 6, 2)}`),

  // texto café, cena alta 888x440: o ciclo à esquerda, progesterona subindo em arco pra direita.
  "02-fases": () => svg(888, 440, `
    ${stream({ from: [400, 300], to: [740, 150], ctrl: [560, 120], n: 11, rmin: 5, rmax: 11, tone: 3, seed: 61, spread: 10 })}
    ${g(230, 225, cycle({ r: 165, active: 2 }))}`),

  // diagrama, miolo 488x370: o ciclo no centro; fase folicular à direita... não: fase lútea ativa no lado direito.
  "03-duas-fases": () => svg(488, 370, `
    ${g(244, 185, cycle({ r: 145, active: 1 }))}`),

  // diagrama café, miolo 488x370: cérebro à esquerda, prato à direita, carboidrato subindo em arco pro cérebro.
  "04-doce": () => svg(488, 370, `
    ${stream({ from: [370, 250], to: [230, 160], ctrl: [340, 120], n: 9, rmin: 4, rmax: 9, tone: 3, seed: 62, spread: 8 })}
    ${g(380, 265, plate({ r: 70, portion: 0.75 }))}
    ${g(10, 50, brain({ hypothalamus: true }), { s: 1.18 })}`),

  // texto, cena alta 888x440: balança grande à esquerda, ciclo pequeno à direita.
  "05-retencao": () => svg(888, 440, `
    ${g(80, 90, scale({ needle: 0.68 }), { s: 1.9 })}
    ${g(700, 230, cycle({ r: 110, active: 2 }))}`),

  // texto café, cena alta 888x440: ciclo, lua e prato lado a lado.
  "06-semana": () => svg(888, 440, `
    ${g(170, 240, cycle({ r: 130, active: 2 }))}
    ${g(450, 230, moon({ r: 80 }))}
    ${g(730, 240, plate({ r: 125, portion: 0.8 }))}`),
};
