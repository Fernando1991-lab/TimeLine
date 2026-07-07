// Curated overlay of approximate European colonial claims, drawn BY US
// on top of the historical-basemaps dataset (which represents the
// Americas/Africa/Asia mostly by indigenous peoples and doesn't show
// early-modern European colonies). Rendered with a hatch fill + dashed
// border to read clearly as "claim overlay", NOT as solid territory.
//
// The geometries are deliberately SCHEMATIC and APPROXIMATE — broad
// regions, not precise borders. "Colonial control" in this era is itself
// fuzzy (effectively-held coast vs. treaty claim vs. sphere of
// influence), so treat these as an educational sketch, made explicit in
// the map legend. Keyed by the snapshot year they apply to.
import type { Feature, FeatureCollection, Geometry } from "geojson";

export type ColonialClaim = {
  name: string; // Portuguese display label (also the click key)
  color: string; // power color, used for the dashed border and label
  geometry: Geometry;
};

const POWER = {
  portugal: "#1b7a3d",
  spain: "#b3202e",
  france: "#1f4fa3",
  britain: "#6a2f8a",
  netherlands: "#d2691e",
};

function poly(rings: number[][][]): Geometry {
  return { type: "Polygon", coordinates: rings };
}
function multi(polys: number[][][][]): Geometry {
  return { type: "MultiPolygon", coordinates: polys };
}

// --- reusable enclave geometries (roughly stable across years) ---
const CARIBBEAN = multi([
  [[[-85, 20], [-74.5, 20.5], [-74, 23.2], [-84, 23.2], [-85, 20]]], // Cuba
  [[[-74.5, 18], [-68, 18], [-68.3, 20], [-74, 20], [-74.5, 18]]], // Hispaniola
]);
const NEW_SPAIN = poly([[
  [-106, 29], [-99, 25], [-92, 17], [-84, 9], [-83, 13], [-90, 18], [-98, 21], [-104, 24], [-106, 29],
]]);
const PHILIPPINES = poly([[[117, 6], [126, 7], [126, 18], [120, 19], [117, 12], [117, 6]]]);
const ANGOLA = poly([[[12, -9.5], [15.5, -9.5], [15.5, -6], [12, -6], [12, -9.5]]]);
const MOZAMBIQUE = poly([[[34, -20], [37.5, -20], [37.5, -15], [34, -15], [34, -20]]]);
const GOA = poly([[[73.5, 14.5], [74.6, 14.5], [74.6, 16], [73.5, 16], [73.5, 14.5]]]);
const MACAU = poly([[[112.8, 22], [113.9, 22], [113.9, 22.7], [112.8, 22.7], [112.8, 22]]]);
const DUTCH_EAST_INDIES = multi([
  [[[105, -8], [114, -8.5], [114, -6], [106, -5.5], [105, -8]]], // Java
  [[[126, -4], [128.5, -4], [128.5, 0], [126, 0], [126, -4]]], // Moluccas
]);

export const COLONIAL_CLAIMS: Record<number, ColonialClaim[]> = {
  1500: [
    {
      name: "Brasil (Portugal)",
      color: POWER.portugal,
      geometry: poly([[[-39, -12], [-37, -13], [-38.5, -17], [-41, -16], [-40, -12.5], [-39, -12]]]),
    },
    { name: "Caribe Espanhol", color: POWER.spain, geometry: CARIBBEAN },
  ],
  1600: [
    {
      name: "Brasil (Portugal)",
      color: POWER.portugal,
      geometry: poly([[
        [-35, -5], [-38.5, -13], [-42, -22], [-48.5, -25], [-51, -22], [-45, -18], [-41, -11], [-37, -6], [-35, -5],
      ]]),
    },
    { name: "Nova Espanha", color: POWER.spain, geometry: NEW_SPAIN },
    { name: "Caribe Espanhol", color: POWER.spain, geometry: CARIBBEAN },
    {
      name: "América Espanhola (Peru)",
      color: POWER.spain,
      geometry: poly([[
        [-81, 7], [-75, 1], [-71, -14], [-70, -25], [-71, -33], [-69, -28], [-67, -15], [-72, -4], [-79, 4], [-81, 7],
      ]]),
    },
    { name: "Filipinas (Espanha)", color: POWER.spain, geometry: PHILIPPINES },
    {
      name: "Nova França",
      color: POWER.france,
      geometry: poly([[[-72, 46], [-64, 48], [-68, 51], [-77, 49], [-74, 46], [-72, 46]]]),
    },
    { name: "Índias Orientais (Países Baixos)", color: POWER.netherlands, geometry: DUTCH_EAST_INDIES },
    { name: "Angola (Portugal)", color: POWER.portugal, geometry: ANGOLA },
    { name: "Goa (Portugal)", color: POWER.portugal, geometry: GOA },
    { name: "Macau (Portugal)", color: POWER.portugal, geometry: MACAU },
  ],
  1700: [
    {
      name: "Brasil (Portugal)",
      color: POWER.portugal,
      geometry: poly([[
        [-35, -5], [-40, -16], [-49, -26], [-58, -22], [-60, -12], [-52, -2], [-45, -1], [-38, -3], [-35, -5],
      ]]),
    },
    { name: "Nova Espanha", color: POWER.spain, geometry: NEW_SPAIN },
    { name: "Caribe Espanhol", color: POWER.spain, geometry: CARIBBEAN },
    {
      name: "América Espanhola (Peru)",
      color: POWER.spain,
      geometry: poly([[
        [-81, 7], [-75, 1], [-70, -14], [-64, -22], [-58, -34], [-63, -33], [-68, -25], [-70, -12], [-77, 0], [-81, 7],
      ]]),
    },
    { name: "Filipinas (Espanha)", color: POWER.spain, geometry: PHILIPPINES },
    {
      name: "Nova França",
      color: POWER.france,
      geometry: poly([[[-80, 44], [-64, 48], [-70, 52], [-84, 50], [-83, 45], [-80, 44]]]),
    },
    {
      name: "Luisiana (França)",
      color: POWER.france,
      geometry: poly([[[-92, 30], [-88, 32], [-90, 40], [-95, 42], [-98, 35], [-95, 30], [-92, 30]]]),
    },
    {
      name: "Treze Colônias (Grã-Bretanha)",
      color: POWER.britain,
      geometry: poly([[[-81, 31], [-76, 35], [-71, 42], [-67, 44], [-70, 41], [-76, 39], [-81, 32], [-81, 31]]]),
    },
    { name: "Índias Orientais (Países Baixos)", color: POWER.netherlands, geometry: DUTCH_EAST_INDIES },
    {
      name: "Colônia do Cabo (Países Baixos)",
      color: POWER.netherlands,
      geometry: poly([[[17, -35], [20.5, -35], [20.5, -32], [17, -32], [17, -35]]]),
    },
    { name: "Angola (Portugal)", color: POWER.portugal, geometry: ANGOLA },
    { name: "Moçambique (Portugal)", color: POWER.portugal, geometry: MOZAMBIQUE },
    { name: "Goa (Portugal)", color: POWER.portugal, geometry: GOA },
    { name: "Macau (Portugal)", color: POWER.portugal, geometry: MACAU },
  ],
};

