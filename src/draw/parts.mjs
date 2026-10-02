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
  return `<g ${shadow ? 'filter="url(#shadow)"' : ""}>${tend}<path d="${belly}" fill="${fill}"/>${hi}${fib}${cutFace}</g>`;
}

// ---------- cérebro (caixa 220x170, canto em 0,0) ----------
export function brain({ neurons = false } = {}) {
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
  return `<g filter="url(#shadow)"><path d="${stem}" fill="${C.brainLo}"/><path d="${cereb}" fill="${C.brain}" stroke="${C.brainLo}" stroke-width="1.5"/>
    <path d="${outline}" fill="url(#gBrain)"/>${gyri}${neur}</g>`;
}

// ---------- fígado (caixa 220x140) ----------
export function liver() {
  const d = "M10,60 C10,25 50,10 95,12 C150,14 210,30 212,70 C214,100 180,122 140,126 C100,130 60,135 35,115 C15,100 8,80 10,60 Z";
  return `<g filter="url(#shadow)"><path d="${d}" fill="url(#gLiver)"/>
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
    <path d="M${-a},${-b} L${a},${-b} L${a},${b} L${-a},${b} Z" fill="url(#gVessel)"/>
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
  return `<g filter="url(#shadow)"><ellipse rx="100" ry="55" fill="url(#gMito)"/><ellipse rx="86" ry="42" fill="${C.mitoHi}" opacity="0.55"/>${cristae}
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
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#gMol${tone})"/>`;
}
export function stream({ from, to, ctrl, n = 12, rmin = 4, rmax = 10, tone = 1, seed = 1, spread = 14 }) {
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
    out += sphere(x + jx, y + jy, r, tn);
  }
  return `<g filter="url(#soft)">${out}</g>`;
}

