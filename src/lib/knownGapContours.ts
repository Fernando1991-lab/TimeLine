// Curated approximate polygon outlines for a SELECT subset of the
// "known gap" entries in knownGapPeoples.ts: only entities that were
// organized states/kingdoms/confederations with a reasonably
// well-documented approximate territorial extent (not nomadic tribes,
// diffuse hunter-gatherer populations, or archaeological "cultures"
// without a political center -- those stay as plain points).
//
// Reuses the exact same rendering technique as colonialClaims.ts (a
// GeoJSON polygon overlay), but styled distinctly (dotted violet
// border, no hatch fill) to read as "documented state, approximate
// shape" rather than "colonial claim". Deliberately schematic, same
// spirit as colonialClaims.ts -- not meant to be precise cartography.
//
// IMPORTANT: each `name` here must exactly match a name that appears
// somewhere in KNOWN_GAP_MARKERS (knownGapPeoples.ts) -- the map looks
// up the note text via knownGapNote(name), so these two files must stay
// in sync by name. Keyed by the snapshot year they apply to, same
// pattern as KNOWN_GAP_MARKERS and COLONIAL_CLAIMS.
import type { Feature, FeatureCollection, Geometry } from "geojson";

export type KnownStateContour = {
  name: string;
  color: string;
  geometry: Geometry;
};

function poly(rings: number[][][]): Geometry {
  return { type: "Polygon", coordinates: rings };
}

