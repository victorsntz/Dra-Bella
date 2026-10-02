# Manual de ilustração · Dra. Izabella Brasão

Regras pra qualquer ilustração nova sair no mesmo traço. O código em `src/draw/parts.mjs` já
aplica tudo isso; este texto existe pra quem desenha fora do código (Figma, Illustrator) ou pra
quem vai criar uma peça nova.

## 1. Traço

- **Chapado.** Cor sólida por forma. Sem degradê, sem sombra projetada, sem brilho especular.
- **Contorno fino** de 1,5 px no tom escuro da própria peça (músculo com contorno café-rosado,
  fígado com contorno vinho, e assim por diante), em 50 a 70% de opacidade.
- **Luz em forma, não em gradiente.** Uma única forma branca a 18 a 22% de opacidade no terço
  superior da peça. Nas esferas, um círculo pequeno a 55% deslocado pro canto superior esquerdo.
- **Linhas internas** (fibras do músculo, giros do cérebro, cristas da mitocôndria) no tom escuro
  da peça, 30 a 55% de opacidade, pontas arredondadas.
- **Fundo sempre transparente.** O slide dá o creme.

## 2. Cores por peça

| Peça | Base | Escuro (contorno, linhas) | Claro (luz) |
|---|---|---|---|
| Músculo | `#B9776A` | `#8A4F43` | `#E0AE9F` |
| Tendão | `#EFE9DE` | `#CFC5B4` | |
| Gordura | `#EBDCBB` | `#CDB48A` | `#F7EEDA` |
| Fígado | `#9B6557` | `#6E4036` | `#BC8575` |
| Cérebro | `#D9BBB0` | `#B38E85` | `#EDD9D0` |
| Vaso | `#C4807A` | `#95574F` | `#DEA69E` |
| Hemácia | `#B2534B` | | `#D27B72` |
| Mitocôndria | `#CDA893` | `#8E5A4C` | `#E8CFBF` |
| Célula satélite | `#9C8FA8` | `#6F6380` | |
| Pele | `#EBDFD2` | `#CDB9A6` | |
| Cabelo | `#4A3A32` | | |
| Peça apagada (apoio) | `#CBAE9F` | `#A98B7D` | |

Todas derivam da paleta do manual (Deep Coffee, Cozy Brown, Serene Sand, Soft Cream) puxadas
pro rosa-terroso. Nada saturado. Se precisar de uma cor nova, ela nasce dessas: mais escura,
mais clara ou mais pro rosa. Nunca verde, azul puro ou amarelo vivo.

## 3. Moléculas

Esferas pequenas em fluxo, três tons com significado:

| Tom | Cor | Quando usar |
|---|---|---|
| 1 · azul-acinzentado | `#A9B3BC` | sinal nervoso ou imune (BDNF, IL-10, IL-1ra) |
| 2 · areia | `#ABA597` | sinal metabólico (IL-6, mionectina, FGF21) |
| 3 · bege | `#CFBEA8` | sinal ligado a gordura e energia (irisina) |
| mistura | os três | fluxo geral, "o corpo todo recebe" |

O fluxo liga **origem a destino em arco**, nunca em linha reta. 6 a 12 esferas, raio de 4 a 10,
com um leve espalhamento pra não parecer colar de contas.

## 4. Composição no slide

A ilustração vive num **miolo** e as etiquetas (pílulas de nome e efeito) vivem nas **faixas**
em volta. Nada de desenho cruza faixa e nada de etiqueta cruza o miolo.

| Slide | Caixa da figura | Miolo da ilustração | Faixas |
|---|---|---|---|
| Capa | 520 × 900 | 520 × 900 | etiquetas sobre a figura, só pílula, sem legenda |
| Diagrama | 888 × 370 | 488 × 370 (ou 508) | colunas de 200 px (ou 190) à esquerda e à direita; topo e base centrais livres |
| Texto com figura | 888 × o que o texto deixar | caixa menos a faixa | faixa de 70 px no topo; se precisar, coluna de 170 px à direita |

**Regra do vazio:** em slide de texto com pouco texto (um ou dois parágrafos curtos), a cena é
composta numa caixa mais alta (888 × 520) com as peças maiores, pra preencher o espaço. O slide
nunca fica com um terço vazio. Com três parágrafos, a caixa é 888 × 380.

**Etiqueta sobre a peça (padrão):** a pílula vai em cima da peça que nomeia, na borda superior
dela, como na capa e na referência. Em figura de largura cheia, posicione em pixels da própria
cena (`sx`, `sy` no JSON). Faixas e colunas só quando a ilustração não tem onde receber a pílula.

**Etiquetas coladas:** uma etiqueta que vive numa faixa é ancorada na borda do miolo (`edge: top`,
`bottom`, `left` ou `right` no JSON) e invade a ilustração em 14 px, sempre por cima dela, nunca solta no meio da faixa.
A peça que ela nomeia encosta nessa mesma borda, do lado de dentro.

Dentro do miolo: a peça principal no centro, as secundárias nos cantos, cada uma inteira
(nunca cortada pela borda). Deixe vazio o canto que vai receber etiqueta na faixa ao lado.

## 5. Figura humana

Mulher, perfil, correndo pra direita. Lado perto do leitor com musculatura visível (músculo),
lado longe apagado (peça apoio). Cabelo preso em coque. Sem rosto desenhado. Pés e mãos em pele.
Em cena de apoio (ao lado de um órgão grande) usa a versão inteira apagada, em 30 a 35% do tamanho.

## 6. Criar uma peça nova

1. Desenhe numa caixa própria com origem no centro (ou no canto superior esquerdo, se for
   um órgão com silhueta). Anote a caixa no comentário da função.
2. Preencha com `url(#gNome)` e cadastre a cor chapada em `FLAT_MAP`. O gerador troca pelo
   sólido no modo padrão e mantém o degradê se alguém pedir `ILLUS_STYLE=shaded`.
3. Contorno 1,5 px no tom escuro, luz em forma, linhas internas. Sem `filter`.
4. Use em uma cena com `g(x, y, peca(), { s, r })`. Confira no slide com `npm run draw` e
   `npm run render`.
