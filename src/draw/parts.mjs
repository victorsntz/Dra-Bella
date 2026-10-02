// Peças vetoriais reutilizáveis das ilustrações anatômicas, na paleta da marca.
// Cada função devolve uma string SVG (<g ...>). Sem texto: as etiquetas são HTML.

export const C = {
  muscle: "#B9776A", muscleHi: "#E0AE9F", muscleLo: "#8A4F43", fiber: "#7A4539", fascicle: "#C98A7C",
  tendon: "#EFE9DE", tendonLo: "#CFC5B4",
  fat: "#EBDCBB", fatHi: "#F7EEDA", fatLo: "#CDB48A",
  liver: "#9B6557", liverHi: "#BC8575", liverLo: "#6E4036", bile: "#B7A676",
  brain: "#D9BBB0", brainHi: "#EDD9D0", brainLo: "#B38E85", neuron: "#8E6A60",
  vessel: "#C4807A", vesselHi: "#DEA69E", vesselLo: "#95574F", lumen: "#E9C8C0", rbc: "#B2534B", rbcHi: "#D27B72",
  mito: "#CDA893", mitoHi: "#E8CFBF", mitoLo: "#8E5A4C",
  mol1: "#A9B3BC", mol1Lo: "#7F8B95", mol2: "#ABA597", mol2Lo: "#827C70", mol3: "#CFBEA8", mol3Lo: "#A28F77", molHi: "#F4F1EB",
  satellite: "#9C8FA8", satelliteLo: "#6F6380",
  skin: "#EBDFD2", skinLo: "#CDB9A6", muted: "#CBAE9F", mutedLo: "#A98B7D", hair: "#4A3A32", ink: "#362D28",
  stomach: "#D0A094", stomachLo: "#9E6459", pancreas: "#E2C9A8", pancreasLo: "#B9956F",
  kidney: "#B86F65", kidneyLo: "#834A42", adrenal: "#DCC08E", adrenalLo: "#A98A52",
  trunk: "#6F6356", trunkLo: "#4E453B", canopy: "#ABA597", canopyLo: "#8E8779", canopyHi: "#C9C3B5", fruit: "#B9776A",
};

export function defs() {
  const rad = (id, hi, mid, lo, cx = 0.35, cy = 0.3) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="0.8"><stop offset="0" stop-color="${hi}"/><stop offset="0.55" stop-color="${mid}"/><stop offset="1" stop-color="${lo}"/></radialGradient>`;
  const lin = (id, a, b, c, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="0.5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
  return `<defs>
    ${lin("gMuscle", C.muscleHi, C.muscle, C.muscleLo)}
    ${lin("gMuted", "#DCC5B9", C.muted, C.mutedLo)}
    ${lin("gTendon", C.tendon, C.tendon, C.tendonLo, 1, 0)}
    ${lin("gVessel", C.vesselHi, C.vessel, C.vesselLo)}
    ${lin("gSkin", "#F3EAE0", C.skin, C.skinLo)}
    ${rad("gFat", C.fatHi, C.fat, C.fatLo)}
    ${rad("gLiver", C.liverHi, C.liver, C.liverLo, 0.3, 0.25)}
    ${rad("gBrain", C.brainHi, C.brain, C.brainLo, 0.35, 0.25)}
    ${rad("gLumen", C.lumen, C.vesselLo, C.vesselLo, 0.5, 0.5)}
    ${rad("gRbc", C.rbcHi, C.rbc, C.rbc, 0.4, 0.4)}
    ${rad("gMito", C.mitoHi, C.mito, C.mitoLo)}
    ${rad("gMol1", C.molHi, C.mol1, C.mol1Lo)}
    ${rad("gMol2", C.molHi, C.mol2, C.mol2Lo)}
    ${rad("gMol3", C.molHi, C.mol3, C.mol3Lo)}
    ${rad("gSat", "#D8CFE0", C.satellite, C.satelliteLo)}
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="${C.ink}" flood-opacity="0.14"/></filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="${C.ink}" flood-opacity="0.10"/></filter>
  </defs>`;
}

export const g = (x, y, inner, { r = 0, s = 1, extra = "" } = {}) =>
  `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" ${extra}>${inner}</g>`;

// ---------- músculo fusiforme (centro em 0,0; comprimento w, altura h) ----------
export function muscle({ w = 300, h = 110, cut = false, fill = "url(#gMuscle)", fibers = 9, tendons = true, shadow = true } = {}) {
  const a = w / 2, b = h / 2, tw = w * 0.2;
  const left = `M${-a},0 C${-a},${-b * 0.55} ${-a * 0.45},${-b} 0,${-b}`;
  const leftBack = `C${-a * 0.45},${b} ${-a},${b * 0.55} ${-a},0 Z`;
  let belly, cutFace = "", cx = a;
  if (cut) {
    cx = a * 0.6;
    belly = `${left} L${cx},${-b} A${b * 0.34},${b} 0 0 1 ${cx},${b} L0,${b} ${leftBack}`;
    const ring = [0, 60, 120, 180, 240, 300].map((deg) => {
      const rr = b * 0.56, x = cx + Math.cos((deg * Math.PI) / 180) * rr * 0.34, y = Math.sin((deg * Math.PI) / 180) * rr;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(b * 0.11).toFixed(1)}" ry="${(b * 0.3).toFixed(1)}" fill="${C.fascicle}" stroke="${C.muscleLo}" stroke-width="1.2"/>`;
    }).join("");
    cutFace = `<ellipse cx="${cx}" cy="0" rx="${b * 0.34}" ry="${b}" fill="${C.muscleLo}"/>
      <ellipse cx="${cx}" cy="0" rx="${b * 0.3}" ry="${b * 0.9}" fill="${C.fiber}" opacity="0.6"/>
      ${ring}<ellipse cx="${cx}" cy="0" rx="${b * 0.12}" ry="${b * 0.32}" fill="${C.fascicle}" stroke="${C.muscleLo}" stroke-width="1.2"/>`;
  } else {
    belly = `${left} C${a * 0.45},${-b} ${a},${-b * 0.55} ${a},0 C${a},${b * 0.55} ${a * 0.45},${b} 0,${b} ${leftBack}`;
  }
  const tend = tendons
    ? `<path d="M${-a + 12},${-b * 0.28} L${-a - tw},${-h * 0.08} L${-a - tw},${h * 0.08} L${-a + 12},${b * 0.28} Z" fill="url(#gTendon)"/>` +
      (cut ? "" : `<path d="M${a - 12},${-b * 0.28} L${a + tw},${-h * 0.08} L${a + tw},${h * 0.08} L${a - 12},${b * 0.28} Z" fill="url(#gTendon)"/>`)
    : "";
  const xr = cut ? cx - b * 0.3 : a * 0.97;
  const fib = Array.from({ length: fibers }, (_, k) => {
    const t = (k + 1) / (fibers + 1), yy = (t * 2 - 1) * b * 0.82;
    return `<path d="M${-a * 0.96},${(yy * 0.22).toFixed(1)} C${-a * 0.4},${yy.toFixed(1)} ${xr * 0.4},${yy.toFixed(1)} ${xr},${(cut ? yy * 0.95 : yy * 0.22).toFixed(1)}" fill="none" stroke="${C.fiber}" stroke-opacity="0.32" stroke-width="1.6"/>`;
  }).join("");
  const hi = `<path d="M${-a * 0.8},${-b * 0.35} C${-a * 0.3},${-b * 0.8} ${a * 0.25},${-b * 0.8} ${cut ? cx * 0.8 : a * 0.75},${-b * 0.4}" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="${b * 0.18}" stroke-linecap="round"/>`;
  return `<g ${shadow ? 'filter="url(#shadow)"' : ""}>${tend}<path d="${belly}" fill="${fill}" stroke="${C.muscleLo}" stroke-opacity="0.5" stroke-width="1.5"/>${hi}${fib}${cutFace}</g>`;
}