export const KNOWN_STATE_CONTOURS: Record<number, KnownStateContour[]> = {
  [-500]: [
    { name: "Citas (estepe pôntica)", color: "#7c3aed", geometry: poly([[[26, 48.5], [30, 50], [35, 50.5], [40, 49], [44, 47.5], [42, 45.5], [36, 45], [30, 46], [26, 48.5]]]) },
    { name: "Sacas (Ásia Central)", color: "#7c3aed", geometry: poly([[[55, 45], [60, 48], [68, 48], [75, 45], [73, 40], [68, 38], [62, 39], [57, 41], [55, 45]]]) },
  ],
  [-323]: [
    { name: "Reino de Lihyan (Dedã)", color: "#7c3aed", geometry: poly([[[36.8, 28.6], [38, 28.3], [38.3, 26.8], [37.8, 25], [36.9, 24.6], [36.3, 25.8], [36.4, 27.5], [36.8, 28.6]]]) },
  ],
  [-200]: [
    { name: "Eduos (Aedui)", color: "#7c3aed", geometry: poly([[[3.5, 47.5], [4.6, 47.4], [5, 46.8], [4.5, 46.2], [3.6, 46.3], [3.3, 46.9], [3.5, 47.5]]]) },
    { name: "Arvernos (Arverni)", color: "#7c3aed", geometry: poly([[[2.5, 46.1], [3.5, 46], [3.8, 45.3], [3.2, 44.7], [2.4, 44.9], [2.2, 45.6], [2.5, 46.1]]]) },
    { name: "Helvécios (Helvetii)", color: "#7c3aed", geometry: poly([[[6.1, 47.4], [7.5, 47.6], [9, 47.5], [9.5, 46.9], [8.5, 46.2], [7, 46.4], [6.3, 46.9], [6.1, 47.4]]]) },
    { name: "Lusitanos", color: "#7c3aed", geometry: poly([[[-9, 41.3], [-7.5, 41.5], [-6.2, 40.8], [-6, 39], [-7, 38.5], [-8.8, 38.8], [-9.3, 39.8], [-9, 41.3]]]) },
    { name: "Vascões (Vascones)", color: "#7c3aed", geometry: poly([[[-2.6, 43.2], [-1.2, 43.3], [-0.6, 42.7], [-0.9, 42.1], [-2, 42.1], [-2.7, 42.6], [-2.6, 43.2]]]) },
    { name: "Boios (Boii)", color: "#7c3aed", geometry: poly([[[12.7, 50.8], [14.5, 50.9], [16.3, 50.2], [15.8, 48.8], [13.5, 48.6], [12.5, 49.5], [12.7, 50.8]]]) },
    { name: "Escórdiscos (Scordisci)", color: "#7c3aed", geometry: poly([[[19.6, 45.3], [20.8, 45.4], [21.5, 44.9], [21, 44.2], [19.8, 44.3], [19.4, 44.8], [19.6, 45.3]]]) },
    { name: "Reino Ilírio dos Ardieus", color: "#7c3aed", geometry: poly([[[18.9, 42.6], [19.6, 42.5], [19.9, 42], [19.5, 41.4], [18.9, 41.5], [18.7, 42.1], [18.9, 42.6]]]) },
    { name: "Getas (Getae)", color: "#7c3aed", geometry: poly([[[23, 45.3], [26.5, 45.5], [28.2, 44.8], [27.5, 43.7], [24.5, 43.8], [22.8, 44.4], [23, 45.3]]]) },
    { name: "Bastarnas (Bastarnae)", color: "#7c3aed", geometry: poly([[[25.8, 48.8], [28.5, 49], [30, 47.8], [29, 46.6], [26.5, 46.8], [25.5, 47.8], [25.8, 48.8]]]) },
  ],
  [-1]: [
    { name: "Reino de Buyeo (Puyŏ)", color: "#7c3aed", geometry: poly([[[125, 46], [128, 47], [131, 45.5], [130.5, 43], [127.5, 42], [125, 43], [125, 46]]]) },
  ],
  [100]: [
    { name: "Langkasuka", color: "#7c3aed", geometry: poly([[[100.2, 7.3], [100.9, 7.6], [101.6, 7.2], [101.5, 6.2], [100.9, 5.5], [100.2, 5.7], [100.1, 6.5], [100.2, 7.3]]]) },
  ],
  [300]: [
    { name: "Langkasuka", color: "#7c3aed", geometry: poly([[[100.2, 7.3], [100.9, 7.6], [101.6, 7.2], [101.5, 6.2], [100.9, 5.5], [100.2, 5.7], [100.1, 6.5], [100.2, 7.3]]]) },
  ],
  [500]: [
    { name: "Reino de Cinda (Kindah)", color: "#7c3aed", geometry: poly([[[41, 26], [45, 26.5], [48, 24], [47, 19], [44, 16.5], [41.5, 18], [40, 21], [41, 26]]]) },
  ],
  [600]: [
    { name: "Sogdiana", color: "#7c3aed", geometry: poly([[[64, 39.9], [65, 40.3], [67.5, 40.2], [68.3, 39.9], [67, 38.7], [65.5, 38.6], [63.7, 39.2], [63.5, 39.7], [64, 39.9]]]) },
    { name: "Corásmia (Khwarazm)", color: "#7c3aed", geometry: poly([[[58.8, 42.8], [59.5, 43.4], [61, 43.3], [61.6, 42.5], [61.2, 41.5], [60, 41.2], [58.9, 41.8], [58.8, 42.8]]]) },
    { name: "Zhangzhung", color: "#7c3aed", geometry: poly([[[78.5, 33.5], [82, 34.5], [86, 33.5], [88.5, 31.5], [86, 29], [82, 28.5], [79, 29.5], [77.5, 31.5], [78.5, 33.5]]]) },
    { name: "Antes (Ucrânia)", color: "#7c3aed", geometry: poly([[[27, 49.5], [31, 50.5], [33.5, 49.5], [34, 47.5], [31, 46.3], [28, 46.5], [26.5, 48], [27, 49.5]]]) },
    { name: "Tocaristão (iabgus pós-heftalitas)", color: "#7c3aed", geometry: poly([[[65, 38.5], [68, 39.5], [70.5, 38], [71.5, 36], [69, 34.5], [66, 35], [64.5, 36.5], [65, 38.5]]]) },
  ],
  [700]: [
    { name: "Canato Cázaro", color: "#7c3aed", geometry: poly([[[36, 47.5], [40, 50.5], [48, 51.5], [54, 49], [52, 44.5], [47, 42], [41, 43], [36.5, 45], [36, 47.5]]]) },
    { name: "Búlgaros do Volga", color: "#7c3aed", geometry: poly([[[47, 56], [49, 56.5], [51.5, 55.8], [52, 54.5], [50, 53.7], [47.5, 54.2], [46.5, 55.2], [47, 56]]]) },
    { name: "Wessex", color: "#7c3aed", geometry: poly([[[-4.6, 50.4], [-4.6, 51.2], [-3, 51.3], [-2.5, 51.5], [-1.8, 51.6], [-1, 51.5], [-0.9, 51], [-1.4, 50.6], [-3.5, 50.3], [-4.6, 50.4]]]) },
    { name: "Mércia", color: "#7c3aed", geometry: poly([[[-3, 53.3], [-2.2, 53.4], [-1.3, 53.3], [-0.5, 52.9], [-0.3, 52.3], [-1, 51.8], [-2, 51.7], [-2.7, 52], [-3.2, 52.6], [-3, 53.3]]]) },
    { name: "Nortúmbria", color: "#7c3aed", geometry: poly([[[-1, 53.7], [-1.5, 54], [-3, 54.1], [-3.3, 54.8], [-3.5, 55.6], [-3.2, 56], [-2, 55.9], [-1.8, 55], [-0.4, 54], [-1, 53.7]]]) },
    { name: "Ânglia Oriental", color: "#7c3aed", geometry: poly([[[0.2, 52.9], [0.9, 52.95], [1.7, 52.8], [1.75, 52.2], [1.2, 51.95], [0.6, 52.1], [0.2, 52.5], [0.2, 52.9]]]) },
    { name: "Essex", color: "#7c3aed", geometry: poly([[[0.2, 51.95], [0.9, 51.9], [1.3, 51.7], [0.9, 51.5], [0.05, 51.5], [0, 51.75], [0.2, 51.95]]]) },
    { name: "Sussex", color: "#7c3aed", geometry: poly([[[-1, 51], [-0.7, 51.15], [0, 51.1], [0.3, 50.85], [-0.2, 50.75], [-0.8, 50.75], [-1, 51]]]) },
    { name: "Srivijaya", color: "#7c3aed", geometry: poly([[[99.5, 3.8], [103, 5.8], [106.2, 2], [106, -3], [105.5, -6], [102.5, -5.5], [99.8, -3], [99, 0.5], [99.5, 3.8]]]) },
    { name: "Cidades-Estado Pyu", color: "#7c3aed", geometry: poly([[[95.5, 23], [96.5, 21.5], [96, 19.5], [95.8, 17.5], [94.5, 17.8], [94.3, 19.5], [94.8, 21.5], [95.5, 23]]]) },
    { name: "Chenla (Chân Lạp), reino pré-angkoriano", color: "#7c3aed", geometry: poly([[[103, 14], [105.5, 14.3], [107, 13], [106.5, 10.5], [104.5, 10], [102.8, 11.5], [102.5, 13], [103, 14]]]) },
    { name: "Langkasuka", color: "#7c3aed", geometry: poly([[[100.2, 7.3], [100.9, 7.6], [101.6, 7.2], [101.5, 6.2], [100.9, 5.5], [100.2, 5.7], [100.1, 6.5], [100.2, 7.3]]]) },
  ],
  [900]: [
    { name: "Confederação Muísca", color: "#7c3aed", geometry: poly([[[-74.6, 5.9], [-74, 6.1], [-73.2, 5.7], [-73.1, 4.9], [-73.6, 4.2], [-74.3, 4.2], [-74.7, 5], [-74.6, 5.9]]]) },
  ],
  [1000]: [
    { name: "Puebloanos Ancestrais — apogeu de Chaco Canyon", color: "#7c3aed", geometry: poly([[[-108.2, 36.25], [-107.7, 36.3], [-107.4, 36], [-107.5, 35.8], [-107.9, 35.75], [-108.2, 35.9], [-108.2, 36.25]]]) },
  ],
  [1100]: [
    { name: "Puebloanos Ancestrais (Chaco Canyon)", color: "#7c3aed", geometry: poly([[[-108.3, 36.5], [-107.6, 36.55], [-107.2, 36.1], [-107.3, 35.6], [-107.9, 35.5], [-108.3, 35.8], [-108.3, 36.5]]]) },
  ],
  [1200]: [
    { name: "Declínio de Chaco Canyon e novos centros puebloanos", color: "#7c3aed", geometry: poly([[[-108.3, 37.2], [-107.5, 37.3], [-107, 36.9], [-107.2, 36.4], [-107.8, 36.3], [-108.3, 36.6], [-108.3, 37.2]]]) },
    { name: "Casas Grandes (Paquimé)", color: "#7c3aed", geometry: poly([[[-108.3, 30.8], [-107.7, 30.85], [-107.5, 30.4], [-107.6, 29.9], [-108.1, 29.85], [-108.4, 30.3], [-108.3, 30.8]]]) },
  ],
  [1279]: [
    { name: "Reino Daju de Darfur", color: "#7c3aed", geometry: poly([[[23.3, 11.8], [24, 11.4], [25.2, 12], [25.3, 13.3], [24.3, 14], [23.2, 13.2], [23.3, 11.8]]]) },
    { name: "Império de Caném", color: "#7c3aed", geometry: poly([[[13, 11], [15.5, 10.4], [18, 12], [18.5, 15.5], [16.5, 18], [13.5, 16.5], [12.4, 13], [13, 11]]]) },
    { name: "Reino Cristão da Etiópia (Dinastia Salomônica)", color: "#7c3aed", geometry: poly([[[37, 9], [38.5, 8.4], [40, 9.5], [40.3, 11.5], [39.5, 13.5], [38, 14.3], [36.8, 13], [36.5, 10.5], [37, 9]]]) },
    { name: "Reino de Gapi (Ternate)", color: "#7c3aed", geometry: poly([[[127.3, 0.95], [127.4, 0.97], [127.46, 0.85], [127.42, 0.7], [127.32, 0.68], [127.26, 0.8], [127.3, 0.95]]]) },
  ],
  [1300]: [
    { name: "Reino de Ternate e a esfera de influência de Majapahit nas Molucas", color: "#7c3aed", geometry: poly([[[127.3, 0.95], [127.4, 0.97], [127.46, 0.85], [127.42, 0.7], [127.32, 0.68], [127.26, 0.8], [127.3, 0.95]]]) },
    { name: "Reino de Tidore", color: "#7c3aed", geometry: poly([[[127.34, 0.62], [127.44, 0.64], [127.48, 0.52], [127.43, 0.4], [127.33, 0.38], [127.27, 0.5], [127.34, 0.62]]]) },
  ],
  [1400]: [
    { name: "Reino de Ternate e a esfera de influência de Majapahit nas Molucas", color: "#7c3aed", geometry: poly([[[127.3, 0.95], [127.4, 0.97], [127.46, 0.85], [127.42, 0.7], [127.32, 0.68], [127.26, 0.8], [127.3, 0.95]]]) },
    { name: "Reino de Tidore", color: "#7c3aed", geometry: poly([[[127.34, 0.62], [127.44, 0.64], [127.48, 0.52], [127.43, 0.4], [127.33, 0.38], [127.27, 0.5], [127.34, 0.62]]]) },
  ],
  [1500]: [
    { name: "Estado Tarasco (Purépecha)", color: "#7c3aed", geometry: poly([[[-102.8, 20.3], [-101.3, 20.5], [-100.5, 19.8], [-100.7, 18.7], [-101.8, 18], [-103, 18.3], [-103.5, 19.5], [-102.8, 20.3]]]) },
    { name: "Confederação Powhatan", color: "#7c3aed", geometry: poly([[[-77.5, 38.3], [-76.3, 38.3], [-75.9, 37.6], [-76, 36.7], [-76.8, 36.6], [-77.6, 37], [-77.8, 37.7], [-77.5, 38.3]]]) },
    { name: "Confederação Iroquesa (Haudenosaunee)", color: "#7c3aed", geometry: poly([[[-78.8, 43.2], [-77.5, 44], [-75.5, 44], [-73.8, 43.2], [-74.5, 42.2], [-76.5, 42], [-78.3, 42.3], [-78.8, 43.2]]]) },
    { name: "Confederação Wampanoag", color: "#7c3aed", geometry: poly([[[-71.9, 41.8], [-71.9, 42.05], [-71, 42.05], [-70, 41.9], [-69.95, 41.65], [-70.3, 41.35], [-70.9, 41.3], [-71.5, 41.45], [-71.9, 41.8]]]) },
  ],
  [1530]: [
    { name: "Confederação Iroquesa (Haudenosaunee)", color: "#7c3aed", geometry: poly([[[-78.8, 43.2], [-77.5, 44], [-75.5, 44], [-73.8, 43.2], [-74.5, 42.2], [-76.5, 42], [-78.3, 42.3], [-78.8, 43.2]]]) },
  ],
  [1650]: [
    { name: "Confederação Iroquesa (Haudenosaunee)", color: "#7c3aed", geometry: poly([[[-78.8, 43.2], [-77.5, 44], [-75.5, 44], [-73.8, 43.2], [-74.5, 42.2], [-76.5, 42], [-78.3, 42.3], [-78.8, 43.2]]]) },
  ],
  [1700]: [
    { name: "Confederação Powhatan", color: "#7c3aed", geometry: poly([[[-77.5, 38.3], [-76.3, 38.3], [-75.9, 37.6], [-76, 36.7], [-76.8, 36.6], [-77.6, 37], [-77.8, 37.7], [-77.5, 38.3]]]) },
    { name: "Confederação Iroquesa (Haudenosaunee)", color: "#7c3aed", geometry: poly([[[-78.8, 43.2], [-77.5, 44], [-75.5, 44], [-73.8, 43.2], [-74.5, 42.2], [-76.5, 42], [-78.3, 42.3], [-78.8, 43.2]]]) },
    { name: "Confederação Wampanoag", color: "#7c3aed", geometry: poly([[[-71.9, 41.8], [-71.9, 42.05], [-71, 42.05], [-70, 41.9], [-69.95, 41.65], [-70.3, 41.35], [-70.9, 41.3], [-71.5, 41.45], [-71.9, 41.8]]]) },
    { name: "Reduções jesuíticas guaranis", color: "#7c3aed", geometry: poly([[[-57.3, -27], [-56.5, -25.7], [-54.5, -26], [-53.6, -27.5], [-54, -29.2], [-55.5, -29.5], [-57, -28.5], [-57.3, -27]]]) },
  ],
  [1783]: [
    { name: "Primeiro Estado Saudita (Emirado de Dir'iyya)", color: "#7c3aed", geometry: poly([[[45.3, 25.3], [47, 25.4], [47.3, 24.3], [46.8, 23.3], [45.5, 23.5], [45, 24.5], [45.3, 25.3]]]) },
  ],
  [1800]: [
    { name: "Primeiro Estado Saudita (Emirado de Dir'iyya)", color: "#7c3aed", geometry: poly([[[36.5, 24.5], [37, 21], [40, 18.5], [45, 17], [50, 20.5], [51, 26], [48.5, 29.5], [42, 28.5], [36.5, 24.5]]]) },
  ],
  [1815]: [
    { name: "Primeiro Estado Saudita (Emirado de Dir'iyya)", color: "#7c3aed", geometry: poly([[[36.5, 24.5], [37, 21], [40, 18.5], [45, 17], [50, 20.5], [51, 26], [48.5, 29.5], [42, 28.5], [36.5, 24.5]]]) },
  ],
};

export function knownStateContourFeatureCollection(year: number): FeatureCollection {
  const contours = KNOWN_STATE_CONTOURS[year] ?? [];
  return {
    type: "FeatureCollection",
    features: contours.map(
      (contour): Feature => ({
        type: "Feature",
        properties: { name: contour.name, __color: contour.color },
        geometry: contour.geometry,
      })
    ),
  };
}