// One summary per claim label (shared across the years it appears in).
export const COLONIAL_SUMMARIES: Record<string, string> = {
  "Brasil (Portugal)":
    "Faixa costeira reivindicada por Portugal após a chegada de Cabral em 1500, base do futuro Brasil. No início resumia-se a feitorias e engenhos de açúcar no litoral, expandindo-se lentamente rumo ao interior nos séculos seguintes — que permanecia habitado por povos indígenas.",
  "Caribe Espanhol":
    "Primeiras colônias espanholas nas Américas, nas ilhas de Hispaniola, Cuba e Porto Rico. Serviram de base para a conquista do continente e para o comércio atlântico.",
  "Nova Espanha":
    "Vice-Reino espanhol centrado no México, erguido sobre o antigo Império Asteca e abrangendo a América Central e o Caribe. Foi o coração do poder espanhol nas Américas, sustentado pela prata.",
  "América Espanhola (Peru)":
    "Domínios espanhóis ao longo dos Andes e da costa do Pacífico, estabelecidos sobre o antigo Império Inca, com centro em Lima. A prata de Potosí sustentava a economia colonial; mais tarde o poder espanhol estendeu-se até o Rio da Prata.",
  "Filipinas (Espanha)":
    "Colônia espanhola no Sudeste Asiático, administrada a partir de Manila e ligada ao México pelo comércio do galeão. Foi o principal posto espanhol na Ásia.",
  "Nova França":
    "Colônia francesa em torno do rio São Lourenço e dos Grandes Lagos, baseada no comércio de peles e na aliança com povos indígenas. Expandiu-se depois pelo interior norte-americano.",
  "Luisiana (França)":
    "Vasto território francês reivindicado ao longo do vale do rio Mississippi, ligando a Nova França ao golfo do México. Era imenso no mapa, mas escassamente povoado por colonos.",
  "Treze Colônias (Grã-Bretanha)":
    "Colônias britânicas ao longo da costa atlântica da América do Norte, que dariam origem aos Estados Unidos. Baseavam-se na agricultura, no comércio e em fortes comunidades de colonos.",
  "Índias Orientais (Países Baixos)":
    "Rede de feitorias e domínios neerlandeses no arquipélago indonésio, administrada pela Companhia das Índias Orientais a partir de Batávia. Controlava o lucrativo comércio de especiarias.",
  "Colônia do Cabo (Países Baixos)":
    "Entreposto neerlandês fundado em 1652 na ponta sul da África, para reabastecer navios na rota das Índias. Deu origem à colonização europeia da África do Sul.",
  "Angola (Portugal)":
    "Presença portuguesa na costa da África Centro-Ocidental, centrada em Luanda, ligada ao comércio e ao tráfico atlântico de escravizados rumo ao Brasil.",
  "Moçambique (Portugal)":
    "Postos portugueses ao longo da costa da África Oriental, herdeiros das antigas cidades suaílis, na rota marítima para a Índia.",
  "Goa (Portugal)":
    "Capital do Estado Português da Índia, principal base de Portugal no Oceano Índico e centro de seu comércio e administração no Oriente.",
  "Macau (Portugal)":
    "Entreposto português na costa da China, fundado em 1557, que se tornou um elo vital do comércio entre a China, o Japão e a Europa.",
};

const EMPTY_FC: FeatureCollection = { type: "FeatureCollection", features: [] };

// Builds the GeoJSON layer for a given snapshot year (empty if that year
// has no colonial claims). Each feature carries the label and color.
export function colonialFeatureCollection(year: number): FeatureCollection {
  const claims = COLONIAL_CLAIMS[year];
  if (!claims) return EMPTY_FC;
  const features: Feature[] = claims.map((claim) => ({
    type: "Feature",
    geometry: claim.geometry,
    properties: { name: claim.name, __color: claim.color },
  }));
  return { type: "FeatureCollection", features };
}

export function colonialSummary(name: string): string | null {
  return COLONIAL_SUMMARIES[name] ?? null;
}