// ---------- cérebro (caixa 220x170, canto em 0,0) ----------
export function brain({ neurons = false, hypothalamus = false } = {}) {
  const outline = "M18,100 C6,62 36,26 84,16 C124,6 172,18 194,56 C208,82 200,114 176,124 C166,140 136,146 114,136 C104,150 76,156 58,142 C40,146 24,132 26,116 C14,112 10,104 18,100 Z";
  const cereb = "M118,132 C132,124 158,124 170,134 C162,154 130,158 116,146 Z";
  const stem = "M104,138 C108,150 112,162 110,176 L124,178 C124,164 120,150 118,142 Z";
  const gyri = ["M44,62 C58,50 64,78 84,64 C100,54 106,80 126,68", "M38,90 C56,78 66,104 90,90 C108,80 118,104 140,92", "M60,116 C76,104 84,126 104,112",
    "M100,40 C114,30 124,52 142,42 C156,36 164,54 182,50", "M140,110 C150,100 160,116 174,104", "M68,36 C82,28 90,46 108,36"]
    .map((d) => `<path d="${d}" fill="none" stroke="${C.brainLo}" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round"/>`).join("");
  const neur = neurons ? [[70, 70], [120, 56], [150, 96], [96, 110]].map(([x, y]) =>
    `<g stroke="${C.neuron}" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M${x},${y} l-14,-18 m14,18 l16,-14 m-16,14 l-18,10 m18,-10 l14,16 m-14,-16 l6,-22"/>
      <circle cx="${x}" cy="${y}" r="7" fill="${C.neuron}" stroke="none"/></g>`).join("") : "";
  const hypo = hypothalamus ? `<path d="M104,112 C110,124 108,136 104,140" fill="none" stroke="${C.muscleLo}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
    <ellipse cx="104" cy="108" rx="17" ry="12" fill="${C.muscle}" stroke="${C.muscleLo}" stroke-width="1.5"/>
    <ellipse cx="100" cy="105" rx="7" ry="4" fill="#fff" opacity="0.25"/>` : "";
  return `<g filter="url(#shadow)"><path d="${stem}" fill="${C.brainLo}"/><path d="${cereb}" fill="${C.brain}" stroke="${C.brainLo}" stroke-width="1.5"/>
    <path d="${outline}" fill="url(#gBrain)" stroke="${C.brainLo}" stroke-opacity="0.7" stroke-width="1.5"/>${gyri}${neur}${hypo}</g>`;
}

// ---------- fígado (caixa 220x140) ----------
export function liver() {
  const d = "M10,60 C10,25 50,10 95,12 C150,14 210,30 212,70 C214,100 180,122 140,126 C100,130 60,135 35,115 C15,100 8,80 10,60 Z";
  return `<g filter="url(#shadow)"><path d="${d}" fill="url(#gLiver)" stroke="${C.liverLo}" stroke-opacity="0.6" stroke-width="1.5"/>
    <path d="M118,16 C124,60 118,96 104,126" fill="none" stroke="${C.liverLo}" stroke-opacity="0.5" stroke-width="3"/>
    <ellipse cx="60" cy="52" rx="34" ry="14" fill="#fff" opacity="0.18" transform="rotate(-12 60 52)"/>
    <ellipse cx="128" cy="116" rx="24" ry="11" fill="${C.bile}"/></g>`;
}

