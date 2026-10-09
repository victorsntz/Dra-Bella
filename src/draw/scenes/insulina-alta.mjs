import { C, g, svg, pancreas, vessel, fatCluster, stream, cytokines, cellReceptors, stomach, cycle, clock, muscle, moon, plate } from "../parts.mjs";

// Insulina alta não é só diabetes. Pâncreas, vaso cheio de insulina, gordura que não sai.
// Esferas tom 2 (areia) = insulina; tom 3 (bege) = glicose/energia.
export default {
  // capa 520x900: pâncreas grande embaixo, vaso cheio de insulina em cima, gordura ao lado.
  "01-pancreas-insulina": () => svg(520, 900, `
    ${stream({ from: [250, 650], to: [250, 315], ctrl: [130, 480], n: 9, rmin: 5, rmax: 10, tone: 2, seed: 42, spread: 10 })}
    ${g(262, 250, vessel({ w: 380, h: 110, rbcs: 3 }))}
    ${stream({ from: [90, 250], to: [440, 250], ctrl: [262, 242], n: 16, rmin: 5, rmax: 11, tone: 2, seed: 41, spread: 13 })}
    ${g(400, 480, fatCluster({ s: 1.2 }))}
    ${g(30, 640, pancreas(), { s: 2.3 })}`),

  // texto café, cena alta 888x440: pâncreas libera insulina, a gordura fica guardada.
  "02-guarda-energia": () => svg(888, 440, `
    ${stream({ from: [480, 215], to: [640, 235], ctrl: [560, 140], n: 10, rmin: 5, rmax: 10, tone: 2, seed: 43, spread: 9 })}
    ${g(40, 160, pancreas(), { s: 2.3 })}
    ${g(745, 255, fatCluster({ s: 1.45 }))}`),

  // diagrama, miolo 488x370: célula com receptores apagados; insulina se acumulando em cima,
  // pâncreas no canto superior esquerdo produzindo mais; vaso no canto superior direito com
  // pouca glicose (o exame ainda sai normal).
  "03-resistencia": () => svg(488, 370, `
    ${stream({ from: [160, 60], to: [190, 165], ctrl: [160, 120], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 46, spread: 6 })}
    ${g(10, 20, pancreas(), { s: 0.75 })}
    ${g(400, 52, vessel({ w: 150, h: 48, rbcs: 3 }), { r: -8 })}
    ${stream({ from: [345, 58], to: [455, 44], ctrl: [400, 52], n: 4, rmin: 4, rmax: 6, tone: 3, seed: 45, spread: 5 })}
    ${stream({ from: [110, 205], to: [445, 205], ctrl: [280, 160], n: 16, rmin: 6, rmax: 11, tone: 2, seed: 47, spread: 16 })}
    ${g(34, 146, cellReceptors({ keys: [] }))}`),

  // diagrama café, miolo 488x370: vaso com insulina no centro; sinal indo pra gordura, estômago (fome),
  // pele (acantose), ovário (SOP) e gordura abdominal.
  "04-dia-inteiro": () => svg(488, 370, `
    ${stream({ from: [150, 125], to: [95, 85], ctrl: [120, 85], n: 5, rmin: 4, rmax: 8, tone: 2, seed: 48, spread: 6 })}
    ${stream({ from: [150, 160], to: [110, 250], ctrl: [115, 215], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 49, spread: 6 })}
    ${stream({ from: [340, 125], to: [390, 85], ctrl: [370, 85], n: 5, rmin: 4, rmax: 8, tone: 2, seed: 50, spread: 6 })}
    ${stream({ from: [340, 160], to: [390, 250], ctrl: [372, 215], n: 6, rmin: 4, rmax: 8, tone: 2, seed: 51, spread: 6 })}
    ${stream({ from: [244, 175], to: [244, 262], ctrl: [252, 220], n: 5, rmin: 4, rmax: 8, tone: 2, seed: 52, spread: 5 })}
    ${g(62, 60, fatCluster({ s: 0.46 }))}
    ${g(18, 236, stomach(), { s: 0.6 })}
    ${g(422, 60, `<rect x="-48" y="-36" width="96" height="72" rx="18" fill="${C.skin}" stroke="${C.skinLo}" stroke-opacity="0.7" stroke-width="1.5"/>
      <ellipse cx="-14" cy="-6" rx="16" ry="9" fill="${C.mutedLo}" opacity="0.55" transform="rotate(-15 -14 -6)"/>
      <ellipse cx="14" cy="10" rx="18" ry="9" fill="${C.mutedLo}" opacity="0.5" transform="rotate(-15 14 10)"/>
      <ellipse cx="-6" cy="20" rx="12" ry="6" fill="${C.mutedLo}" opacity="0.45" transform="rotate(-15 -6 20)"/>
      <path d="M-34,-24 C-20,-30 0,-30 14,-26" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round"/>`)}
    ${g(422, 296, cycle({ r: 40, active: 1 }))}
    ${g(244, 298, fatCluster({ s: 0.42 }))}
    ${g(244, 142, vessel({ w: 210, h: 62, rbcs: 2 }))}
    ${stream({ from: [155, 142], to: [335, 142], ctrl: [244, 138], n: 13, rmin: 5, rmax: 9, tone: 2, seed: 53, spread: 9 })}`),

  // texto, cena alta 888x440: vaso cheio de insulina e pouca glicose; relógio (anos até o exame mudar).
  "05-exame-normal": () => svg(888, 440, `
    ${g(300, 250, vessel({ w: 400, h: 130, rbcs: 4 }))}
    ${stream({ from: [120, 246], to: [480, 246], ctrl: [300, 240], n: 16, rmin: 5, rmax: 11, tone: 2, seed: 53, spread: 16 })}
    ${stream({ from: [150, 266], to: [450, 266], ctrl: [300, 270], n: 4, rmin: 5, rmax: 8, tone: 3, seed: 54, spread: 8 })}
    ${g(720, 250, clock({ r: 110, h: 8 }))}`),

  // texto café, cena alta 888x440: músculo, lua (sono), prato meio cheio (fibra, menos pico).
  "06-raiz-hormonal": () => svg(888, 440, `
    ${g(220, 275, muscle({ w: 330, h: 115 }), { r: -12 })}
    ${g(470, 175, moon({ r: 62 }))}
    ${g(720, 270, plate({ r: 110, portion: 0.5 }))}`),
};
