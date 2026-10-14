import { g, svg, gutLong, intestine, skinPatch, stream, cytokines, vessel, plate, sun, sphere } from "../parts.mjs";

export default {
  // capa: 520 x 900. Intestino comprido serpenteando de cima a baixo (como na referência),
  // corte de pele pequeno no alto à direita recebendo um fluxo que sobe do intestino.
  "01-intestino-pele": () => svg(520, 900, `
    ${stream({ from: [300, 330], to: [380, 130], ctrl: [420, 260], n: 9, rmin: 5, rmax: 10, tone: 1, seed: 61, spread: 10 })}
    ${g(300, 50, skinPatch({ w: 190, h: 110, fibers: 4 }))}
    ${g(20, 60, gutLong())}
    ${g(400, 600, cytokines({ n: 8, tone: 1, seed: 25 }), { s: 1.1 })}`),

  // texto café, cena alta 888 x 440: corte de pele grande em cima, intestino e vaso embaixo mandando fluxo.
  "02-por-dentro": () => svg(888, 440, `
    ${stream({ from: [230, 400], to: [330, 250], ctrl: [200, 310], n: 8, rmin: 5, rmax: 10, tone: 2, seed: 62, spread: 10 })}
    ${stream({ from: [680, 400], to: [580, 250], ctrl: [720, 310], n: 8, rmin: 5, rmax: 10, tone: 1, seed: 63, spread: 10 })}
    ${g(220, 40, skinPatch({ w: 460, h: 210, fibers: 6 }))}
    ${g(30, 290, intestine(), { s: 0.78 })}
    ${g(730, 380, vessel({ w: 250, h: 64, rbcs: 4 }), { r: -12 })}`),

  // diagrama: miolo 488 x 370. Corte de pele com fibras cortadas e açúcar grudado; citocinas por cima.
  "03-colageno": () => svg(488, 370, `
    ${g(70, 20, cytokines({ n: 9, tone: 1, seed: 26 }), { s: 1.0 })}
    ${stream({ from: [110, 40], to: [180, 140], ctrl: [100, 110], n: 6, rmin: 4, rmax: 8, tone: 1, seed: 64, spread: 8 })}
    ${g(60, 110, skinPatch({ w: 370, h: 220, fibers: 5, broken: true, glycated: true }))}`),

  // diagrama café: miolo 488 x 370. Intestino com bactérias à esquerda, fluxo em arco até a pele à direita.
  "04-eixo": () => svg(488, 370, `
    ${stream({ from: [190, 200], to: [320, 130], ctrl: [250, 90], n: 9, rmin: 5, rmax: 10, tone: 1, seed: 65, spread: 10 })}
    ${g(10, 150, intestine(), { s: 0.85 })}
    ${g(90, 200, cytokines({ n: 7, tone: 2, seed: 27 }), { s: 0.8 })}
    ${g(150, 300, cytokines({ n: 6, tone: 3, seed: 28 }), { s: 0.8 })}
    ${g(300, 60, skinPatch({ w: 180, h: 130, fibers: 4 }))}`),

  // texto claro, cena alta 888 x 440: prato com açúcar, vaso no meio, pele à direita.
  "05-acucar": () => svg(888, 440, `
    ${g(150, 250, plate({ r: 100, portion: 0.99 }))}
    ${[[120, 230], [160, 270], [185, 225], [140, 290]].map(([x, y]) => sphere(x, y, 9, 3)).join("")}
    ${stream({ from: [250, 250], to: [340, 250], ctrl: [295, 210], n: 6, rmin: 5, rmax: 9, tone: 3, seed: 66, spread: 6 })}
    ${g(450, 250, vessel({ w: 220, h: 60, rbcs: 3 }))}
    ${stream({ from: [560, 250], to: [650, 250], ctrl: [605, 210], n: 6, rmin: 5, rmax: 9, tone: 2, seed: 67, spread: 6 })}
    ${g(650, 170, skinPatch({ w: 210, h: 150, fibers: 4 }))}`),

  // diagrama café: miolo 488 x 370. Prato cheio no centro, fluxos saindo pra pele (alto) e intestino (baixo).
  "06-nutrientes": () => svg(488, 370, `
    ${stream({ from: [244, 120], to: [340, 70], ctrl: [300, 70], n: 6, rmin: 4, rmax: 8, tone: 1, seed: 68, spread: 6 })}
    ${stream({ from: [244, 280], to: [150, 320], ctrl: [190, 320], n: 6, rmin: 4, rmax: 8, tone: 3, seed: 69, spread: 6 })}
    ${g(244, 200, plate({ r: 90, portion: 0.99 }))}
    ${g(330, 20, skinPatch({ w: 150, h: 100, fibers: 3 }))}
    ${g(10, 270, intestine(), { s: 0.5 })}`),

  // texto claro, cena alta 888 x 440: prato cheio à esquerda, sol à direita, pele pequena entre os dois.
  "07-prato-sol": () => svg(888, 440, `
    ${g(170, 250, plate({ r: 130, portion: 0.99 }))}
    ${g(340, 170, skinPatch({ w: 240, h: 160, fibers: 5 }))}
    ${g(720, 240, sun({ r: 85, rays: 12 }))}`),
};