// ---------- células de gordura (aglomerado, centro em 0,0) ----------
export function fatCluster({ s = 1 } = {}) {
  const cells = [[8, -48, 24], [-40, -26, 28], [48, -18, 30], [-58, 6, 24], [62, 22, 24], [0, 0, 34], [-28, 34, 26], [30, 34, 30], [-12, 62, 22], [44, 52, 20]];
  return `<g filter="url(#shadow)" transform="scale(${s})">${cells.map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#gFat)" stroke="${C.fatLo}" stroke-opacity="0.7" stroke-width="1.5"/><circle cx="${x + r * 0.35}" cy="${y + r * 0.3}" r="${r * 0.14}" fill="${C.fatLo}" opacity="0.6"/>`).join("")}</g>`;
}

// ---------- vaso sanguíneo em corte (tubo horizontal, centro em 0,0) ----------
export function vessel({ w = 240, h = 70, rbcs = 6, open = true } = {}) {
  const a = w / 2, b = h / 2, rx = b * 0.32;
  const seed = [0.12, 0.62, 0.33, 0.88, 0.48, 0.75, 0.22, 0.95];
  const cells = Array.from({ length: rbcs }, (_, i) => {
    const x = -a + 20 + (w - 60) * seed[i % seed.length], y = (seed[(i * 3 + 1) % seed.length] - 0.5) * h * 0.7, r = b * 0.3;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><ellipse rx="${r}" ry="${r * 0.72}" fill="url(#gRbc)"/><ellipse rx="${r * 0.45}" ry="${r * 0.3}" fill="${C.rbc}" opacity="0.8"/></g>`;
  }).join("");
  return `<g filter="url(#shadow)">
    <path d="M${-a},${-b} L${a},${-b} L${a},${b} L${-a},${b} Z" fill="url(#gVessel)" stroke="${C.vesselLo}" stroke-opacity="0.6" stroke-width="1.5"/>
    <ellipse cx="${-a}" cy="0" rx="${rx}" ry="${b}" fill="${C.vessel}"/>
    <path d="M${-a},${-b * 0.55} L${a},${-b * 0.55} L${a},${b * 0.55} L${-a},${b * 0.55} Z" fill="url(#gLumen)" opacity="0.9"/>
    ${cells}
    ${open ? `<ellipse cx="${a}" cy="0" rx="${rx}" ry="${b}" fill="${C.vesselHi}"/><ellipse cx="${a}" cy="0" rx="${rx * 0.78}" ry="${b * 0.68}" fill="${C.vesselLo}"/><ellipse cx="${a}" cy="0" rx="${rx * 0.6}" ry="${b * 0.5}" fill="${C.lumen}" opacity="0.85"/>` : ""}
    <path d="M${-a * 0.9},${-b * 0.78} L${a * 0.9},${-b * 0.78}" stroke="#fff" stroke-opacity="0.3" stroke-width="${b * 0.16}" stroke-linecap="round"/></g>`;
}

// ---------- mitocôndria em corte (centro em 0,0, 200x110) ----------
export function mitochondrion() {
  const cristae = [-56, -32, -8, 16, 40, 60].map((x) =>
    `<path d="M${x},-36 C${x - 12},-14 ${x + 12},12 ${x},36" fill="none" stroke="${C.mitoLo}" stroke-opacity="0.85" stroke-width="7" stroke-linecap="round"/>`).join("");
  return `<g filter="url(#shadow)"><ellipse rx="100" ry="55" fill="url(#gMito)" stroke="${C.mitoLo}" stroke-opacity="0.6" stroke-width="1.5"/><ellipse rx="86" ry="42" fill="${C.mitoHi}" opacity="0.55"/>${cristae}
    <ellipse cx="-30" cy="-30" rx="40" ry="12" fill="#fff" opacity="0.2" transform="rotate(-10 -30 -30)"/></g>`;
}

// ---------- fibra com célula satélite (centro em 0,0) ----------
export function fiberWithSatellite({ w = 220, h = 64 } = {}) {
  return `<g>${muscle({ w, h, tendons: false, fibers: 7 })}
    <ellipse cx="${-w * 0.08}" cy="${-h * 0.22}" rx="${h * 0.36}" ry="${h * 0.22}" fill="url(#gSat)" stroke="${C.satelliteLo}" stroke-width="1.5" transform="rotate(-12 0 0)"/>
    <ellipse cx="${-w * 0.08}" cy="${-h * 0.22}" rx="${h * 0.14}" ry="${h * 0.09}" fill="${C.satelliteLo}" opacity="0.8"/></g>`;
}

// ---------- moléculas: esferas ao longo de uma curva ----------
export function sphere(x, y, r, tone = 1) {
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#gMol${tone})"/>` +
    `<circle cx="${(x - r * 0.3).toFixed(1)}" cy="${(y - r * 0.3).toFixed(1)}" r="${(r * 0.28).toFixed(1)}" fill="#fff" opacity="0.55"/>`;
}
export function stream({ from, to, ctrl, n = 12, rmin = 4, rmax = 10, tone = 1, seed = 1, spread = 14, fade = false }) {
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const [x1, y1] = from, [x2, y2] = to, [cx, cy] = ctrl || [(x1 + x2) / 2, (y1 + y2) / 2];
  let out = "";
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n, u = 1 - t;
    const x = u * u * x1 + 2 * u * t * cx + t * t * x2, y = u * u * y1 + 2 * u * t * cy + t * t * y2;
    const jx = (rnd() - 0.5) * spread * 2, jy = (rnd() - 0.5) * spread * 2;
    const r = rmin + rnd() * (rmax - rmin);
    const tn = tone === "mix" ? 1 + Math.floor(rnd() * 3) : tone;
    const dot = sphere(x + jx, y + jy, r, tn);
    out += fade ? `<g opacity="${(1 - t * 0.85).toFixed(2)}">${dot}</g>` : dot;
  }
  return `<g filter="url(#soft)">${out}</g>`;
}

