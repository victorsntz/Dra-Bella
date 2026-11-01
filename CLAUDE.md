# Carrosséis da Dra. Izabella Brasão (@bellabrasao)

Gerador de carrosséis de Instagram (1080 × 1350) da Bella: conteúdo em `content/<slug>.json`,
ilustração vetorial em código (`src/draw/scenes/<slug>.mjs`, peças em `src/draw/parts.mjs`),
render com Playwright. Quem pede é o Victor Fortunato (agência); quem aprova é a Bella.
Escreva com o Victor em português simples, sem travessão, com humor quando couber.

## Antes de mexer em qualquer carrossel

Leia `brand/VOICE.md` (voz, tese, legenda) e `brand/ILLUSTRATION-GUIDE.md` (traço, composição).

## Fluxo

```bash
node src/draw.mjs <slug>      # cenas → assets/illustrations/<slug>/*.svg
node src/render.mjs <slug>    # → output/<slug>/01..NN.jpg, legenda.txt, <slug>.zip
node src/check.mjs <slug>     # estouro, pílula fora, figura faltando, fonte sem acento
montage output/<slug>/0?.jpg -tile 4x -geometry 360x450+10+10 -background '#d9d5cd' output/<slug>/_folha-de-contato.jpg
node src/capas.mjs <slug> [<slug>...] --out capas-<nome>   # página de revisão em build/capas-<nome>/ (nunca use o nome de um slug: o render usa build/<slug>/)
```

Depois do check, **olhe a folha de contato** (leia a imagem). O check pega estouro; só o olho
pega pílula em cima de letra, palavra sozinha na linha, peça cortada, vazio no slide.

Entrega: o zip de `output/<slug>/` (JPGs numerados + legenda.txt, nada mais) e a página de
revisão publicada. Commits como Victor Fortunato <victorsantos.dsgn@gmail.com>, branch
`claude/intelligent-maxwell-bpuc2f`.

## Acentos nos títulos (lição de 31/out/2026)

A Bella reclamou de título sem acento. A causa era a fonte: a Cherston original montava o
"á" minúsculo só com o A, sem o acento, e todo "já", "há", "saudável", "hipotálamo" saía
errado. O arquivo em `brand/fonts/` já está consertado. Regras daqui pra frente:

- Se a Cherston for trocada ou reinstalada, rode `python3 src/confere_fonte.py --corrige`
  antes de renderizar. O `check.mjs` roda a conferência sozinho e acusa.
- Não force caixa alta com CSS pra "resolver" acento: o e, f, l, t, x minúsculos da Cherston
  têm desenho próprio e o visual aprovado muda.
- Antes de entregar, leia cada título na folha de contato procurando acento: á, à, â, ã, é,
  ê, í, ó, ô, õ, ú, ç. Se um acento sumir, é fonte, não texto.
- Escreva o texto com acento sempre (você, já, há, não, também, até, saúde, hormônio...).

## Blocos de texto equilibrados (lição de 31/out/2026)

O Victor apontou um "O" solto no fim da linha e "baixo." sozinho na última linha do subtítulo da
capa da caneta. Regra: nenhum bloco (título, subtítulo, parágrafo, bullet) termina linha com
palavra de 1 letra (o, a, e, é) nem com as miudinhas de ligação (de, da, do, em, no, na, um, os,
as, ao, ou, se, me, te), e nenhum bloco termina com uma palavra sozinha na última linha.

- O `render.mjs` já cuida disso sozinho (`tipografia()`: espaço que não quebra depois dessas
  palavras e entre as duas últimas do bloco) e o CSS equilibra as linhas (`text-wrap: balance`
  no título e no subtítulo, `pretty` nos parágrafos). Não tire isso.
- O `check.mjs` acusa palavra curta solta e viúva. Tem que passar limpo antes de entregar.
- Capa com quebra manual (`\n`) é responsabilidade sua: escolha onde quebrar pra nenhuma linha
  terminar em "um", "é", "o", "no", "da". Se precisar, reescreva a frase ("O ciclo dele / dura 24h"
  em vez de "Ele tem um / ciclo de 24h"). Uma palavra por linha na capa empilhada é desenho, ok.
- A cola deixa grupos maiores ("de·um·terço"): em capa estreita isso pode estourar a largura; o
  check acusa "texto cortado na largura" e aí você quebra à mão ou desce um degrau o título.

## Título: quanto cabe

Cherston é estreita só na aparência: a 112 px (padrão da capa, largura 510) cabem uns 8
caracteres por linha; a 96 px com largura 620, uns 11; a 84–88 px com largura 700–760, uns 13.
Quebre com `\n` e nunca deixe uma palavra sozinha na linha. Título de miolo quebra por volta de
30–32 caracteres.

## Regras fechadas com a Bella (não desfazer)

- Capa e último slide com o card de perfil; slides do meio sem marca, só a seta.
- Fundos alternam claro e café; nunca dois cafés seguidos.
- @ a 96 do topo, título 144 abaixo do @, rodapé a 144 da base.
- Pílula em cima da peça que nomeia, legendinha com caixa.
- Regra do vazio: pouco texto, cena maior. Nunca sobra um terço vazio.
- Gráfico comparativo (ele x ela, antes x depois): os dois do mesmo tamanho e no mesmo eixo.
- Ilustração chapada, no traço da biblioteca; objeto do mundo real (lata, boneca) também
  desenhado no nosso traço, nunca foto nem marca.
- Legenda: primeira linha "Primeiro siga @bellabrasao 🤍", 90 a 130 palavras, até 2 emojis.
- Conteúdo médico: mecanismo, nunca dose, valor de exame ou porcentagem crua. Dado de estudo
  com reserva. Liste no relatório o que a Bella precisa validar.

## Ritmo de trabalho

Combinado com o Victor (31/out/2026): a cada 3 a 5 carrosséis, o próximo lote vai pra um chat
novo. Fica melhor assim. Ao fechar um lote, lembre ele disso e deixe tudo commitado e no ar, pra
sessão nova começar só lendo este arquivo.

## Referência do Instagram

Link de post: `python3 docs/anamnese/puxa_post.py "LINK"` (um por vez; 429 é limite de ritmo).
Leia cada slide baixado com a ferramenta de imagem e adapte pra voz e tese da Bella. Os posts
baixados ficam fora do git.
