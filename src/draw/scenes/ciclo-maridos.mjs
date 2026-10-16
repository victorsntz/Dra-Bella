import { g, svg, hormoneChart, cycle, sphere } from "../parts.mjs";

// Curvas esquemáticas, não dosagens. Eixos e nomes vão como etiquetas HTML (ver content/ciclo-maridos.json).
const fases = [{ from: 1, to: 5, tone: 1 }, { from: 6, to: 12.6, tone: 4 }, { from: 12.8, to: 15.2, tone: 2 }, { from: 15.4, to: 28, tone: 3 }];

export default {
  // capa: figura de largura cheia 888 x 400. O mapa do ciclo com menstruação, período fértil e ovulação.
  "01-mapa": () => svg(888, 400, `
    ${g(0, 40, hormoneChart({ w: 888, h: 360, bands: [{ from: 1, to: 5, tone: 1 }, { from: 11, to: 16, tone: 2 }] }))}`),

  // fases 1 a 4: o mesmo gráfico, com a fase da vez em destaque e o resto apagado.
  "02-menstruacao": () => svg(888, 420, `${hormoneChart({ w: 888, h: 420, dark: true, focus: [1, 5.5] })}`),
  "03-folicular": () => svg(888, 420, `${hormoneChart({ w: 888, h: 420, focus: [5.5, 13] })}`),
  "04-ovulacao": () => svg(888, 420, `${hormoneChart({ w: 888, h: 420, dark: true, focus: [12.5, 15.5] })}`),
  "05-lutea": () => svg(888, 420, `${hormoneChart({ w: 888, h: 420, focus: [15, 28] })}`),

  // diagrama café: miolo 488 x 310 (colunas de 200 dos dois lados). O ciclo como roda de quatro fases.
  "06-regras": () => svg(488, 310, `
    ${g(244, 155, cycle({ r: 118, active: 3 }))}
    ${sphere(244, 155, 22, 2)}`),

  // texto claro, 888 x 380: o mapa completo, as quatro fases em faixa.
  "07-mapa-completo": () => svg(888, 380, `${g(0, 40, hormoneChart({ w: 888, h: 340, bands: fases }))}`),
};