// ---------- figura correndo, musculatura visível (caixa 520x900) ----------
// Perfil direito, correndo pra direita, tronco inclinado. Perna direita (perto) à frente com
// joelho alto, braço direito (perto) atrás; perna e braço esquerdos (longe) no contrário.
const V = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]], add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  mul: (a, k) => [a[0] * k, a[1] * k], len: (a) => Math.hypot(a[0], a[1]),
  norm: (a) => { const l = Math.hypot(a[0], a[1]); return [-a[1] / l, a[0] / l]; },
  lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
};
const f1 = (n) => n.toFixed(1);
// membro afunilado com pontas redondas: largura wA em A, wB em B
function limb(A, B, wA, wB, fill, stroke) {
  const n = V.norm(V.sub(B, A));
  const a1 = V.add(A, V.mul(n, wA / 2)), a2 = V.sub(A, V.mul(n, wA / 2));
  const b1 = V.add(B, V.mul(n, wB / 2)), b2 = V.sub(B, V.mul(n, wB / 2));
  return `<path d="M${f1(a1[0])},${f1(a1[1])} L${f1(b1[0])},${f1(b1[1])} A${wB / 2},${wB / 2} 0 0 1 ${f1(b2[0])},${f1(b2[1])} L${f1(a2[0])},${f1(a2[1])} A${wA / 2},${wA / 2} 0 0 1 ${f1(a1[0])},${f1(a1[1])} Z" fill="${fill}" stroke="${stroke}" stroke-opacity="0.45" stroke-width="1.5"/>`;
}
// ventre muscular ao longo do membro: fração t0..t1 do segmento, altura h, deslocamento lateral off
function belly(A, B, { t0 = 0.08, t1 = 0.92, h = 40, off = 0, fibers = 5, fill = "url(#gMuscle)" } = {}) {
  const d = V.sub(B, A), L = V.len(d), ang = (Math.atan2(d[1], d[0]) * 180) / Math.PI;
  const mid = V.lerp(A, B, (t0 + t1) / 2), n = V.norm(d), c = V.add(mid, V.mul(n, off));
  return g(c[0], c[1], muscle({ w: L * (t1 - t0), h, fill, fibers, tendons: false, shadow: false }), { r: ang });
}
export function runner({ muted = false } = {}) {
  const fill = muted ? "url(#gMuted)" : "url(#gMuscle)";
  const lo = muted ? C.mutedLo : C.muscleLo;
  const farFill = muted ? "#D9C6BB" : C.muted, farLo = muted ? C.mutedLo : C.mutedLo;
  // articulações
  const H = [332, 112];
  const S = [292, 206], P = [250, 452];
  const E1 = [214, 302], W1 = [180, 236];        // braço perto (direito), atrás
  const S2 = [304, 214], E2 = [374, 318], W2 = [402, 232]; // braço longe (esquerdo), à frente
  const K1 = [364, 556], A1 = [334, 688];        // perna perto (direita), à frente, joelho alto
  const P2 = [242, 458], K2 = [180, 592], A2 = [118, 712]; // perna longe (esquerda), estendida atrás
  const bel = (A, B, o) => belly(A, B, { ...o, fill });

  // ---- lado longe (apagado) ----
  const far = `<g>
    ${limb(S2, E2, 34, 26, farFill, farLo)}${limb(E2, W2, 26, 18, farFill, farLo)}
    <ellipse cx="${W2[0] + 8}" cy="${W2[1] - 8}" rx="11" ry="15" fill="${C.skinLo}" transform="rotate(-35 ${W2[0]} ${W2[1]})"/>
    ${limb(P2, K2, 56, 36, farFill, farLo)}${limb(K2, A2, 36, 22, farFill, farLo)}
    ${limb(A2, [A2[0] - 26, A2[1] + 54], 24, 14, C.skinLo, C.skinLo)}
    ${belly(P2, K2, { h: 38, t0: 0.12, t1: 0.86, fibers: 4, fill: "url(#gMuted)" })}
    ${belly(K2, A2, { h: 24, t0: 0.05, t1: 0.6, off: -6, fibers: 3, fill: "url(#gMuted)" })}
  </g>`;

  // ---- tronco ----
  const torso = `<g>
    <path d="M312,172 C338,184 356,214 358,254 C360,300 350,346 334,382 C322,410 312,432 306,452 L224,474 C218,448 220,420 226,392 C232,350 244,300 258,262 C266,238 276,214 290,196 Z" fill="${fill}" stroke="${lo}" stroke-opacity="0.45" stroke-width="1.5"/>
    <path d="M346,232 C362,246 366,268 358,288 C344,284 332,270 330,250 C332,240 338,234 346,232 Z" fill="${C.muscleHi}" opacity="0.55"/>
    ${g(276, 300, muscle({ w: 126, h: 50, fill, fibers: 6, tendons: false, shadow: false }), { r: -74 })}
    ${[[336, 312], [330, 350], [322, 388]].map(([x, y]) => `<rect x="${x - 17}" y="${y - 14}" width="34" height="28" rx="9" fill="${C.muscleHi}" opacity="0.5"/><rect x="${x - 17}" y="${y - 14}" width="34" height="28" rx="9" fill="none" stroke="${C.fiber}" stroke-opacity="0.35"/>`).join("")}
    ${[0, 1, 2].map((i) => `<path d="M${300 - i * 9},${332 + i * 22} C${294 - i * 9},${352 + i * 22} ${288 - i * 9},${372 + i * 22} ${284 - i * 9},${392 + i * 22}" fill="none" stroke="${C.fiber}" stroke-opacity="0.3" stroke-width="2"/>`).join("")}
    <path d="M232,440 C216,452 212,480 226,498 C242,506 262,496 270,478 C266,460 250,446 232,440 Z" fill="${fill}" stroke="${lo}" stroke-opacity="0.45" stroke-width="1.5"/>
    <path d="M238,452 C230,462 230,480 240,490" fill="none" stroke="${C.fiber}" stroke-opacity="0.35" stroke-width="2"/>
  </g>`;

  // ---- pescoço e cabeça ----
  const neck = limb([318, 156], [306, 190], 26, 30, fill, lo);
  const head = `<g>
    <ellipse cx="${H[0]}" cy="${H[1]}" rx="40" ry="44" fill="url(#gSkin)" stroke="${C.skinLo}" stroke-opacity="0.6" stroke-width="1.5" transform="rotate(8 ${H[0]} ${H[1]})"/>
    <path d="M366,120 C372,132 368,146 356,154 C346,158 336,156 330,150" fill="none" stroke="${C.skinLo}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M294,96 C292,66 318,54 340,60 C360,64 374,80 372,100 C356,90 336,92 320,102 C308,110 300,122 298,136 C292,128 292,112 294,96 Z" fill="${C.hair}"/>
    <circle cx="284" cy="112" r="19" fill="${C.hair}"/>
    <path d="M300,104 C310,98 322,96 334,98" fill="none" stroke="#6B5A50" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
  </g>`;

  // ---- perna perto (direita), à frente ----
  const nearLeg = `<g>
    ${limb(P, K1, 62, 42, fill, lo)}${limb(K1, A1, 42, 24, fill, lo)}
    ${bel(P, K1, { h: 46, t0: 0.06, t1: 0.9, off: -10, fibers: 5 })}
    ${bel(P, K1, { h: 30, t0: 0.12, t1: 0.9, off: 14, fibers: 4 })}
    ${bel(K1, A1, { h: 30, t0: 0.08, t1: 0.62, off: 9, fibers: 4 })}
    ${bel(K1, A1, { h: 16, t0: 0.1, t1: 0.75, off: -9, fibers: 3 })}
    <ellipse cx="${K1[0] + 4}" cy="${K1[1]}" rx="14" ry="17" fill="${C.tendon}" stroke="${C.tendonLo}" stroke-width="1.2"/>
    <path d="M${A1[0] - 14},${A1[1] - 4} L${A1[0] + 56},${A1[1] + 8} C${A1[0] + 66},${A1[1] + 12} ${A1[0] + 64},${A1[1] + 26} ${A1[0] + 52},${A1[1] + 28} L${A1[0] - 20},${A1[1] + 24} C${A1[0] - 28},${A1[1] + 20} ${A1[0] - 26},${A1[1] + 2} ${A1[0] - 14},${A1[1] - 4} Z" fill="url(#gSkin)" stroke="${C.skinLo}" stroke-opacity="0.7" stroke-width="1.5"/>
  </g>`;

  // ---- braço perto (direito), atrás ----
  const nearArm = `<g>
    ${limb(S, E1, 38, 28, fill, lo)}${limb(E1, W1, 28, 18, fill, lo)}
    ${bel(S, E1, { h: 30, t0: 0.12, t1: 0.9, off: -6, fibers: 4 })}
    ${bel(S, E1, { h: 18, t0: 0.15, t1: 0.9, off: 10, fibers: 3 })}
    ${bel(E1, W1, { h: 22, t0: 0.08, t1: 0.8, off: 4, fibers: 3 })}
    <path d="M268,196 C292,184 318,192 326,214 C318,228 300,236 282,232 C270,226 266,210 268,196 Z" fill="${fill}" stroke="${lo}" stroke-opacity="0.45" stroke-width="1.5"/>
    <path d="M280,206 C290,200 304,200 314,208" fill="none" stroke="${C.fiber}" stroke-opacity="0.35" stroke-width="2"/>
    <ellipse cx="${W1[0] - 8}" cy="${W1[1] - 10}" rx="11" ry="15" fill="url(#gSkin)" stroke="${C.skinLo}" stroke-opacity="0.7" stroke-width="1.2" transform="rotate(30 ${W1[0]} ${W1[1]})"/>
  </g>`;
  return `<g>${far}${nearArm}${torso}${neck}${head}${nearLeg}</g>`;
}

