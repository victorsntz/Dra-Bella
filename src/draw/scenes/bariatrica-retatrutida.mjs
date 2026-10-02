import { C, g, svg, stomach, stomachSleeve, pen, stream, tree, cellReceptors, liver, brain } from "../parts.mjs";

export default {
  // capa 520x900: estômago com sleeve e a caneta ao lado
  "01-sleeve-caneta": () => svg(520, 900, `
    ${g(60, 160, stomachSleeve(), { s: 2.1 })}
    ${g(330, 720, pen({ w: 300, h: 40, label: 3 }), { r: -32 })}`),

  // texto, 888x380: estômago com sleeve "encolhendo": três estômagos em escala decrescente
  "02-queda-eua": () => svg(888, 380, `
    ${g(60, 40, stomachSleeve(), { s: 1.6 })}
    ${g(400, 110, stomachSleeve(), { s: 1.15 })}
    ${g(680, 170, stomachSleeve(), { s: 0.8 })}`),

  // texto café, 888x380: caneta e estômago lado a lado
  "03-brasil": () => svg(888, 380, `
    ${g(170, 60, stomach(), { s: 1.5 })}
    ${g(640, 190, pen({ w: 280, h: 38, label: 2 }), { r: -24 })}`),

  // diagrama, miolo 488x370: três canetas, uma por geração
  "04-tres-canetas": () => svg(488, 370, `
    ${g(244, 70, pen({ w: 230, h: 30, label: 1 }))}
    ${g(244, 185, pen({ w: 300, h: 34, label: 2 }))}
    ${g(244, 300, pen({ w: 380, h: 38, label: 3 }))}`),

  // texto, 888x380: estômago inteiro, caneta grande
  "05-previsao": () => svg(888, 380, `
    ${g(120, 50, stomach(), { s: 1.4 })}
    ${g(620, 200, pen({ w: 340, h: 44, label: 3 }), { r: -18 })}`),

  // texto café, 888x420: a árvore (continuidade do cuidado)
  "06-cronica": () => svg(420, 300, `
    ${g(0, 0, tree(), { s: 0.74 })}`),
};
