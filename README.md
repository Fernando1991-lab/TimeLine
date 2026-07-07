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
  área. A checagem de "está visível?" usa a geometria real do território
  (via `@turf/boolean-intersects`), não só a caixa delimitadora — senão um
  território enorme e irregular (ex.: um domínio que se estende por meio
  continente) "reservava" a vaga de rótulo em qualquer tela que sua caixa
  delimitadora tocasse, mesmo estando de fato bem longe dali, fazendo
  territórios realmente visíveis ficarem sem nome. O ranking prioriza estados/impérios nomeados (curados em
  `src/lib/curatedTerritories.ts`) sobre regiões genéricas de
  "caçadores-coletores"/"nômades" do dataset, que são enormes em área mas
  pouco relevantes historicamente. Nomes em português também vêm desse
  arquivo curado, que hoje traduz os ~1720 nomes únicos do dataset (das
  34 snapshots vendorizadas) — cobertura de 100%. Se você adicionar anos
  novos ao dataset, nomes que não existiam antes vão aparecer em inglês
  até serem adicionados a `CURATED_TERRITORIES`. O rótulo é posicionado no centro de massa do
  território, "grudado" na área visível quando esse centro cai fora da
  tela — do contrário um território enorme (ex.: um domínio nômade que
  cobre metade do continente) perderia o rótulo sempre que você olhasse
  para apenas um pedaço dele.
- **Territórios sem nome no dataset**: aparecem num tom acinzentado
  neutro e discreto (mais apagado que os territórios reais, mas ainda
  claramente terra, não oceano) — no dataset original esses polígonos
  representam terra sem um estado/povo definido atribuído naquele
  período, não é erro de carregamento. Uma legenda no canto explica isso,
  e as maiores dessas áreas ganham uma nota discreta "sem dados" no mapa.
- **Resumo por época**: clicar num território abre um painel com um resumo
  histórico daquele lugar **na era mostrada no slider** — clicar em "China"
  em 1 a.C. mostra a dinastia Han; em 1700, a dinastia Qing; em 2010, a
  China moderna. Os resumos são pré-gerados e ficam em
  `src/lib/territorySummaries.ts` (nenhuma chamada de API/rede em tempo de
  execução — funciona 100% offline). Cada território tem uma ou mais faixas
  de anos com texto próprio; a busca escolhe a faixa que contém o ano atual
  (ou a mais próxima). É uma lista curada de ~560 territórios — estados,
  impérios, canatos, colônias e também categorias amplas de povos
  pré-históricos/indígenas (ex.: "caçadores-coletores da Amazônia", que é o
  que aparece ao clicar em boa parte da América do Sul antes da colonização).
  Territórios fora dessa lista mostram um aviso de fallback. Para
  adicionar/editar, mexa em `TERRITORY_SUMMARIES`.
- **Busca de território**: campo de busca no canto superior esquerdo
  (`src/components/TerritorySearch.tsx`) para achar um território pelo nome
  em português sem precisar navegar o mapa manualmente. Ao escolher um
  resultado, o app pula para o ano em que aquele território teve sua maior
  extensão territorial (seu "auge", pré-calculado — veja abaixo), centraliza
  o mapa nele e já abre o resumo. O índice de busca
  (`public/data/historical-basemaps/territory-index.json`) é gerado por
  `scripts/build-territory-index.mjs`, que varre todos os snapshots e
  guarda, para cada um dos ~1720 territórios nomeados, o ano/centro de
  maior área — rode `npm run data:territory-index` depois de adicionar ou
  editar anos do dataset.
- **Reivindicações coloniais (camada curada nossa)**: o dataset representa
  as Américas/África/Ásia sobretudo por *povos* (indígenas) e não desenha
  as colônias europeias da era moderna. Para preencher essa lacuna,
  `src/lib/colonialClaims.ts` adiciona uma camada *nossa*, sobreposta à
  fonte, com as principais reivindicações coloniais (Portugal, Espanha,
  França, Grã-Bretanha, Países Baixos) para 1500, 1600 e 1700. São
  renderizadas com hachura + contorno tracejado (a convenção de "reivindicação",
  distinta de território sólido), rotuladas e clicáveis com resumo próprio.
  **As geometrias são propositalmente esquemáticas e aproximadas** — regiões
  amplas, não fronteiras precisas; "controle colonial" nessa época é fuzzy
  (costa efetivamente ocupada vs. reivindicação por tratado vs. esfera de
  influência). A legenda deixa isso explícito. É assim que o Brasil
  português aparece na costa em 1500/1600, junto com o interior indígena.
- **Marcadores de "lacuna conhecida"**: em alguns anos, o dataset deixa
  regiões inteiras em branco ("sem dados") onde, na verdade, sabemos bem
  quem vivia ali — por exemplo, a Inglaterra em 700 d.C. só tem "Cantia"
  (Kent) e "Dumnonia" nomeadas, enquanto o resto da Heptarquia
  anglo-saxônica (Wessex, Mércia, Nortúmbria etc.) fica em branco.
  `src/lib/knownGapPeoples.ts` adiciona pequenos marcadores pontuais
  (sem polígono, só um ponto clicável com "?" e sublinhado pontilhado
  roxo) para esses casos. A ideia original era buscar isso ao vivo na
  Wikidata via SPARQL, mas esse host é bloqueado pela política de rede
  deste ambiente de desenvolvimento — então, como os outros arquivos
  curados deste projeto, o conteúdo é pesquisado e escrito manualmente
  por nós, não gerado automaticamente. Cobertura atual: 55 povos/estados
  distintos (100 entradas contando repetições em anos diferentes),
  mapeados sistematicamente a partir das maiores áreas "sem dados" do
  dataset inteiro — Heptarquia anglo-saxônica e estepes russas (700),
  tribos celtas/ibéricas da Europa Ocidental (200 a.C.), culturas da
  Idade do Bronze da Europa/Ásia Central (2000 a.C.), culturas
  arqueológicas da Colômbia/Amazônia/Argentina (100 a.C.–1700), povos do
  sudoeste dos EUA e Mesoamérica (1000–1500), Reino Daju de Darfur
  (1279), Ternate/Tidore nas Molucas (1279–1400), Srivijaya/Langkasuka
  no Sudeste Asiático (100–700), confederações indígenas do leste da
  América do Norte no contato colonial (1500/1700), entre outros. Para
  adicionar mais casos, edite `KNOWN_GAP_MARKERS` (chave = ano do
  snapshot).
- **Postgres/Neon (opcional, legado)**: o projeto ainda inclui um schema
  Prisma, um seed e a rota `/api/empires` de uma abordagem anterior baseada
  em banco. Não é mais usada pelo painel (os resumos agora são estáticos),
  mas fica disponível caso você queira armazenar conteúdo editável num
  banco no futuro.

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
- `npm run data:territory-index` — regenera `territory-index.json` (índice
  usado pela busca de território) a partir dos mesmos arquivos