// ---------- ondas (o "barulho" do food noise): arcos concêntricos abrindo pra direita ----------
export function ripples({ n = 4, r0 = 40, gap = 26, color = C.cozyBrown || "#6F6356", sweep = 70 } = {}) {
  const a = (sweep * Math.PI) / 360;
  return Array.from({ length: n }, (_, i) => {
    const r = r0 + i * gap, x1 = Math.cos(-a) * r, y1 = Math.sin(-a) * r, x2 = Math.cos(a) * r, y2 = Math.sin(a) * r;
    return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="${(0.75 - i * 0.16).toFixed(2)}"/>`;
  }).join("");
}

// ---------- estômago (caixa 170x190, canto em 0,0) ----------
export function stomach({ full = false } = {}) {
  const d = "M58,8 C30,22 14,60 22,96 C30,136 64,174 110,176 C148,178 166,150 156,122 C148,100 122,96 104,86 C84,76 78,52 82,30 C84,16 72,6 58,8 Z";
  const rugae = ["M48,60 C60,80 56,110 68,134", "M70,70 C80,92 78,120 92,146", "M96,110 C110,124 118,142 128,158"]
    .map((r) => `<path d="${r}" fill="none" stroke="${C.stomachLo}" stroke-opacity="0.45" stroke-width="2.5" stroke-linecap="round"/>`).join("");
  const fill = full ? [[70, 120, 9], [92, 140, 8], [112, 128, 7], [84, 100, 7], [120, 150, 6], [60, 96, 6]].map(([x, y, r]) => sphere(x, y, r, 3)).join("") : "";
  return `<g filter="url(#shadow)"><path d="${d}" fill="${C.stomach}" stroke="${C.stomachLo}" stroke-opacity="0.6" stroke-width="1.5"/>${rugae}${fill}
    <ellipse cx="56" cy="40" rx="14" ry="22" fill="#fff" opacity="0.18" transform="rotate(20 56 40)"/></g>`;
}

// ---------- pâncreas (caixa 200x70) ----------
export function pancreas() {
  const d = "M6,40 C10,20 36,10 60,16 C84,22 104,10 130,12 C160,14 190,26 194,42 C190,56 160,62 130,58 C104,54 84,64 60,58 C36,52 10,56 6,40 Z";
  const lob = [40, 70, 100, 130, 160].map((x) => `<path d="M${x},18 C${x + 4},30 ${x - 4},44 ${x},56" fill="none" stroke="${C.pancreasLo}" stroke-opacity="0.4" stroke-width="2"/>`).join("");
  return `<g filter="url(#shadow)"><path d="${d}" fill="${C.pancreas}" stroke="${C.pancreasLo}" stroke-opacity="0.6" stroke-width="1.5"/>${lob}</g>`;
}

// ---------- rim com adrenal (caixa 110x170) ----------
export function adrenalKidney() {
  const kid = "M56,30 C84,26 104,56 102,96 C100,136 76,164 50,160 C22,156 8,128 12,96 C16,66 30,34 56,30 Z";
  const adr = "M30,38 C34,20 56,8 78,14 C86,18 84,30 72,34 C58,38 44,40 30,38 Z";
  return `<g filter="url(#shadow)"><path d="${kid}" fill="${C.kidney}" stroke="${C.kidneyLo}" stroke-opacity="0.6" stroke-width="1.5"/>
    <path d="M26,70 C34,86 34,110 28,126" fill="none" stroke="${C.kidneyLo}" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>
    <path d="${adr}" fill="${C.adrenal}" stroke="${C.adrenalLo}" stroke-opacity="0.7" stroke-width="1.5"/>
    <ellipse cx="70" cy="60" rx="10" ry="18" fill="#fff" opacity="0.18" transform="rotate(-10 70 60)"/></g>`;
}

// ---------- aglomerado de citocinas (centro em 0,0) ----------
export function cytokines({ n = 9, tone = 1, seed = 2 } = {}) {
  let s = seed * 7919; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return `<g filter="url(#soft)">${Array.from({ length: n }, () => sphere((rnd() - 0.5) * 70, (rnd() - 0.5) * 60, 5 + rnd() * 7, tone)).join("")}</g>`;
}

// ---------- fluxo circular (o ciclo da recompensa) ----------
export function loop({ r = 100, n = 18, tone = 2, seed = 4 }) {
  let s = seed * 131; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  return `<g filter="url(#soft)">${Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, rr = r + (rnd() - 0.5) * 12;
    return sphere(Math.cos(a) * rr, Math.sin(a) * rr, 5 + rnd() * 6, tone === "mix" ? 1 + Math.floor(rnd() * 3) : tone);
  }).join("")}</g>`;
}

// ---------- a Árvore (fruto, galhos, raízes): caixa 420x400, origem no topo-esquerdo ----------
export function tree({ fruits = true } = {}) {
  const roots = ["M210,290 C200,320 150,330 120,370", "M210,290 C206,322 176,344 168,384", "M210,290 C214,322 244,344 252,384", "M210,290 C220,320 270,330 300,370"]
    .map((d) => `<path d="${d}" fill="none" stroke="${C.trunk}" stroke-width="7" stroke-linecap="round"/>`).join("");
  const branches = ["M210,230 C200,200 170,190 150,170", "M210,230 C220,200 250,190 270,172", "M210,210 C206,180 200,160 190,140", "M210,210 C216,180 226,160 236,142"]
    .map((d) => `<path d="${d}" fill="none" stroke="${C.trunk}" stroke-width="5" stroke-linecap="round"/>`).join("");
  const canopy = [[210, 110, 74], [140, 140, 52], [280, 140, 54], [170, 90, 44], [252, 86, 46], [210, 160, 40]]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.canopy}" stroke="${C.canopyLo}" stroke-opacity="0.6" stroke-width="1.5"/>`).join("");
  const hi = `<circle cx="190" cy="96" r="34" fill="${C.canopyHi}" opacity="0.5"/>`;
  const fr = fruits ? [[150, 150, 10], [268, 150, 10], [232, 110, 9], [178, 118, 9], [214, 172, 8]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.fruit}" stroke="${C.muscleLo}" stroke-opacity="0.6" stroke-width="1.2"/>`).join("") : "";
  return `<g filter="url(#shadow)">${roots}<path d="M198,292 C196,250 198,230 204,200 L216,200 C222,230 224,250 222,292 Z" fill="${C.trunk}" stroke="${C.trunkLo}" stroke-opacity="0.5" stroke-width="1.5"/>${branches}${canopy}${hi}${fr}
    <path d="M100,292 L320,292" stroke="${C.canopyLo}" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 6"/></g>`;
}


