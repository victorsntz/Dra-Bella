# Dra. Bella · gerador de carrosséis

Carrosséis de Instagram (1080 x 1350) para a **Dra. Izabella Brasão** (@bellabrasao),
construídos a partir de um JSON de conteúdo e renderizados com a identidade dela:
Cherston nos títulos, Montserrat no corpo, paleta Deep Coffee / Cozy Brown / Serene Sand / Soft Cream.

A estrutura visual segue a referência em `references/dr-longevity/`: título grande em serifa,
ilustração anatômica com etiquetas, @ no canto superior esquerdo, assinatura com seta no canto inferior direito.

## Rodar

```bash
npm install
npm run render               # renderiza todos os carrosséis de content/
npm run render musculo-remedio
npm run sheet                # + folha de contato (precisa do ImageMagick)
```

Saída em `output/<nome>/01.jpg … NN.jpg` e `output/<nome>/legenda.txt`.
Preview no navegador: abra `build/<nome>/index.html?preview`.

Chromium: o Playwright baixa sozinho na primeira vez (`npx playwright install chromium`).

## Criar um carrossel novo

1. Copie `content/musculo-remedio.json` pra `content/<novo-nome>.json`.
2. Escreva os slides seguindo `brand/VOICE.md` (como ela fala, o que ela nunca diz).
3. Gere as ilustrações com os prompts em `assets/illustrations/PROMPTS.md` e salve em
   `assets/illustrations/<novo-nome>/`. Enquanto a imagem não existe, o slide mostra um placeholder
   com a descrição.
4. `npm run render <novo-nome>`.

### Tipos de slide

| `type` | Pra quê | Campos |
|---|---|---|
| `cover` | Capa: título enorme à esquerda, ilustração à direita | `title`, `lead`, `figure` |
| `diagram` | Título, frase de abertura, ilustração grande, bullets | `title`, `lead`, `figure`, `bullets`, `note` |
| `text` | Título, parágrafos, ilustração embaixo | `title`, `paragraphs`, `bullets`, `figure` |
| `closing` | Só texto, o fechamento da ideia | `paragraphs` |
| `cta` | Pergunta pra leitora comentar | `title`, `lead`, `hint` |

Formatação dentro de qualquer texto: `**negrito**` (Montserrat Semibold, ou Cherston Regular no título),
`*destaque*` (marrom), quebra de linha com `\n`. Em bullets, `Nome → efeito` vira chave em negrito + seta.

### Etiquetas na ilustração

```json
"figure": {
  "src": "assets/illustrations/<carrossel>/01-nome.png",
  "placeholder": "o que a ilustração deve mostrar",
  "labels": [
    { "x": 18, "y": 12, "text": "BDNF", "tone": "coffee", "sub": ["↑ Neuroplasticidade"] }
  ]
}
```

`x` e `y` são porcentagens dentro da figura. `tone`: `cream` (padrão), `sand`, `coffee`, `brown`, `outline`.

## Marca

- `brand/brand.css` tokens de cor e tipografia (fonte: manual de identidade "Izabella Brasão ID").
- `brand/brand.json` nome, tagline, @ e caminho do logo. Solte o monograma em `brand/logo.svg` e ele entra no rodapé.
- `brand/VOICE.md` guia de linguagem compilado dos briefings e dos roteiros aprovados.
- `brand/fonts/` Cherston Light e Regular (licença do cliente) e Montserrat variável (OFL).
