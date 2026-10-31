#!/usr/bin/env python3
"""Confere se a fonte dos títulos (Cherston) desenha todos os acentos do português.

    python3 src/confere_fonte.py            # só confere
    python3 src/confere_fonte.py --corrige  # conserta o que der e salva

Por que existe: o arquivo original da Cherston vinha com o "á" minúsculo montado só
com a letra A, sem o acento. Como os títulos são escritos em minúsculas e a fonte
desenha tudo em caixa alta, todo "á" de título saía sem acento (já, há, saudável,
hipotálamo, bariátrica...). A Bella apontou isso em 31/out/2026. Se a fonte for
trocada ou reinstalada, rode este script antes de renderizar.

Precisa de fontTools (pip install fonttools).
"""
import copy, sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
except ImportError:
    print("confere_fonte: instale fonttools (pip install fonttools)"); sys.exit(2)  # 2 = não conferiu, não é erro de fonte

ROOT = Path(__file__).resolve().parent.parent
FONTES = [ROOT / "brand/fonts/Cherston-Light.ttf", ROOT / "brand/fonts/Cherston-Regular.ttf"]
# letra acentuada → (base, acento) esperados no glifo composto
ESPERADO = {
    "á": ("a", "acute"), "à": ("a", "grave"), "â": ("a", "circumflex"), "ã": ("a", "tilde"),
    "é": ("e", "acute"), "ê": ("e", "circumflex"), "í": (None, "acute"), "ó": ("o", "acute"),
    "ô": ("o", "circumflex"), "õ": ("o", "tilde"), "ú": ("u", "acute"), "ü": ("u", "dieresis"),
    "Á": ("A", "acute"), "À": ("A", "grave"), "Â": ("A", "circumflex"), "Ã": ("A", "tilde"),
    "É": ("E", "acute"), "Ê": ("E", "circumflex"), "Í": ("I", "acute"), "Ó": ("O", "acute"),
    "Ô": ("O", "circumflex"), "Õ": ("O", "tilde"), "Ú": ("U", "acute"),
}

def confere(path, corrige=False):
    t = TTFont(path); cmap = t.getBestCmap(); glyf = t["glyf"]; problemas = []
    for ch, (_, acento) in ESPERADO.items():
        nome = cmap.get(ord(ch))
        if not nome:
            problemas.append(f"{ch}: não existe na fonte"); continue
        g = glyf[nome]
        comps = [c.glyphName for c in g.components] if g.isComposite() else None
        if comps is not None and acento not in comps:
            problemas.append(f"{ch} ({nome}): montado como {'+'.join(comps)}, sem o {acento}")
    if corrige and problemas:
        # conserto conhecido: o á minúsculo vira cópia do Á com a base trocada por "a"
        nome = cmap.get(ord("á")); maiusc = cmap.get(ord("Á"))
        if nome and maiusc and glyf[maiusc].isComposite():
            novo = copy.deepcopy(glyf[maiusc])
            for c in novo.components:
                if c.glyphName == "A": c.glyphName = "a"
            glyf[nome] = novo; t["hmtx"][nome] = t["hmtx"][maiusc]
            t.save(path)
            return confere(path, corrige=False)
    return problemas

if __name__ == "__main__":
    corrige = "--corrige" in sys.argv
    falhou = False
    for f in FONTES:
        if not f.exists(): continue
        p = confere(f, corrige)
        if p:
            falhou = True
            print(f"✗ {f.name}"); [print("   " + x) for x in p]
        else:
            print(f"✓ {f.name}: todos os acentos desenhados")
    if falhou:
        print("  → rode: python3 src/confere_fonte.py --corrige")
    sys.exit(1 if falhou else 0)