// ---------- adipócitos com fibrose (centro em 0,0): colágeno entre as células e macrófagos ----------
export function fatClusterFibrotic({ s = 1 } = {}) {
  const strands = ["M-70,-30 C-40,-10 -10,-40 30,-10", "M-50,40 C-20,20 10,60 50,30", "M-20,-60 C0,-30 20,-50 60,-20", "M-60,0 C-30,20 0,0 40,30", "M-10,70 C10,50 30,70 60,50"]
    .map((d) => `<path d="${d}" fill="none" stroke="${C.muscleLo}" stroke-opacity="0.55" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="3 5"/>`).join("");
  const macro = [[-44, -46, 7], [52, -2, 6], [-62, 28, 6], [26, 60, 7], [8, -14, 5]].map(([x, y, r]) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.satellite}" stroke="${C.satelliteLo}" stroke-width="1.2"/>`).join("");
  return `<g transform="scale(${s})">${fatCluster({ s: 1 })}${strands}${macro}</g>`;
}

// ---------- pernas (vista de frente, da cintura aos pés, caixa 300x540, origem no canto superior esquerdo) ----------
// lipedema: quadril e coxas largas, panturrilha em coluna e o "degrau" no tornozelo (a gordura para antes do pé).
export function legs({ lipedema = true } = {}) {
  const d = lipedema
    ? "M95,0 C70,40 44,80 42,130 C40,190 50,250 56,300 C60,340 60,380 62,420 C63,445 62,468 94,478 L84,500 C80,520 96,534 120,532 L140,532 C148,532 150,520 146,506 L142,482 C134,440 130,400 128,360 C126,330 128,290 134,250 C140,220 148,200 150,190 C152,200 160,220 166,250 C172,290 174,330 172,360 C170,400 166,440 158,482 L154,506 C150,520 152,532 160,532 L180,532 C204,534 220,520 216,500 L206,478 C238,468 237,445 238,420 C240,380 240,340 244,300 C250,250 260,190 258,130 C256,80 230,40 205,0 Z"
    : "M105,0 C88,40 66,80 66,130 C66,190 76,250 82,300 C86,340 88,380 90,420 C92,450 94,468 100,478 L90,500 C86,520 100,534 122,532 L140,532 C148,532 150,520 146,506 L142,482 C136,440 132,400 130,360 C128,330 130,290 136,250 C142,220 148,200 150,190 C152,200 158,220 164,250 C170,290 172,330 170,360 C168,400 164,440 158,482 L154,506 C150,520 152,532 160,532 L178,532 C200,534 214,520 210,500 L200,478 C206,468 208,450 210,420 C212,380 214,340 218,300 C224,250 234,190 234,130 C234,80 212,40 195,0 Z";
  const knees = `<path d="M92,336 C104,330 118,332 126,340" fill="none" stroke="${C.skinLo}" stroke-width="2" stroke-linecap="round" opacity="0.9"/><path d="M174,340 C182,332 196,330 208,336" fill="none" stroke="${C.skinLo}" stroke-width="2" stroke-linecap="round" opacity="0.9"/>`;
  const cuff = lipedema ? `<path d="M66,470 C76,478 88,480 94,478" fill="none" stroke="${C.skinLo}" stroke-width="2" stroke-linecap="round"/><path d="M234,470 C224,478 212,480 206,478" fill="none" stroke="${C.skinLo}" stroke-width="2" stroke-linecap="round"/>` : "";
  const toes = `<path d="M84,500 L146,506 M154,506 L216,500" fill="none" stroke="${C.skinLo}" stroke-opacity="0.6" stroke-width="1.5"/>`;
  return `<g><path d="${d}" fill="url(#gSkin)" stroke="${C.skinLo}" stroke-opacity="0.8" stroke-width="1.5" stroke-linejoin="round"/>${knees}${cuff}${toes}</g>`;
}

