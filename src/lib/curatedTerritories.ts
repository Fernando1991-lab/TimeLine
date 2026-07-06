// Portuguese display names for the historically significant empires,
// kingdoms, civilizations and states found in the vendored GeoJSON
// snapshots (public/data/historical-basemaps). Keys must match the
// NAME/SUBJECTO property exactly as it appears in the source data —
// including the odd encoding/spelling variants the dataset itself has
// across different year files.
//
// Anything not listed here just falls back to the original English
// name — this is a curated subset, not a full translation of the
// dataset (see README).
//
// Entries present here are also treated as "always worth a label" and
// take priority over the area-based ranking in territoryLabels.ts, so
// historically important-but-small territories (Byzantium, Portugal,
// city-states...) don't get crowded out by huge sparsely-populated
// hunter-gatherer regions.
export const CURATED_TERRITORIES: Record<string, string> = {
  // Ancient Near East / Mediterranean
  Ur: "Ur",
  Elam: "Elão",
  Babylonia: "Babilônia",
  Assyria: "Assíria",
  "Indus valley civilization": "Civilização do Vale do Indo",
  Egypt: "Egito",
  "Achaemenid Empire": "Império Aquemênida",
  "Empire of Alexander": "Império de Alexandre",
  Macedonia: "Macedônia",
  "Macedon and Hellenic League": "Macedônia e Liga Helênica",
  "Greek city-states": "Cidades-Estado Gregas",
  Persia: "Pérsia",
  Arabia: "Arábia",
  Scythians: "Citas",
  Carthage: "Cartago",
  "Carthaginian Empire": "Império Cartaginês",
  Rome: "Roma",
  "Roman Empire": "Império Romano",
  "Rome (Diocletianus)": "Roma (Diocleciano)",
  "Seleucid Kingdom": "Reino Selêucida",
  "Ptolemaic Kingdom": "Reino Ptolomaico",
  "Byzantine Empire": "Império Bizantino",
  "Holy Roman Empire": "Sacro Império Romano-Germânico",
  "Papal States": "Estados Papais",

  // South / Central / East Asia (ancient–medieval)
  Xiongnu: "Xiongnu",
  Han: "Império Han",
  "Han Empire": "Império Han",
  "Kushan Empire": "Império Cuchana",
  "Kushan Principalities": "Principados Cuchanas",
  Kushites: "Cuchitas",
  Kush: "Reino de Cuxe",
  "Mauryan Empire": "Império Máuria",
  "Gupta Empire": "Império Gupta",
  "Parthian Empire": "Império Parta",
  "Sasanian Empire": "Império Sassânida",
  Jin: "Dinastia Jin",
  "Jin Empire": "Império Jin",
  "Sui Empire": "Dinastia Sui",
  Göktürks: "Canato Turco (Göktürks)",
  "Tang Empire": "Dinastia Tang",
  "Tibetan Empire": "Império Tibetano",
  "Song Empire": "Dinastia Song",
  "Abbasid Caliphate": "Califado Abássida",
  "Umayyad Caliphate": "Califado Omíada",
  "Ming Chinese Empire": "Dinastia Ming",
  "Manchu Empire": "Império Manchu",
  "Qing Empire": "Dinastia Qing",
  "Chinese Warlords": "Senhores da Guerra Chineses",
  "Chinese warlords": "Senhores da Guerra Chineses",
  "Sultanate of Delhi": "Sultanato de Deli",
  Vijayanagara: "Vijayanagara",
  "Chola state": "Império Chola",
  Cholas: "Império Chola",
  "Maratha Confederacy": "Confederação Marata",
  "Mughal Empire": "Império Mogol",
  "British Raj": "Raj Britânico (Índia)",
  "Khmer Empire": "Império Khmer",
  "Srivijaya Empire": "Império de Srivijaya",
  Champa: "Champa",
  "Đại Việt": "Đại Việt",
  Vietnam: "Vietnã",

  // Steppe / Central Asian empires
  Mongols: "Mongóis",
  "Mongol Empire": "Império Mongol",
  "Great Khanate": "Grande Canato",
  "Khanate of the Golden Horde": "Canato da Horda Dourada",
  Ilkhanate: "Ilcanato",
  "Chagatai Khanate": "Canato Chagatai",
  "White Horde": "Horda Branca",
  "Kara Khitai Khaganate": "Canato Kara Khitai",
  "Cuman-Kipchak confederation": "Confederação Cumano-Kipchak",
  "Kimek-Kipchak khaganate": "Canato Kimek-Kipchak",
  "Timurid Empire": "Império Timúrida",
  "central Asian khanates": "Canatos da Ásia Central",

  // Islamic world (later)
  "Ottoman Empire": "Império Otomano",
  "Safavid Empire": "Império Safávida",

  // Europe
  "Kalmar Union": "União de Kalmar",
  "Grand Duchy of Moscow": "Grão-Ducado de Moscou",
  "Tsardom of Muscovy": "Czarado da Moscóvia",
  "Russian Empire": "Império Russo",
  Russia: "Rússia",
  USSR: "URSS",
  "United Kingdom of Great Britain and Ireland": "Reino Unido da Grã-Bretanha e Irlanda",
  "United Kingdom": "Reino Unido",
  "Austrian Empire": "Império Austríaco",
  "Austria Hungary": "Áustria-Hungria",
  Denmark: "Dinamarca",
  "Denmark-Norway": "Dinamarca-Noruega",
  France: "França",
  Spain: "Espanha",
  Portugal: "Portugal",
  Sweden: "Suécia",
  Norway: "Noruega",
  Poland: "Polônia",
  Germany: "Alemanha",
  "German Empire": "Império Alemão",

  // The Americas
  "Aztec Empire": "Império Asteca",
  "Inca Empire": "Império Inca",
  "Toltec Empire": "Império Tolteca",
  "Zapotec Empire": "Império Zapoteca",
  Olmec: "Olmecas",
  Teotihuacán: "Teotihuacán",
  Teotihuacàn: "Teotihuacán",
  "Teotihuac�n": "Teotihuacán",
  "Maya city-states": "Cidades-Estado Maias",
  "Maya chiefdoms and states": "Cacicados e Estados Maias",
  "Norte Chico": "Norte Chico",
  "Vice Royalty of Peru": "Vice-Reino do Peru",
  "Vice-Royalty of Peru": "Vice-Reino do Peru",
  "Vice-Royalty of New Spain": "Vice-Reino da Nova Espanha",
  "Vice-Royalty of Brazil": "Vice-Reino do Brasil",
  "Kingdom of Brazil": "Reino do Brasil",
  "Vice-Royalty of New Granada": "Vice-Reino de Nova Granada",
  "Viceroyalty of the Río de la Plata": "Vice-Reino do Rio da Prata",
  "Rupert's Land": "Terra de Rupert",
  Canada: "Canadá",
  "United States": "Estados Unidos",
  "United States of America": "Estados Unidos",
  Mexico: "México",
  Brazil: "Brasil",
  Argentina: "Argentina",

  // Africa
  "Great Zimbabwe": "Grande Zimbábue",
  Zimbabwe: "Zimbábue",
  Songhai: "Império Songhai",
  Zulu: "Zulu",
  Zululand: "Zululândia",
  Sudan: "Sudão",
  "Anglo-Egyption Sudan": "Sudão Anglo-Egípcio",
  Zaire: "Zaire",
  "Zaire (Belgium)": "Zaire (Bélgica)",
  Algeria: "Argélia",
  "Algeria (France)": "Argélia (França)",
  "Belgian Congo": "Congo Belga",
  "French West Africa": "África Ocidental Francesa",
  "French Equatorial Africa": "África Equatorial Francesa",
  "Saudi Arabia": "Arábia Saudita",

  // Oceania / other modern
  Australia: "Austrália",
  "Western Australia (UK)": "Austrália Ocidental (RU)",
  India: "Índia",
  China: "China",
  Kazakhstan: "Cazaquistão",
  Greenland: "Groenlândia",
  Antarctica: "Antártida",
};

export function translateTerritoryName(name: string): string {
  return CURATED_TERRITORIES[name] ?? name;
}
