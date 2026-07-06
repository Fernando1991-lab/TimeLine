# Mapa dos Impérios

Mapa interativo com uma linha do tempo (slider) mostrando o crescimento e
declínio de impérios e povos ao longo da história. Feito com Next.js,
MapLibre GL e Prisma/Neon.

## Como funciona

- **Mapa**: `src/components/EmpireMap.tsx` renderiza polígonos de território
  com MapLibre GL. Não usa um serviço de tiles externo — o "mapa base" é só
  uma cor de fundo (oceano), e os próprios territórios GeoJSON formam os
  continentes. Isso evita depender da disponibilidade/limites de um provedor
  de tiles de terceiros.
- **Dados históricos**: `public/data/historical-basemaps/` contém uma
  amostra curada de anos (veja `manifest.json`) extraída do projeto
  open-source [historical-basemaps](https://github.com/aourednik/historical-basemaps)
  (licença GPLv3, baseado em atlas históricos tipo Euratlas). São fronteiras
  **aproximadas** — o dataset não pretende ser preciso ano a ano, e alguns
  nomes têm problemas de encoding na fonte original (ex.: acentos quebrados).
  Para adicionar mais anos, baixe o `world_<ano>.geojson` correspondente do
  repositório acima para essa pasta e rode `npm run data:manifest`.
- **Slider**: `src/components/TimelineSlider.tsx` navega pelos snapshots
  disponíveis (não é uma escala contínua de anos — pula de snapshot em
  snapshot) e tem play/pause automático.
- **Rótulos no mapa**: `src/lib/territoryLabels.ts` mostra o nome dos
  territórios via marcadores HTML (não usamos `symbol` layers do MapLibre
  para evitar depender de um servidor de fontes/glyphs externo). A
  quantidade de rótulos visíveis cresce com o zoom (12 no mundo todo, até
  ~90 num continente/região) e só mostra o que está dentro da área visível
  — é assim que territórios pequenos mas importantes (Babilônia, por
  exemplo) aparecem ao aproximar, mesmo sem entrar no ranking global por
  área. O ranking prioriza estados/impérios nomeados (curados em
  `src/lib/curatedTerritories.ts`) sobre regiões genéricas de
  "caçadores-coletores"/"nômades" do dataset, que são enormes em área mas
  pouco relevantes historicamente. Nomes em português também vêm desse
  arquivo curado — é uma lista manual (hoje cobre uns 170 territórios),
  não cobre 100% dos ~1700 nomes únicos do dataset (o que não está lá
  aparece em inglês, principalmente ao dar zoom bem próximo em regiões
  menos curadas). Para adicionar/traduzir mais territórios, edite
  `CURATED_TERRITORIES`.
- **Conteúdo curado**: clicar num território consulta `/api/empires?name=...`,
  que busca no Postgres (via Prisma) uma descrição para aquele nome. Sem
  `DATABASE_URL` configurado, o mapa funciona normalmente e só não mostra
  descrição nenhuma (fallback gracioso).

## Setup local

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — funciona sem banco de dados nenhum.

## Configurando o Neon (Postgres)

1. Crie um projeto gratuito em https://neon.tech.
2. Copie a connection string e coloque em `.env` como `DATABASE_URL`
   (veja `.env.example` para o formato esperado).
3. Rode a migração e o seed de exemplo:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

O seed (`prisma/seed.ts`) cadastra 3 impérios de exemplo (Roma, Mongóis,
Otomano). O `name` de cada registro precisa bater com a propriedade
`NAME`/`SUBJECTO` usada no GeoJSON para aparecer no painel lateral — adicione
mais entradas ali conforme for curando conteúdo.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Adicione a variável de ambiente `DATABASE_URL` (a mesma do Neon) nas
   configurações do projeto.
3. Deploy — o `postinstall` do projeto roda `prisma generate` automaticamente
   após o `npm install`, antes do `next build`.

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` / `npm run start` — build e servidor de produção
- `npm run lint` — ESLint
- `npm run db:migrate` — aplica o schema do Prisma no Postgres configurado
- `npm run db:seed` — popula os impérios de exemplo
- `npm run data:manifest` — regenera `manifest.json` a partir dos arquivos
  `world_*.geojson` em `public/data/historical-basemaps/`