// ---------- célula com três receptores (caixa 420x220, origem canto superior esquerdo) ----------
// keys: quais hormônios estão presentes (1 = GLP-1, 2 = GIP, 3 = glucagon). Receptor sem chave fica apagado.
export function cellReceptors({ keys = [1, 2, 3] } = {}) {
  const tones = { 1: "gMol1", 2: "gMol2", 3: "gMol3" };
  const slots = [[90, 1], [210, 2], [330, 3]];
  const top = "M0,150 C60,130 120,170 180,150 C240,130 300,170 360,150 C390,140 410,150 420,150";
  const membrane = `<path d="${top} C424,196 380,222 210,222 C40,222 -4,196 0,150 Z" fill="${C.muscleHi}" opacity="0.45" stroke="${C.muscleLo}" stroke-opacity="0.5" stroke-width="1.5"/>
    <path d="${top}" fill="none" stroke="${C.muscleLo}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="210" cy="196" rx="34" ry="12" fill="${C.muscleLo}" opacity="0.25"/>`;
  const rec = slots.map(([x, k]) => {
    const on = keys.includes(k);
    const col = on ? C.deep || "#362D28" : C.sandLine || "#CFCABF";
    const pocket = `<path d="M${x - 22},150 L${x - 22},118 C${x - 22},104 ${x + 22},104 ${x + 22},118 L${x + 22},150" fill="${on ? C.paper || "#F6F4F0" : "none"}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
    const key = on ? `<g>${sphere(x, 112, 16, k)}<path d="M${x},128 L${x},144" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/></g>` : "";
    const signal = on ? `<path d="M${x},160 C${x - 6},176 ${x + 6},192 ${x},208" fill="none" stroke="${C.ink}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>` : "";
    return pocket + key + signal;
  }).join("");
  return `<g>${membrane}${rec}</g>`;
}

