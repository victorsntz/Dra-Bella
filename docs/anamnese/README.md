# Anamnese de referências

Posts de outras contas que servem de ponto de partida pra um carrossel da Bella. O fluxo:

1. `python3 docs/anamnese/puxa_post.py "LINK"` (um link por vez; o Instagram limita o ritmo).
   Precisa de `requests` (`pip install requests`). Sai em `docs/anamnese/posts/<arroba>/<codigo>/`
   com `01.jpg…`, `legenda.txt` e `meta.json`. Essa pasta fica fora do git.
2. Ler cada slide com a ferramenta de imagem (não pela página normal do post: sem login ela vem vazia).
3. Adaptar pra realidade dos conteúdos dela: a tese (quatro raízes, peso é fruto, obesidade crônica),
   o público (mulheres), a voz (`brand/VOICE.md`). O post de origem dá o ângulo e a estrutura;
   o conteúdo é reescrito, nunca copiado.
4. Seguir o fluxo normal: `content/<slug>.json`, cena, draw, render, check, folha de contato, zip.

Se a página de embed vier só com a primeira imagem, a legenda ainda chega; às vezes ela basta
(posts de notícia). Carrossel inteiro costuma vir quando o agente de celular é aceito.
