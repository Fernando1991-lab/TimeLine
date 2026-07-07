// Curated point markers for well-documented historical peoples/states
// that our main dataset (historical-basemaps) leaves as blank "sem
// dados" land for a given snapshot year. Originally we wanted to pull
// these live from Wikidata's SPARQL endpoint, but that host is blocked
// by this environment's network policy -- so, like curatedTerritories.ts
// and colonialClaims.ts, this is manually researched and curated by us.
//
// Deliberately just POINTS, not polygons: we don't have (and don't want
// to fabricate) precise borders for these -- the goal is only to signal
// "historians know someone specific lived here", not to claim exact
// territory shapes. Keyed by the snapshot year they apply to, same
// pattern as COLONIAL_CLAIMS.
export type KnownGapMarker = {
  name: string;
  lng: number;
  lat: number;
  note: string;
};

export const KNOWN_GAP_MARKERS: Record<number, KnownGapMarker[]> = {
  700: [
    {
      name: "Wessex",
      lng: -1.5,
      lat: 51.05,
      note: "Reino dos saxões ocidentais, um dos sete reinos da Heptarquia anglo-saxônica, centrado em torno de Winchester, no sul da Inglaterra. Viria a se tornar, séculos depois, o núcleo em torno do qual a Inglaterra se unificou.",
    },
    {
      name: "Mércia",
      lng: -1.7,
      lat: 52.6,
      note: "Reino anglo-saxão das Midlands inglesas, centrado em Tamworth. Sob reis como Penda e, mais tarde, Offa, foi por vezes o mais poderoso dos reinos da Heptarquia.",
    },
    {
      name: "Nortúmbria",
      lng: -1.8,
      lat: 55.0,
      note: "Reino anglo-saxão formado pela união de Bernícia e Deira, estendendo-se do rio Humber até a fronteira com os pictos, ao norte. Foi um importante centro de erudição cristã no período, sediando figuras como Beda, o Venerável.",
    },
    {
      name: "Ânglia Oriental",
      lng: 1.0,
      lat: 52.4,
      note: "Reino anglo-saxão dos anglos orientais, correspondendo aproximadamente a Norfolk e Suffolk, no leste da Inglaterra. O célebre tesouro funerário de Sutton Hoo pertence a um de seus reis.",
    },
    {
      name: "Essex",
      lng: 0.6,
      lat: 51.75,
      note: "Reino anglo-saxão dos saxões orientais, cobrindo a região que hoje leva seu nome e, por períodos, Londres. Um dos reinos menores e mais instáveis da Heptarquia, frequentemente sob a influência de vizinhos mais poderosos.",
    },
    {
      name: "Sussex",
      lng: -0.5,
      lat: 50.87,
      note: "Reino anglo-saxão dos saxões do sul, na costa sul da Inglaterra em torno de Chichester. Um dos reinos mais antigos da Heptarquia, embora com influência limitada na política inglesa por estar geograficamente isolado.",
    },
    {
      name: "Canato Cázaro",
      lng: 47.5,
      lat: 45.5,
      note: "Canato turco que dominava as estepes do baixo Volga e do norte do Cáucaso, com capital em Atil. Controlava rotas comerciais entre o mundo eslavo, bizantino e islâmico, e sua elite viria a se converter ao judaísmo décadas mais tarde.",
    },
    {
      name: "Búlgaros do Volga",
      lng: 49.1,
      lat: 55.2,
      note: "Povo turco em processo de estabelecimento na confluência dos rios Volga e Kama, após migrar das estepes pônticas. Nos séculos seguintes formariam um Estado próprio, a Bulgária do Volga, importante entreposto comercial entre a Rússia e o mundo islâmico.",
    },
  ],
};

export function knownGapMarkersFor(year: number): KnownGapMarker[] {
  return KNOWN_GAP_MARKERS[year] ?? [];
}

export function knownGapNote(name: string): string | null {
  for (const markers of Object.values(KNOWN_GAP_MARKERS)) {
    const match = markers.find((marker) => marker.name === name);
    if (match) return match.note;
  }
  return null;
}