// ---------- intestino (serpentina, caixa 240x200, origem canto superior esquerdo) ----------
export function intestine() {
  const d = "M20,30 C80,10 120,10 160,30 C210,55 210,85 160,100 C110,115 60,110 40,130 C10,160 40,190 90,180 C140,170 180,160 220,180";
  return `<g><path d="${d}" fill="none" stroke="${C.stomachLo}" stroke-opacity="0.5" stroke-width="30" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${C.stomach}" stroke-width="24" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="7" stroke-linecap="round" transform="translate(0 -5)"/></g>`;
}

// ---------- caneta injetora (horizontal, centro em 0,0, comprimento w) ----------
export function pen({ w = 260, h = 36, label = 1 } = {}) {
  const a = w / 2, b = h / 2;
  return `<g><rect x="${-a}" y="${-b}" width="${w}" height="${h}" rx="${b}" fill="${C.tendon}" stroke="${C.tendonLo}" stroke-width="1.5"/>
    <rect x="${-a}" y="${-b}" width="${w * 0.3}" height="${h}" rx="${b}" fill="${C.ink}"/>
    <rect x="${-a + w * 0.22}" y="${-b}" width="${w * 0.1}" height="${h}" fill="${C.ink}"/>
    <rect x="${a - w * 0.42}" y="${-b * 0.5}" width="${w * 0.2}" height="${h * 0.5}" rx="3" fill="${C.paper || "#F6F4F0"}" stroke="${C.tendonLo}" stroke-width="1"/>
    <rect x="${a - w * 0.12}" y="${-b * 0.6}" width="${w * 0.1}" height="${h * 1.2}" rx="4" fill="${C.serene || "#ABA597"}"/>
    ${Array.from({ length: label }, (_, i) => `<circle cx="${a - w * 0.5 + i * 14}" cy="${b * 0.75 - 2}" r="4" fill="url(#gMol${i + 1})"/>`).join("")}
  </g>`;
}

// ---------- estômago com sleeve: o que fica (tubo) em cor cheia, o que sai apagado, grampos no corte ----------
export function stomachSleeve() {
  const whole = "M58,8 C30,22 14,60 22,96 C30,136 64,174 110,176 C148,178 166,150 156,122 C148,100 122,96 104,86 C84,76 78,52 82,30 C84,16 72,6 58,8 Z";
  const sleeve = "M58,8 C50,30 48,60 54,90 C60,120 78,150 110,176 C148,178 166,150 156,122 C148,100 122,96 104,86 C84,76 78,52 82,30 C84,16 72,6 58,8 Z";
  const cut = "M58,8 C50,30 48,60 54,90 C60,120 78,150 110,176";
  const esoph = `<path d="M60,-30 C60,-14 62,0 66,10 L90,10 C86,0 84,-14 84,-30 Z" fill="${C.stomach}" stroke="${C.stomachLo}" stroke-opacity="0.6" stroke-width="1.5"/>`;
  const duod = `<path d="M110,176 C122,184 134,192 150,194 C160,195 168,190 170,182" fill="none" stroke="${C.stomach}" stroke-width="14" stroke-linecap="round"/><path d="M110,176 C122,184 134,192 150,194 C160,195 168,190 170,182" fill="none" stroke="${C.stomachLo}" stroke-opacity="0.5" stroke-width="1.5"/>`;
  const staples = Array.from({ length: 9 }, (_, i) => { const t = (i + 0.5) / 9; const x = 58 - 10 * Math.sin(t * Math.PI) + 52 * t * t, y = 8 + 168 * t; return `<rect x="${(x - 5).toFixed(1)}" y="${(y - 1.5).toFixed(1)}" width="10" height="3" rx="1.5" fill="${C.ink}" transform="rotate(${(-20 + 60 * t).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join("");
  return `<g>${esoph}<path d="${whole}" fill="${C.stomach}" opacity="0.28" stroke="${C.stomachLo}" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="5 5"/>
    ${duod}<path d="${sleeve}" fill="${C.stomach}" stroke="${C.stomachLo}" stroke-opacity="0.6" stroke-width="1.5"/>
    <path d="M70,40 C76,70 86,110 108,150" fill="none" stroke="${C.stomachLo}" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round"/>
    <path d="${cut}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="6 5"/>${staples}</g>`;
}

// Estilo: "flat" (padrão, chapado, mais vetorial) ou "shaded" (degradês e sombras).
export const STYLE = process.env.ILLUS_STYLE || "flat";
const FLAT_MAP = { gMuscle: C.muscle, gMuted: C.muted, gTendon: C.tendon, gVessel: C.vessel, gSkin: C.skin, gFat: C.fat, gLiver: C.liver,
  gBrain: C.brain, gLumen: C.lumen, gRbc: C.rbc, gMito: C.mito, gMol1: C.mol1, gMol2: C.mol2, gMol3: C.mol3, gSat: C.satellite };
export function flatten(markup) {
  if (STYLE !== "flat") return markup;
  let out = markup.replace(/filter="url\(#(shadow|soft)\)"/g, "");
  for (const [id, color] of Object.entries(FLAT_MAP)) out = out.split(`url(#${id})`).join(color);
  return out;
}
export const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs()}${flatten(inner)}</svg>\n`;
