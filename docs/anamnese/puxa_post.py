#!/usr/bin/env python3
"""Puxa um post do Instagram pelo link: slides em imagem, legenda e metadados.

Uso:
    python3 docs/anamnese/puxa_post.py URL [URL ...] [--saida PASTA]

Cada post vira uma pasta  <saida>/<arroba>/<codigo>/  com:
    01.jpg, 02.jpg, ...   os slides, na ordem do carrossel (01.mp4 se for vídeo)
    legenda.txt           a legenda inteira
    meta.json             autor, data, tipo, curtidas, comentários, link

Caminho: a página /embed/captioned/ do próprio Instagram, pedida como celular.
Pra esse agente ela entrega o carrossel inteiro em JSON, sem login. Sem login o
Instagram limita o ritmo: muitos pedidos seguidos viram 429. Um link por vez.

Os arquivos baixados ficam fora do git (docs/anamnese/posts/ está no .gitignore):
são referência de estudo, não conteúdo nosso.
"""
import argparse, html, json, re, sys
from datetime import datetime, timezone
from pathlib import Path

import requests

UA = ("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 "
      "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
RE_CODIGO = re.compile(r"instagram\.com/(?:[^/]+/)?(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)")


def codigo_de(url):
    m = RE_CODIGO.search(url)
    if not m:
        sys.exit(f"Não achei o código do post em: {url}")
    return m.group(1)


def acha_media(pagina):
    """Procura o JSON do post dentro da página de embed."""
    for padrao, escapado in ((r"window\.__additionalDataLoaded\([^,]+,(\{.*?\})\);</script>", False),
                             (r'"contextJSON":"(.*?)"\}\]', True)):
        m = re.search(padrao, pagina, re.S)
        if not m:
            continue
        raw = m.group(1)
        if escapado:
            raw = json.loads(f'"{raw}"')
        try:
            blob = json.loads(raw)
        except json.JSONDecodeError:
            continue
        media = (blob.get("shortcode_media") or blob.get("graphql", {}).get("shortcode_media")
                 or blob.get("gql_data", {}).get("shortcode_media"))
        if media:
            return media
    return None


def puxa(url, saida):
    codigo = codigo_de(url)
    s = requests.Session()
    s.headers["User-Agent"] = UA
    r = s.get(f"https://www.instagram.com/p/{codigo}/embed/captioned/", timeout=30)
    r.raise_for_status()
    pagina = r.text
    media = acha_media(pagina)
    urls, legenda, meta = [], "", {"origem": "embed"}
    if media:
        filhos = media.get("edge_sidecar_to_children", {}).get("edges") or [{"node": media}]
        for f in filhos:
            n = f["node"]
            urls.append(n.get("video_url") or n.get("display_url"))
        cap = media.get("edge_media_to_caption", {}).get("edges") or []
        legenda = cap[0]["node"]["text"] if cap else ""
        dono = media.get("owner", {})
        ts = media.get("taken_at_timestamp")
        meta.update({
            "arroba": dono.get("username", ""), "autor": dono.get("full_name", ""),
            "data": datetime.fromtimestamp(ts, tz=timezone.utc).isoformat() if ts else "",
            "curtidas": media.get("edge_media_preview_like", {}).get("count"),
            "comentarios": media.get("edge_media_to_parent_comment", {}).get("count"),
        })
    else:
        # sem o JSON, a página de embed ainda pode mostrar a primeira imagem e a legenda
        m = re.search(r'class="EmbeddedMediaImage"[^>]+src="([^"]+)"', pagina)
        if not m:
            sys.exit(f"Não consegui puxar {url}: a página de embed veio sem imagem (bloqueio, 429 ou post privado). Espere uns minutos e tente de novo.")
        urls = [html.unescape(m.group(1))]
        c = re.search(r'<div class="Caption">(.*?)<div class="CaptionComments"', pagina, re.S)
        if c:
            legenda = html.unescape(re.sub(r"<br\s*/?>", "\n", re.sub(r"<[^>]+>", "", c.group(1)))).strip()
        a = re.search(r'class="UsernameText">([^<]+)<', pagina)
        meta["arroba"] = a.group(1) if a else ""
        meta["aviso"] = "só a primeira imagem: o Instagram não entregou o carrossel inteiro pelo embed"

    arroba = (meta.get("arroba") or "desconhecido").lstrip("@")
    final = Path(saida) / arroba / codigo
    if final.exists():
        for p in final.glob("*"):
            p.unlink()
    final.mkdir(parents=True, exist_ok=True)
    slides = []
    for i, u in enumerate(urls, 1):
        ext = ".mp4" if ".mp4" in u.split("?")[0] else ".jpg"
        novo = final / f"{i:02d}{ext}"
        novo.write_bytes(s.get(u, timeout=60).content)
        slides.append(novo)
    meta.update({
        "tipo": "carrossel" if len(slides) > 1 else ("video" if slides[0].suffix == ".mp4" else "estatico"),
        "codigo": codigo, "link": url, "slides": len(slides),
        "puxado_em": datetime.now().isoformat(timespec="seconds"),
    })
    (final / "legenda.txt").write_text(legenda or "", encoding="utf-8")
    (final / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ @{arroba}/{codigo}: {len(slides)} slide(s), {len(legenda)} letras de legenda")
    if meta.get("aviso"):
        print("  ⚠ " + meta["aviso"])
    return final


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("urls", nargs="+")
    ap.add_argument("--saida", default=str(Path(__file__).parent / "posts"))
    a = ap.parse_args()
    for u in a.urls:
        puxa(u, a.saida)