// ---------- figura correndo, musculatura visível (caixa 520x900) ----------
export function runner({ muted = false } = {}) {
  const fill = muted ? "url(#gMuted)" : "url(#gMuscle)";
  const base = muted ? C.muted : C.muscle;
  const seg = (A, B, t, color) => `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${color}" stroke-width="${t}" stroke-linecap="round"/>`;
  const lens = (A, B, { h, off = 0, frac = 0.9, shift = 0, fibers = 6 } = {}) => {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const mx = (A[0] + B[0]) / 2 + (dx / L) * shift, my = (A[1] + B[1]) / 2 + (dy / L) * shift;
    const nx = -dy / L, ny = dx / L;
    return g(mx + nx * off, my + ny * off, muscle({ w: L * frac, h, fill, fibers, tendons: true, shadow: false }), { r: ang });
  };
  // articulações (perfil, correndo pra direita)
  const H = [318, 118], N = [300, 172], S = [286, 202], P = [228, 440];
  const E1 = [338, 302], W1 = [394, 226];           // braço da frente
  const S2 = [272, 208], E2 = [196, 292], W2 = [152, 236]; // braço de trás
  const K1 = [338, 570], A1 = [322, 712];           // perna da frente
  const P2 = [222, 446], K2 = [166, 590], A2 = [120, 712]; // perna de trás
  const farTone = C.mutedLo;
  const far = `<g opacity="0.95">
    ${seg(S2, E2, 30, farTone)}${seg(E2, W2, 24, farTone)}
    ${seg(P2, K2, 50, farTone)}${seg(K2, A2, 34, farTone)}
    <path d="M${A2[0] + 10},${A2[1] - 12} L${A2[0] - 34},${A2[1] + 40} L${A2[0] - 20},${A2[1] + 52} L${A2[0] + 22},${A2[1] + 4} Z" fill="${C.skinLo}"/>
    <ellipse cx="${W2[0]}" cy="${W2[1]}" rx="12" ry="16" fill="${C.skinLo}" transform="rotate(20 ${W2[0]} ${W2[1]})"/>
    ${g(0, 0, lens(P2, K2, { h: 40, frac: 0.8, fibers: 4 }).replace("url(#gMuscle)", "url(#gMuted)"))}
  </g>`;
  const torso = `<g filter="url(#shadow)">
    <path d="M306,170 C336,196 356,236 352,282 C350,330 338,370 318,402 C310,428 304,446 300,456 L214,462 C216,430 220,400 226,366 C236,318 246,266 262,232 C270,214 278,190 284,172 Z" fill="${fill}"/>
    ${g(330, 248, muscle({ w: 76, h: 46, fill, fibers: 5, tendons: false, shadow: false }), { r: -18 })}
    ${g(262, 300, muscle({ w: 120, h: 54, fill, fibers: 6, tendons: false, shadow: false }), { r: -72 })}
    ${[[330, 306], [326, 344], [318, 382]].map(([x, y]) => `<rect x="${x - 18}" y="${y - 14}" width="36" height="28" rx="9" fill="${C.muscleHi}" opacity="0.55"/><rect x="${x - 18}" y="${y - 14}" width="36" height="28" rx="9" fill="none" stroke="${C.fiber}" stroke-opacity="0.35"/>`).join("")}
    ${[0, 1, 2, 3].map((i) => `<path d="M${292 - i * 10},${330 + i * 18} C${286 - i * 10},${352 + i * 18} ${280 - i * 10},${372 + i * 18} ${276 - i * 10},${392 + i * 18}" fill="none" stroke="${C.fiber}" stroke-opacity="0.3" stroke-width="2"/>`).join("")}
  </g>`;
  const neck = seg(N, [310, 150], 26, base);
  const head = `<g filter="url(#shadow)"><circle cx="${H[0]}" cy="${H[1]}" r="44" fill="url(#gSkin)"/>
    <path d="M276,110 C276,70 304,60 326,66 C348,70 362,86 358,104 C340,96 318,96 302,106 C292,114 286,124 284,138 C278,132 274,122 276,110 Z" fill="${C.hair}"/>
    <circle cx="268" cy="118" r="20" fill="${C.hair}"/><path d="M356,110 C362,116 364,124 360,130" fill="none" stroke="${C.skinLo}" stroke-width="3" stroke-linecap="round"/></g>`;
  const nearLegs = `<g filter="url(#shadow)">
    ${seg(P, K1, 54, base)}${seg(K1, A1, 38, base)}
    ${lens(P, K1, { h: 60, off: -8, frac: 0.88, fibers: 6 })}${lens(P, K1, { h: 40, off: 22, frac: 0.8, fibers: 4 })}
    ${lens(K1, A1, { h: 42, off: 12, frac: 0.72, shift: -14, fibers: 5 })}${lens(K1, A1, { h: 22, off: -10, frac: 0.8, fibers: 3 })}
    <circle cx="${K1[0]}" cy="${K1[1]}" r="17" fill="${C.tendon}" opacity="0.9"/>
    <path d="M${A1[0] - 16},${A1[1]} L${A1[0] + 62},${A1[1] + 14} L${A1[0] + 56},${A1[1] + 30} L${A1[0] - 22},${A1[1] + 26} Z" fill="url(#gSkin)"/>
  </g>`;
  const nearArm = `<g filter="url(#shadow)">
    ${seg(S, E1, 34, base)}${seg(E1, W1, 28, base)}
    ${lens(S, E1, { h: 38, off: -6, frac: 0.8, fibers: 4 })}${lens(E1, W1, { h: 30, off: 4, frac: 0.78, shift: -6, fibers: 4 })}
    <circle cx="${S[0] + 6}" cy="${S[1] - 6}" r="24" fill="${fill}"/>
    <ellipse cx="${W1[0] + 6}" cy="${W1[1] - 10}" rx="13" ry="17" fill="url(#gSkin)" transform="rotate(-30 ${W1[0]} ${W1[1]})"/>
  </g>`;
  return `<g>${far}${torso}${neck}${head}${nearLegs}${nearArm}</g>`;
}

export const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs()}${inner}</svg>\n`;
