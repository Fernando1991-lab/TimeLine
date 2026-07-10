// Curated "deep dive" pages for a small pilot set of historically major
// empires/civilizations: a detailed year-by-year timeline, key
// historical figures, and a 20-question quiz, all hand-written (same
// curation approach as territorySummaries.ts and knownGapPeoples.ts —
// no live API calls, works offline).
//
// Each entry is linked to the main map via `datasetNames`: the exact
// NAME/SUBJECTO strings this civilization appears under across the
// vendored snapshots (a single civilization is often split across many
// dataset names as it changes form over centuries, e.g. Rome / Roman
// Republic / Roman Empire / Western Roman Empire / Byzantine Empire).
export type Milestone = {
  year: number;
  label: string;
  title: string;
  text: string;
};

export type KeyFigure = {
  name: string;
  years: string;
  text: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type EmpireDeepDive = {
  slug: string;
  ptName: string;
  datasetNames: string[];
  intro: string;
  milestones: Milestone[];
  keyFigures: KeyFigure[];
  quiz: QuizQuestion[];
};

export const EMPIRE_DEEP_DIVES: EmpireDeepDive[] = [
  {
    slug: "roma",
    ptName: "Império Romano",
    datasetNames: ["Rome", "Roman Republic", "Roman Empire", "Rome (Diocletianus)", "Rome (Maximian)", "Rome (Galerius)", "Rome (Constantinus)", "Western Roman Empire", "Eastern Roman Empire", "Byzantine Empire"],
    intro: "O Império Romano foi uma das civilizações mais duradouras e influentes da história ocidental, com uma trajetória que se estende da fundação lendária de Roma, em 753 a.C., até a queda de Constantinopla, em 1453 d.C. Ao longo de mais de dois mil anos, Roma passou por três grandes fases políticas: o Reino, a República e o Império, cada uma marcada por transformações profundas em suas instituições, seu território e sua cultura. Na fase republicana, Roma conquistou o Mediterrâneo por meio de guerras como as Púnicas contra Cartago, tornando-se a potência dominante da Antiguidade; já sob o Império, alcançou sua maior extensão territorial com Trajano e viveu séculos de relativa estabilidade conhecidos como Pax Romana. A partir do século III, crises políticas, econômicas e militares levaram à divisão administrativa entre Oriente e Ocidente, culminando na queda do Império Romano do Ocidente em 476 d.C. A metade oriental, porém, sobreviveu por quase mil anos como o Império Bizantino, preservando e transformando o legado romano até ser conquistada pelos turcos otomanos em 1453.",
    milestones: [
      { year: -753, label: "753 a.C.", title: "Fundação lendária de Roma", text: "Segundo a tradição, Rômulo fundou a cidade de Roma às margens do rio Tibre em 753 a.C., após uma disputa com seu irmão gêmeo Remo. A lenda situa nas sete colinas romanas o núcleo original do assentamento que viria a se tornar um império. Esse mito fundador foi usado por séculos para legitimar a identidade e o destino de Roma." },
      { year: -509, label: "509 a.C.", title: "Fim da Monarquia e início da República", text: "A expulsão do último rei, Tarquínio, o Soberbo, pôs fim à monarquia romana e deu início à República. O poder passou a ser exercido por magistrados eleitos anualmente, com destaque para os dois cônsules, e por um Senado composto pela aristocracia patrícia. Esse novo sistema de governo, baseado em contrapesos institucionais, vigoraria por quase cinco séculos." },
      { year: -450, label: "451-450 a.C.", title: "Lei das Doze Tábuas", text: "Pressionados pela plebe no chamado Conflito das Ordens, os patrícios aceitaram a criação de um código de leis escritas e públicas, a Lei das Doze Tábuas. Pela primeira vez, as normas jurídicas deixavam de ser conhecidas apenas pelos sacerdotes patrícios, tornando-se acessíveis a todos os cidadãos. Esse conjunto de leis é considerado a base do direito romano posterior." },
      { year: -216, label: "216 a.C.", title: "Batalha de Canas", text: "Durante a Segunda Guerra Púnica, o general cartaginês Aníbal infligiu a Roma uma de suas piores derrotas militares na batalha de Canas, no sul da Itália. Dezenas de milhares de soldados romanos morreram, mas Roma recusou-se a negociar a paz e continuou mobilizando novas legiões. Essa resiliência após a derrota foi decisiva para a virada posterior da guerra." },
      { year: -202, label: "202 a.C.", title: "Batalha de Zama", text: "O general romano Públio Cornélio Cipião, mais tarde chamado Africano, derrotou Aníbal na batalha de Zama, no norte da África, encerrando a Segunda Guerra Púnica. Cartago perdeu suas possessões na Hispânia e sua frota, ficando reduzida a potência secundária. A vitória consolidou Roma como principal força militar do Mediterrâneo ocidental." },
      { year: -146, label: "146 a.C.", title: "Destruição de Cartago e Corinto", text: "No mesmo ano, Roma destruiu Cartago ao final da Terceira Guerra Púnica e arrasou a cidade grega de Corinto, submetendo a Grécia ao seu domínio. Esses eventos marcaram a consolidação do controle romano sobre todo o Mediterrâneo. A partir de então, o mar Mediterrâneo passou a ser chamado pelos romanos de Mare Nostrum, \"nosso mar\"." },
      { year: -133, label: "133 a.C.", title: "Reformas de Tibério Graco", text: "O tribuno da plebe Tibério Graco propôs uma reforma agrária para redistribuir terras públicas a cidadãos pobres, desafiando os interesses da aristocracia senatorial. Sua proposta gerou forte oposição e ele foi assassinado por um grupo de senadores. O episódio é visto como o início de um longo período de crise política e violência que abalaria as instituições republicanas." },
      { year: -60, label: "60 a.C.", title: "Primeiro Triunvirato", text: "Júlio César, Pompeu e Crasso formaram uma aliança política informal conhecida como Primeiro Triunvirato, concentrando grande poder e influência sobre o Senado. A aliança permitiu que César obtivesse o comando militar da Gália, onde expandiu significativamente o território romano. O acordo, no entanto, era instável e acabaria em disputa aberta entre César e Pompeu." },
      { year: -44, label: "44 a.C.", title: "Assassinato de Júlio César", text: "Após atravessar o rio Rubicão em 49 a.C. e vencer a guerra civil contra Pompeu, Júlio César concentrou poderes sem precedentes, sendo nomeado ditador perpétuo. Em 44 a.C., ele foi assassinado por um grupo de senadores liderados por Bruto e Cássio, que temiam o fim da República. Sua morte, porém, não restaurou a ordem republicana e desencadeou uma nova guerra civil." },
      { year: -27, label: "27 a.C.", title: "Augusto e o início do Principado", text: "Após vencer Marco Antônio e Cleópatra na batalha de Ácio, Otávio recebeu do Senado o título de Augusto, tornando-se o primeiro imperador romano. Ele instituiu o Principado, um regime que preservava as aparências republicanas enquanto concentrava o poder real em suas mãos. Esse marco é convencionalmente considerado o início do Império Romano." },
      { year: 117, label: "117 d.C.", title: "Trajano e a máxima extensão territorial", text: "Sob o imperador Trajano, o Império Romano atingiu sua maior extensão territorial, estendendo-se da Britânia à Mesopotâmia. Esse período fez parte da Pax Romana, uma era de relativa estabilidade interna e prosperidade econômica que durou cerca de dois séculos. Uma administração eficiente e uma extensa rede de estradas e fortificações sustentavam esse vasto território." },
      { year: 235, label: "235 d.C.", title: "Crise do Século III", text: "A partir da morte do imperador Alexandre Severo, o império mergulhou em cerca de cinquenta anos de instabilidade, marcados por guerras civis, invasões de povos germânicos e persas, crise econômica e rápida sucessão de imperadores impostos pelos exércitos. O território chegou a se fragmentar temporariamente em impérios rivais. A crise só seria superada com as reformas de Diocleciano, no fim do século." },
      { year: 284, label: "284 d.C.", title: "Diocleciano e a Tetrarquia", text: "Diocleciano tornou-se imperador e promoveu profundas reformas administrativas, militares e fiscais para estabilizar o império após a crise do século III. Ele instituiu a Tetrarquia, dividindo o governo entre dois imperadores seniores (augustos) e dois juniores (césares), cada um responsável por uma parte do território. Esse sistema buscava facilitar a defesa das fronteiras e garantir uma sucessão mais ordenada." },
      { year: 313, label: "313 d.C.", title: "Edito de Milão", text: "Os imperadores Constantino e Licínio promulgaram o Edito de Milão, que estabeleceu a tolerância religiosa e pôs fim às perseguições aos cristãos no império. Constantino tornou-se o primeiro imperador a apoiar abertamente o cristianismo e, em 330, fundou Constantinopla como nova capital no Oriente. Esses eventos transformariam profundamente a religião e a geografia política do mundo romano." },
      { year: 395, label: "395 d.C.", title: "Divisão do Império", text: "Com a morte do imperador Teodósio I, o último a governar o império unificado, o território foi dividido entre seus dois filhos: Honório recebeu o Império Romano do Ocidente e Arcádio o Império Romano do Oriente. Embora concebida inicialmente como uma divisão administrativa, essa separação tornou-se permanente. As duas metades passariam a seguir trajetórias históricas cada vez mais distintas." },
      { year: 476, label: "476 d.C.", title: "Queda do Império Romano do Ocidente", text: "O chefe militar germânico Odoacro depôs o jovem imperador Rômulo Augusto, tradicionalmente considerado o último imperador do Ocidente. O evento marca, para a maioria dos historiadores, o fim do Império Romano do Ocidente e o início da Idade Média na Europa ocidental. O Império Romano do Oriente, com capital em Constantinopla, continuaria existindo por quase mil anos." },
      { year: 529, label: "529 d.C.", title: "Justiniano e o Corpus Juris Civilis", text: "O imperador bizantino Justiniano ordenou a compilação do Corpus Juris Civilis, um vasto código que sistematizou o direito romano e influenciaria profundamente os sistemas jurídicos europeus posteriores. Seu general Belisário liderou campanhas militares que reconquistaram temporariamente territórios no norte da África e na Itália. O reinado de Justiniano é considerado o apogeu do Império Bizantino primitivo." },
      { year: 1453, label: "1453 d.C.", title: "Queda de Constantinopla", text: "Após um cerco prolongado, as forças otomanas lideradas pelo sultão Maomé II conquistaram Constantinopla, pondo fim ao Império Bizantino, o último remanescente direto do Império Romano. O evento é frequentemente citado como um marco simbólico do fim da Idade Média. A cidade foi rebatizada de Istambul e tornou-se a capital do Império Otomano." },
    ],
    keyFigures: [
      { name: "Rômulo", years: "séc. VIII a.C. (lendário)", text: "Segundo a tradição romana, Rômulo foi o fundador e primeiro rei de Roma, tendo criado a cidade em 753 a.C. após uma disputa com seu irmão gêmeo Remo. Embora sua existência histórica seja incerta, o mito de Rômulo e Remo, amamentados por uma loba, tornou-se um símbolo fundamental da identidade romana." },
      { name: "Cipião Africano", years: "236–183 a.C.", text: "General romano que derrotou Aníbal na decisiva batalha de Zama, em 202 a.C., encerrando a Segunda Guerra Púnica. Sua vitória consolidou o domínio de Roma sobre o Mediterrâneo ocidental e o transformou em um dos maiores heróis militares da República." },
      { name: "Júlio César", years: "100–44 a.C.", text: "General e estadista romano que expandiu o território da República ao conquistar a Gália e venceu a guerra civil contra Pompeu. Concentrou um poder pessoal sem precedentes como ditador perpétuo, o que provocou seu assassinato em 44 a.C. e abriu caminho para o fim da República." },
      { name: "Augusto (Otávio)", years: "63 a.C.–14 d.C.", text: "Sobrinho-neto e herdeiro de Júlio César, venceu as guerras civis que se seguiram ao assassinato de César e tornou-se o primeiro imperador romano em 27 a.C. Instituiu o Principado e deu início a um longo período de estabilidade conhecido como Pax Romana." },
      { name: "Trajano", years: "53–117 d.C.", text: "Imperador romano sob cujo governo o império atingiu sua maior extensão territorial, com conquistas na Dácia e na Mesopotâmia. É lembrado também por importantes obras públicas e por uma administração considerada exemplar, sendo um dos chamados 'cinco bons imperadores'." },
      { name: "Constantino", years: "c. 272–337 d.C.", text: "Imperador romano que encerrou as perseguições aos cristãos com o Edito de Milão, em 313, e favoreceu a expansão do cristianismo no império. Fundou a cidade de Constantinopla em 330 d.C. como nova capital, transferindo o centro político do império para o Oriente." },
      { name: "Justiniano", years: "482–565 d.C.", text: "Imperador bizantino que ordenou a compilação do Corpus Juris Civilis, sistematizando o direito romano, e promoveu campanhas militares que reconquistaram temporariamente territórios perdidos no Ocidente. Seu reinado é considerado um dos pontos mais altos do Império Bizantino." },
      { name: "Rômulo Augusto", years: "c. 460–depois de 476 d.C.", text: "Último imperador do Império Romano do Ocidente, foi deposto em 476 d.C., ainda adolescente, pelo chefe militar germânico Odoacro. Sua deposição é tradicionalmente considerada o marco do fim do Império Romano do Ocidente." },
    ],
    quiz: [
      {
        question: "Segundo a tradição, em que ano Roma foi fundada?",
        options: ["753 a.C.", "509 a.C.", "27 a.C.", "476 d.C."],
        correctIndex: 0,
        explanation: "A tradição romana situa a fundação da cidade por Rômulo em 753 a.C.",
      },
      {
        question: "O que aconteceu em Roma em 509 a.C.?",
        options: ["A fundação da cidade", "O fim da Monarquia e o início da República", "A batalha de Canas", "A queda de Constantinopla"],
        correctIndex: 1,
        explanation: "A expulsão do rei Tarquínio, o Soberbo, em 509 a.C. encerrou a Monarquia e deu início à República Romana.",
      },
      {
        question: "Qual conjunto de leis, do século V a.C., é considerado a base escrita do direito romano?",
        options: ["Corpus Juris Civilis", "Lei das Doze Tábuas", "Edito de Milão", "Código de Trajano"],
        correctIndex: 1,
        explanation: "A Lei das Doze Tábuas, de cerca de 450 a.C., foi o primeiro código de leis romanas escrito e público.",
      },
      {
        question: "Em qual batalha o general cartaginês Aníbal infligiu uma das piores derrotas militares da história de Roma?",
        options: ["Zama", "Ácio", "Canas", "Farsália"],
        correctIndex: 2,
        explanation: "Na batalha de Canas (216 a.C.), durante a Segunda Guerra Púnica, Aníbal derrotou de forma esmagadora as legiões romanas.",
      },
      {
        question: "Quem derrotou Aníbal na batalha de Zama, em 202 a.C.?",
        options: ["Júlio César", "Cipião Africano", "Pompeu", "Trajano"],
        correctIndex: 1,
        explanation: "Públio Cornélio Cipião, depois chamado Africano, venceu Aníbal em Zama, encerrando a Segunda Guerra Púnica.",
      },
      {
        question: "Qual era a principal unidade de combate do exército romano?",
        options: ["Falange", "Legião", "Coorte pretoriana", "Centúria de cavalaria"],
        correctIndex: 1,
        explanation: "A legião era a maior e mais importante unidade organizacional do exército romano, composta por milhares de soldados.",
      },
      {
        question: "Qual reforma o tribuno Tibério Graco tentou promover em Roma, no século II a.C.?",
        options: ["Reforma agrária", "Abolição do Senado", "Conquista da Grécia", "Fim do cristianismo"],
        correctIndex: 0,
        explanation: "Tibério Graco propôs redistribuir terras públicas a cidadãos pobres, o que gerou forte oposição da aristocracia senatorial.",
      },
      {
        question: "Quem formou o chamado Primeiro Triunvirato com Júlio César?",
        options: ["Marco Antônio e Otávio", "Pompeu e Crasso", "Bruto e Cássio", "Constantino e Licínio"],
        correctIndex: 1,
        explanation: "O Primeiro Triunvirato (60 a.C.) reuniu Júlio César, Pompeu e Crasso em uma aliança política informal.",
      },
      {
        question: "Em que ano Júlio César foi assassinado?",
        options: ["44 a.C.", "27 a.C.", "49 a.C.", "14 d.C."],
        correctIndex: 0,
        explanation: "César foi assassinado em 44 a.C. por um grupo de senadores liderados por Bruto e Cássio.",
      },
      {
        question: "Quem se tornou o primeiro imperador romano, em 27 a.C.?",
        options: ["Júlio César", "Augusto (Otávio)", "Trajano", "Nero"],
        correctIndex: 1,
        explanation: "Otávio recebeu do Senado o título de Augusto em 27 a.C., tornando-se o primeiro imperador romano.",
      },
      {
        question: "Como ficou conhecido o regime político instituído por Augusto?",
        options: ["República", "Principado", "Tetrarquia", "Consulado"],
        correctIndex: 1,
        explanation: "O Principado manteve aparências republicanas enquanto concentrava o poder real nas mãos do imperador.",
      },
      {
        question: "Sob qual imperador o Império Romano atingiu sua maior extensão territorial?",
        options: ["Augusto", "Nero", "Trajano", "Justiniano"],
        correctIndex: 2,
        explanation: "Em 117 d.C., sob Trajano, o império alcançou seu maior tamanho, da Britânia à Mesopotâmia.",
      },
      {
        question: "A que família de línguas modernas, como o português, o espanhol, o francês e o italiano, pertence a herança direta do latim?",
        options: ["Línguas germânicas", "Línguas eslavas", "Línguas românicas", "Línguas célticas"],
        correctIndex: 2,
        explanation: "As línguas românicas descendem diretamente do latim vulgar falado no Império Romano.",
      },
      {
        question: "Quantos cônsules eram eleitos anualmente na República Romana?",
        options: ["Um", "Dois", "Três", "Quatro"],
        correctIndex: 1,
        explanation: "A República elegia anualmente dois cônsules, que dividiam o poder executivo máximo e podiam vetar decisões um do outro.",
      },
      {
        question: "Quem instituiu a Tetrarquia, dividindo o governo do império entre quatro líderes?",
        options: ["Diocleciano", "Constantino", "Justiniano", "Teodósio"],
        correctIndex: 0,
        explanation: "Diocleciano criou a Tetrarquia em fins do século III para estabilizar o império após a crise do século III.",
      },
      {
        question: "Qual documento, de 313 d.C., estabeleceu a tolerância religiosa e encerrou as perseguições aos cristãos no Império Romano?",
        options: ["Corpus Juris Civilis", "Edito de Milão", "Lei das Doze Tábuas", "Concílio de Niceia"],
        correctIndex: 1,
        explanation: "O Edito de Milão, promulgado por Constantino e Licínio, garantiu liberdade de culto aos cristãos.",
      },
      {
        question: "Em que ano o Império Romano se dividiu definitivamente entre Ocidente e Oriente, após a morte de Teodósio I?",
        options: ["313 d.C.", "395 d.C.", "476 d.C.", "527 d.C."],
        correctIndex: 1,
        explanation: "Em 395 d.C., o império foi dividido entre os filhos de Teodósio I, separação que se tornou permanente.",
      },
      {
        question: "Quem depôs o último imperador do Império Romano do Ocidente, em 476 d.C.?",
        options: ["Átila", "Odoacro", "Aníbal", "Alarico"],
        correctIndex: 1,
        explanation: "O chefe militar germânico Odoacro depôs Rômulo Augusto em 476 d.C., evento tradicionalmente marcado como o fim do Império Romano do Ocidente.",
      },
      {
        question: "Qual imperador bizantino ordenou a compilação do Corpus Juris Civilis, sistematizando o direito romano?",
        options: ["Constantino", "Justiniano", "Trajano", "Teodósio"],
        correctIndex: 1,
        explanation: "Justiniano ordenou, no século VI, a criação do Corpus Juris Civilis, base do direito civil ocidental posterior.",
      },
      {
        question: "Em que ano Constantinopla, última capital do Império Romano/Bizantino, foi conquistada pelos otomanos?",
        options: ["1204", "1453", "1492", "1517"],
        correctIndex: 1,
        explanation: "Em 1453, o sultão otomano Maomé II conquistou Constantinopla, pondo fim ao Império Bizantino.",
      },
    ],
  },
  {
    slug: "egito-antigo",
    ptName: "Antigo Egito",
    datasetNames: ["Egypt", "Ptolemaic Kingdom"],
    intro: "O Antigo Egito foi uma das civilizações mais duradouras da história, desenvolvida ao longo do rio Nilo, cujas cheias anuais garantiam a fertilidade das terras e sustentavam uma sociedade agrícola complexa. Sua história começa por volta de 3100 a.C., com a unificação do Alto e Baixo Egito sob um único governante, e atravessa períodos de grande centralização, como o Reino Antigo, o Reino Médio e o Reino Novo, intercalados por fases de fragmentação política. Faraós como Quéops, Hatchepsut, Akhenaton, Tutancâmon e Ramessés II marcaram profundamente a religião, a arquitetura e a política da região, deixando monumentos como as pirâmides de Gizé e os templos do Vale dos Reis. Em 332 a.C., o Egito foi conquistado por Alexandre, o Grande, dando início ao período ptolemaico, de forte influência grega, que teve em Alexandria seu principal centro cultural. A civilização egípcia antiga chega ao fim como entidade independente em 30 a.C., quando, após a morte de Cleópatra VII, o território é anexado ao Império Romano.",
    milestones: [
      { year: -3100, label: "3100 a.C.", title: "Unificação do Alto e Baixo Egito", text: "O rei Narmer, também identificado por alguns estudiosos como Menes, teria unificado o Alto Egito (sul) e o Baixo Egito (norte) sob um único governo. Esse evento marca tradicionalmente o início da história dinástica egípcia. A partir daí, o faraó passa a usar a dupla coroa, símbolo da união das duas regiões." },
      { year: -2560, label: "2560 a.C.", title: "Reino Antigo e a era das pirâmides", text: "Durante o Reino Antigo, o faraó Quéops (Khufu) ordenou a construção da Grande Pirâmide de Gizé, o maior monumento funerário já erguido no Egito. Estima-se que sua construção tenha mobilizado milhares de trabalhadores especializados e sazonais ao longo de várias décadas. As pirâmides refletiam a crença egípcia na vida após a morte e no poder divino do faraó." },
      { year: -2181, label: "2181 a.C.", title: "Primeiro Período Intermediário", text: "O enfraquecimento do poder central levou à fragmentação política do Egito, com governadores regionais (nomarcas) disputando autoridade. Esse período de instabilidade durou cerca de um século e meio, até a reunificação do país. Ele ilustra como o poder faraônico dependia do controle eficiente do território e das cheias do Nilo." },
      { year: -2055, label: "2055 a.C.", title: "Reino Médio e reunificação", text: "O faraó tebano Mentuhotep II reunificou o Egito, dando início ao Reino Médio. Esse período é frequentemente descrito como uma época de reorganização administrativa, expansão territorial no sul e florescimento cultural e literário. Grandes obras de irrigação também foram promovidas nessa fase." },
      { year: -1650, label: "1650 a.C.", title: "Segundo Período Intermediário e os hicsos", text: "Um povo estrangeiro conhecido como hicsos estabeleceu domínio sobre o Baixo Egito, introduzindo tecnologias como o carro de guerra puxado por cavalos. Sua presença gerou ressentimento entre os egípcios, que passaram a organizar resistência a partir de Tebas, no sul. Esse período marca uma ruptura na continuidade do poder faraônico nativo." },
      { year: -1550, label: "1550 a.C.", title: "Início do Reino Novo", text: "O faraó Amósis I expulsou os hicsos e reunificou o Egito, dando início ao Reino Novo, período de grande expansão militar e prosperidade. O Egito passou a manter um exército permanente e expandiu sua influência sobre o Levante e a Núbia. Essa fase é considerada o auge do poder e da riqueza egípcios." },
      { year: -1479, label: "1479 a.C.", title: "Reinado de Hatchepsut", text: "Hatchepsut assumiu o papel de faraó, governando com plenos poderes reais em vez de atuar apenas como regente. Seu reinado foi marcado por um longo período de paz interna, intenso comércio e obras monumentais, como o templo funerário de Deir el-Bahari. Ela promoveu uma célebre expedição comercial à terra de Punt." },
      { year: -1458, label: "1458 a.C.", title: "Tutmés III e a expansão imperial", text: "Após o fim do reinado de Hatchepsut, Tutmés III conduziu diversas campanhas militares que expandiram enormemente o território sob controle egípcio, chegando à Síria e à Núbia. Por seus sucessos militares, é frequentemente comparado a grandes conquistadores da Antiguidade. Sob seu governo, o Egito consolidou-se como potência imperial." },
      { year: -1353, label: "1353 a.C.", title: "Reforma religiosa de Akhenaton", text: "O faraó Akhenaton promoveu uma profunda reforma religiosa, elevando o deus solar Aton a divindade quase exclusiva do Egito, em detrimento do tradicional culto a Amon. Ele transferiu a capital para uma nova cidade, Aquetáton (atual Amarna), e essa fase ficou conhecida como Período de Amarna. A reforma foi revertida logo após sua morte." },
      { year: -1332, label: "1332 a.C.", title: "Reinado de Tutancâmon", text: "Ainda criança, Tutancâmon assumiu o trono após o período de Amarna e foi responsável por restaurar os cultos tradicionais, especialmente o de Amon. Seu reinado foi curto e teve pouca relevância política em vida, mas seu túmulo, descoberto quase intacto em 1922 no Vale dos Reis, tornou-se um marco da arqueologia egípcia. Os tesouros encontrados revelaram detalhes valiosos sobre a arte e a religião do período." },
      { year: -1279, label: "1279 a.C.", title: "Reinado de Ramessés II", text: "Ramessés II governou por décadas e é considerado um dos faraós mais poderosos e prolíficos construtores do Reino Novo, erguendo templos como Abu Simbel. Seu longo reinado consolidou a estabilidade interna e projetou a imagem do Egito como grande potência militar e diplomática. Ele também firmou um dos primeiros tratados de paz documentados da história." },
      { year: -1274, label: "1274 a.C.", title: "Batalha de Cadexe", text: "O exército egípcio, liderado por Ramessés II, enfrentou os hititas na cidade síria de Cadexe, em um dos maiores confrontos militares da Antiguidade. A batalha terminou sem vitória decisiva para nenhum dos lados. Anos depois, egípcios e hititas assinaram um tratado de paz, considerado um dos acordos diplomáticos mais antigos já registrados." },
      { year: -1069, label: "1069 a.C.", title: "Fim do Reino Novo", text: "O Reino Novo entrou em declínio devido a disputas internas de poder, pressões econômicas e invasões estrangeiras, como as dos chamados Povos do Mar. O Egito fragmentou-se novamente, com o poder dividido entre o norte e o sacerdócio de Amon em Tebas, no sul. Esse enfraquecimento marcou o fim de um dos períodos mais gloriosos da história egípcia." },
      { year: -747, label: "747 a.C.", title: "Dominação núbia (kushita)", text: "Reis da Núbia, ao sul do Egito, conquistaram o território egípcio e estabeleceram a chamada 25ª dinastia, de origem kushita. Esses governantes se apresentavam como restauradores das tradições religiosas e culturais egípcias antigas. O domínio núbio durou cerca de um século, até ser interrompido por invasões assírias." },
      { year: -525, label: "525 a.C.", title: "Conquista persa", text: "O rei persa Cambises II conquistou o Egito, transformando-o em uma satrapia (província) do Império Aquemênida. O domínio persa, com interrupções, se estendeu por cerca de dois séculos. Esse período representou uma perda significativa da autonomia política egípcia frente a potências estrangeiras." },
      { year: -332, label: "332 a.C.", title: "Conquista de Alexandre, o Grande", text: "Alexandre, o Grande, conquistou o Egito, libertando-o do domínio persa e sendo recebido como libertador pela população local. Ele fundou a cidade de Alexandria, que se tornaria um dos maiores centros culturais e comerciais do mundo antigo. Sua conquista deu início a uma nova fase de forte influência grega no Egito." },
      { year: -305, label: "305 a.C.", title: "Dinastia Ptolemaica e Alexandria", text: "Após a morte de Alexandre e a divisão de seu império entre generais, Ptolomeu, um de seus comandantes, assumiu o título de rei do Egito, dando início à dinastia ptolemaica. Alexandria consolidou-se como capital, sediando instituições célebres como a Biblioteca e o Farol. Essa dinastia de origem grega governaria o Egito por quase três séculos." },
      { year: -30, label: "30 a.C.", title: "Cleópatra VII e a anexação romana", text: "Cleópatra VII, última governante ativa da dinastia ptolemaica, envolveu-se em alianças e conflitos com Roma, especialmente com Júlio César e depois com Marco Antônio. Após a derrota na batalha de Ácio e o suicídio do casal, o Egito foi anexado como província do Império Romano. Esse evento encerra o período faraônico e ptolemaico do Egito antigo." },
    ],
    keyFigures: [
      { name: "Narmer (Menes)", years: "ca. 3100 a.C.", text: "Governante tradicionalmente associado à unificação do Alto e Baixo Egito, dando início à era dos faraós. Sua imagem aparece na célebre Paleta de Narmer, um dos primeiros registros iconográficos do poder real egípcio." },
      { name: "Quéops (Khufu)", years: "r. ca. 2589–2566 a.C.", text: "Faraó do Reino Antigo responsável pela construção da Grande Pirâmide de Gizé, a maior e mais famosa pirâmide egípcia. Seu reinado simboliza o auge do poder centralizado e da capacidade organizacional do Estado egípcio antigo." },
      { name: "Imhotep", years: "ca. século XXVII a.C.", text: "Vizir, arquiteto e sacerdote do faraó Djoser, a quem se atribui o projeto da Pirâmide de Degraus em Sacará, considerada precursora das grandes pirâmides. Foi posteriormente venerado quase como uma divindade ligada à sabedoria e à medicina." },
      { name: "Hatchepsut", years: "r. 1479–1458 a.C.", text: "Uma das poucas mulheres a governar o Egito com título e poderes plenos de faraó. Seu reinado foi marcado por estabilidade, grandes obras arquitetônicas e expedições comerciais, como a famosa viagem à terra de Punt." },
      { name: "Akhenaton", years: "r. 1353–1336 a.C.", text: "Faraó responsável por uma reforma religiosa que privilegiou o culto ao deus Aton, alterando profundamente a tradição religiosa egípcia por um período. Fundou a cidade de Amarna e é frequentemente citado em discussões sobre as origens do monoteísmo no mundo antigo." },
      { name: "Tutancâmon", years: "r. 1332–1323 a.C.", text: "Faraó que assumiu o trono ainda criança e restaurou os cultos tradicionais após o período de Amarna. Ficou mundialmente famoso após a descoberta de seu túmulo quase intacto no Vale dos Reis, em 1922, pelo arqueólogo Howard Carter." },
      { name: "Ramessés II", years: "r. 1279–1213 a.C.", text: "Um dos faraós mais poderosos e longevos do Reino Novo, conhecido por suas grandes construções, como os templos de Abu Simbel, e por sua atuação na Batalha de Cadexe contra os hititas. Seu reinado é associado ao auge da influência e da riqueza egípcias." },
      { name: "Cleópatra VII", years: "r. 51–30 a.C.", text: "Última governante da dinastia ptolemaica, conhecida por suas alianças políticas e pessoais com Júlio César e Marco Antônio. Sua morte, em 30 a.C., marcou o fim da independência egípcia e o início da dominação romana sobre o país." },
    ],
    quiz: [
      {
        question: "Por volta de que ano ocorreu a unificação do Alto e Baixo Egito?",
        options: ["500 a.C.", "3100 a.C.", "1500 a.C.", "30 a.C."],
        correctIndex: 1,
        explanation: "A unificação do Alto e Baixo Egito, tradicionalmente associada a Narmer, ocorreu por volta de 3100 a.C., marcando o início da história dinástica egípcia.",
      },
      {
        question: "Qual rio foi essencial para a agricultura e a civilização egípcia antiga?",
        options: ["Tigre", "Eufrates", "Nilo", "Jordão"],
        correctIndex: 2,
        explanation: "As cheias anuais do rio Nilo depositavam limo fértil nas margens, permitindo uma agricultura próspera em meio ao deserto.",
      },
      {
        question: "Qual faraó ordenou a construção da Grande Pirâmide de Gizé?",
        options: ["Ramessés II", "Quéops", "Tutancâmon", "Akhenaton"],
        correctIndex: 1,
        explanation: "A Grande Pirâmide de Gizé foi construída como monumento funerário do faraó Quéops (Khufu), durante o Reino Antigo.",
      },
      {
        question: "As grandes pirâmides de Gizé foram erguidas durante qual período da história egípcia?",
        options: ["Período Ptolemaico", "Reino Antigo", "Segundo Período Intermediário", "Reino Novo"],
        correctIndex: 1,
        explanation: "As pirâmides de Gizé datam do Reino Antigo, época em que o poder faraônico era altamente centralizado.",
      },
      {
        question: "Quem eram os hicsos?",
        options: ["Uma dinastia de sacerdotes egípcios", "Um povo estrangeiro que dominou parte do Egito no Segundo Período Intermediário", "Arquitetos gregos contratados por faraós", "Uma tribo núbia aliada dos egípcios"],
        correctIndex: 1,
        explanation: "Os hicsos foram um povo estrangeiro que se estabeleceu no Baixo Egito e governou parte do território durante o Segundo Período Intermediário.",
      },
      {
        question: "Qual faraó mulher governou o Egito com plenos poderes reais e promoveu uma expedição comercial à terra de Punt?",
        options: ["Nefertiti", "Cleópatra VII", "Hatchepsut", "Ankhesenamon"],
        correctIndex: 2,
        explanation: "Hatchepsut assumiu o título e as funções de faraó, e seu reinado é lembrado pela estabilidade e por expedições comerciais, como a de Punt.",
      },
      {
        question: "Qual faraó ficou conhecido por promover uma reforma religiosa centrada no culto ao deus Aton?",
        options: ["Tutmés III", "Ramessés II", "Akhenaton", "Quéops"],
        correctIndex: 2,
        explanation: "Akhenaton promoveu uma reforma religiosa que elevou o deus Aton a posição central, período conhecido como Amarna.",
      },
      {
        question: "Qual jovem faraó ficou famoso pela descoberta quase intacta de seu túmulo no Vale dos Reis, em 1922?",
        options: ["Seti I", "Akhenaton", "Tutancâmon", "Ramessés II"],
        correctIndex: 2,
        explanation: "O túmulo de Tutancâmon foi descoberto praticamente intacto por Howard Carter em 1922, tornando-se um dos achados arqueológicos mais famosos da história.",
      },
      {
        question: "A Batalha de Cadexe foi travada entre o Egito de Ramessés II e qual outro império?",
        options: ["Império Assírio", "Império Hitita", "Império Persa", "Império Babilônico"],
        correctIndex: 1,
        explanation: "A Batalha de Cadexe, um dos maiores confrontos da Antiguidade, opôs egípcios e hititas, terminando sem vencedor decisivo.",
      },
      {
        question: "Onde estão localizados a maioria dos túmulos dos faraós do Reino Novo, incluindo o de Tutancâmon?",
        options: ["Gizé", "Alexandria", "Vale dos Reis", "Cartago"],
        correctIndex: 2,
        explanation: "O Vale dos Reis, próximo a Tebas, abriga os túmulos escavados na rocha da maioria dos faraós do Reino Novo.",
      },
      {
        question: "Qual era o principal objetivo da mumificação no Antigo Egito?",
        options: ["Preservar o corpo para a vida após a morte", "Tratar doenças em vida", "Servir como ritual de casamento", "Produzir perfumes para exportação"],
        correctIndex: 0,
        explanation: "Os egípcios acreditavam que a preservação do corpo era essencial para que a alma pudesse continuar existindo na vida após a morte.",
      },
      {
        question: "Qual divindade egípcia, com cabeça de chacal, estava associada à mumificação e ao mundo dos mortos?",
        options: ["Hórus", "Anúbis", "Ra", "Toth"],
        correctIndex: 1,
        explanation: "Anúbis era o deus egípcio associado aos ritos funerários, à mumificação e à proteção dos mortos.",
      },
      {
        question: "Como é chamado o sistema de escrita egípcio baseado em sinais pictográficos?",
        options: ["Cuneiforme", "Hieróglifos", "Alfabeto fenício", "Linear B"],
        correctIndex: 1,
        explanation: "Os hieróglifos eram o sistema de escrita egípcio composto por sinais pictográficos com valores fonéticos e ideográficos.",
      },
      {
        question: "Qual artefato foi essencial para a decifração dos hieróglifos, por conter o mesmo texto em três escritas diferentes?",
        options: ["Papiro de Ebers", "Pedra de Roseta", "Obelisco de Latrão", "Cetro de Uas"],
        correctIndex: 1,
        explanation: "A Pedra de Roseta trazia o mesmo decreto em hieróglifos, escrita demótica e grego antigo, permitindo a decifração dos hieróglifos.",
      },
      {
        question: "Quem foi o estudioso responsável por decifrar os hieróglifos egípcios, em 1822?",
        options: ["Howard Carter", "Napoleão Bonaparte", "Jean-François Champollion", "Heródoto"],
        correctIndex: 2,
        explanation: "O francês Jean-François Champollion decifrou os hieróglifos em 1822, utilizando a Pedra de Roseta como base.",
      },
      {
        question: "Qual dinastia de origem grega governou o Egito entre a conquista de Alexandre e a época de Cleópatra?",
        options: ["Dinastia Persa", "Dinastia Hicsa", "Dinastia Ptolemaica", "Dinastia Núbia"],
        correctIndex: 2,
        explanation: "A dinastia ptolemaica, fundada por um general de Alexandre, governou o Egito por quase três séculos, com Alexandria como capital.",
      },
      {
        question: "Qual foi o desfecho do Egito logo após a morte de Cleópatra VII, em 30 a.C.?",
        options: ["Tornou-se independente novamente", "Foi anexado como província do Império Romano", "Foi dividido entre hititas e núbios", "Passou a ser governado por sacerdotes gregos"],
        correctIndex: 1,
        explanation: "Após a morte de Cleópatra VII, o Egito perdeu sua independência e passou a ser administrado diretamente como província do Império Romano.",
      },
      {
        question: "Qual material, produzido a partir de uma planta que crescia às margens do Nilo, era usado para escrever no Antigo Egito?",
        options: ["Pergaminho", "Argila", "Papiro", "Seda"],
        correctIndex: 2,
        explanation: "O papiro, feito a partir de uma planta aquática abundante no Nilo, era o principal suporte de escrita no Egito antigo.",
      },
      {
        question: "Qual faraó do Reino Novo é conhecido por suas extensas campanhas militares que expandiram o território egípcio até a Síria?",
        options: ["Tutmés III", "Quéops", "Narmer", "Tutancâmon"],
        correctIndex: 0,
        explanation: "Tutmés III conduziu diversas campanhas militares que ampliaram consideravelmente os domínios egípcios, consolidando o Egito como potência imperial.",
      },
      {
        question: "Quem conquistou o Egito em 332 a.C., pondo fim ao domínio persa na região?",
        options: ["Júlio César", "Ciro, o Grande", "Alexandre, o Grande", "Otaviano"],
        correctIndex: 2,
        explanation: "Alexandre, o Grande, conquistou o Egito em 332 a.C., sendo recebido como libertador do domínio persa e fundando a cidade de Alexandria.",
      },
    ],
  },
  {
    slug: "imperio-mongol",
    ptName: "Império Mongol",
    datasetNames: ["Mongols", "Mongol Empire"],
    intro: "O Império Mongol nasceu em 1206, quando Temüjin unificou as tribos nômades da estepe asiática e foi proclamado Gêngis Khan. Em poucas décadas, seus exércitos de cavalaria conquistaram territórios da China ao Leste Europeu, formando o maior império contíguo já registrado na história. Sob seus sucessores, especialmente os netos Batu, Hulagu e Kublai Khan, o domínio mongol se expandiu ainda mais, gerando um período de intenso comércio e trânsito de ideias conhecido como Pax Mongolica. Com o tempo, porém, o império se fragmentou em canatos regionais rivais, e a dinastia Yuan, que os mongóis haviam fundado na China, caiu em 1368, dando lugar à dinastia Ming.",
    milestones: [
      { year: 1206, label: "1206", title: "Unificação das tribos mongóis", text: "Em um kurultai (grande assembleia) às margens do rio Onon, os chefes das tribos nômades da Mongólia reconheceram Temüjin como líder supremo, concedendo-lhe o título de Gêngis Khan. Esse evento uniu, pela primeira vez, os diversos povos da estepe sob um único comando militar e político. Gêngis Khan reorganizou o exército em unidades decimais e instituiu um código de leis, a Yassa." },
      { year: 1209, label: "1209", title: "Submissão do reino tanguta de Xi Xia", text: "Gêngis Khan lançou sua primeira grande campanha externa contra o reino tanguta de Xi Xia, no noroeste da China. Após um cerco à capital, o reino aceitou tornar-se vassalo e pagar tributo aos mongóis. A vitória garantiu a retaguarda mongol antes do avanço contra a dinastia Jin." },
      { year: 1211, label: "1211", title: "Início da guerra contra a dinastia Jin", text: "Os mongóis invadiram o território controlado pela dinastia Jin, no norte da China, dando início a uma guerra de conquista que duraria mais de duas décadas. A capital Jin, Zhongdu (atual Pequim), foi tomada em 1215, mas a resistência continuou no sul por muitos anos." },
      { year: 1218, label: "1218", title: "Conquista do Cara-Catai", text: "O general mongol Jebe conquistou o Canato de Cara-Catai, na Ásia Central, eliminando um reino rival e levando as fronteiras mongóis até o Império Corásmio. Essa conquista colocou os mongóis em contato direto com o mundo islâmico da Ásia Central." },
      { year: 1219, label: "1219", title: "Invasão do Império Corásmio", text: "Após o assassinato de uma caravana e de emissários mongóis por ordem do xá Muhammad II, Gêngis Khan lançou uma invasão devastadora contra o Império Corásmio, que dominava a Pérsia e boa parte da Ásia Central. Cidades como Bucara, Samarcanda e Urgench foram destruídas, e a campanha, concluída em 1221, ampliou o domínio mongol até o Afeganistão e o norte da Índia." },
      { year: 1227, label: "1227", title: "Morte de Gêngis Khan e divisão do império", text: "Gêngis Khan morreu durante uma campanha contra Xi Xia, deixando o império dividido em ulus (territórios) entre seus quatro filhos com sua primeira esposa: Jochi, Chagatai, Ogedei e Tolui. Essa partilha lançou as bases para os futuros canatos regionais, que décadas depois se tornariam praticamente autônomos." },
      { year: 1229, label: "1229", title: "Ogedei Khan é eleito Grande Khan", text: "Um kurultai confirmou Ogedei, terceiro filho de Gêngis Khan, como o novo Grande Khan, dando continuidade à expansão do império. Sob seu governo foram construídas a capital Karakorum e organizado o sistema de postos de mensageiros conhecido como Yam." },
      { year: 1234, label: "1234", title: "Queda da dinastia Jin", text: "Após mais de duas décadas de guerra, os mongóis, com apoio da dinastia Song do sul, destruíram definitivamente a dinastia Jin, completando a conquista do norte da China." },
      { year: 1237, label: "1237", title: "Invasão da Rus (Rússia)", text: "Sob comando de Batu Khan, neto de Gêngis Khan, e do general Subedei, os mongóis invadiram os principados russos, destruindo cidades como Riazan e Vladimir. A campanha demonstrou a eficácia da cavalaria mongol mesmo em terreno de inverno rigoroso." },
      { year: 1240, label: "1240", title: "Saque de Kiev e fundação da Horda Dourada", text: "As tropas de Batu Khan tomaram e destruíram Kiev, então o principal centro político da Rus. Nos anos seguintes, Batu estabeleceu a Horda Dourada, com base na região do Volga, que dominaria a Rússia e parte da Europa Oriental por mais de dois séculos." },
      { year: 1241, label: "1241", title: "Batalhas de Legnica e Mohi", text: "Colunas mongóis avançaram profundamente na Europa Central, derrotando forças polonesas e alemãs na Batalha de Legnica e um exército húngaro na Batalha de Mohi. Apesar da vitória militar esmagadora, os mongóis se retiraram da Europa no ano seguinte, provavelmente em razão da morte de Ogedei Khan e da disputa sucessória que se seguiu." },
      { year: 1258, label: "1258", title: "Saque de Bagdá e fim do Califado Abássida", text: "O príncipe Hulagu, neto de Gêngis Khan, conquistou e destruiu Bagdá, capital do Califado Abássida, encerrando séculos de domínio abássida sobre o mundo islâmico. Hulagu fundou então o Ilcanato, canato mongol que passou a governar a Pérsia e a Mesopotâmia." },
      { year: 1260, label: "1260", title: "Kublai Khan e o limite da expansão mongol", text: "Kublai Khan tornou-se Grande Khan em meio a uma disputa sucessória com seu irmão Ariq Böke. No mesmo ano, os mamelucos do Egito derrotaram os mongóis na Batalha de Ain Jalut, na Palestina, marcando o primeiro grande revés militar e o limite da expansão mongol rumo ao Oriente Médio." },
      { year: 1271, label: "1271", title: "Fundação da dinastia Yuan", text: "Kublai Khan proclamou-se imperador da China e fundou a dinastia Yuan, combinando instituições mongóis com costumes e burocracia chineses. Sua capital, Khanbaliq (atual Pequim), tornou-se um dos maiores centros urbanos do mundo." },
      { year: 1274, label: "1274/1281", title: "Invasões fracassadas do Japão", text: "Kublai Khan tentou invadir o Japão em 1274 e novamente em 1281, mas ambas as expedições fracassaram, em parte devido à resistência samurai e a tufões que destruíram as frotas mongóis, fenômeno que os japoneses chamaram de kamikaze (\"vento divino\"). Essas derrotas marcaram o limite da expansão mongol no Extremo Oriente marítimo." },
      { year: 1275, label: "1275", title: "Marco Polo chega à corte de Kublai Khan", text: "O comerciante veneziano Marco Polo chegou à corte de Kublai Khan em Khanbaliq, onde teria permanecido a serviço do imperador por quase duas décadas. Seu relato de viagem, ditado anos depois, tornou-se uma das principais fontes ocidentais sobre a China mongol e a Pax Mongolica, período de relativa estabilidade que favoreceu o comércio pela Rota da Seda." },
      { year: 1279, label: "1279", title: "Conquista da dinastia Song do Sul", text: "Após décadas de resistência, a dinastia Song do Sul foi derrotada na Batalha de Yamen, completando a unificação de toda a China sob o domínio da dinastia Yuan. Foi a primeira vez que a totalidade do território chinês ficou sob domínio estrangeiro." },
      { year: 1368, label: "1368", title: "Queda da dinastia Yuan", text: "Enfraquecida por crises econômicas, epidemias, revoltas camponesas (como a dos Turbantes Vermelhos) e disputas internas, a dinastia Yuan foi derrubada por forças chinesas lideradas por Zhu Yuanzhang, que fundou a dinastia Ming. O fim da Yuan marcou a retirada mongol da China e consolidou a fragmentação do que restava do império em canatos regionais independentes." },
    ],
    keyFigures: [
      { name: "Gêngis Khan", years: "c. 1162–1227", text: "Nascido Temüjin, unificou as tribos mongóis em 1206 e fundou o que se tornaria o maior império contíguo da história. Reformou o exército, criou a Yassa (código de leis) e liderou pessoalmente as campanhas contra Xi Xia, a dinastia Jin e o Império Corásmio." },
      { name: "Ogedei Khan", years: "1186–1241", text: "Terceiro filho de Gêngis Khan, foi eleito Grande Khan em 1229 e deu continuidade à expansão do império, incluindo a conquista final da dinastia Jin e o início da invasão da Europa Oriental. Fundou a capital Karakorum e organizou o sistema de mensageiros Yam." },
      { name: "Batu Khan", years: "c. 1205–1255", text: "Neto de Gêngis Khan e filho de Jochi, liderou a invasão da Rússia e da Europa Oriental nas décadas de 1230 e 1240, vencendo as batalhas de Legnica e Mohi. Fundou a Horda Dourada, que governaria vastas regiões da Rússia e da estepe por mais de dois séculos." },
      { name: "Möngke Khan", years: "1209–1259", text: "Quarto Grande Khan do império, governou entre 1251 e 1259 e promoveu uma reorganização administrativa e fiscal, além de autorizar as campanhas de seus irmãos Kublai (China) e Hulagu (Oriente Médio). Sua morte, durante uma campanha contra a dinastia Song, desencadeou a disputa sucessória entre Kublai e Ariq Böke." },
      { name: "Hulagu Khan", years: "c. 1218–1265", text: "Neto de Gêngis Khan, liderou a campanha que destruiu o Califado Abássida em Bagdá em 1258 e fundou o Ilcanato na Pérsia e Mesopotâmia. Sua derrota na Batalha de Ain Jalut, em 1260, diante dos mamelucos egípcios, marcou o limite da expansão mongol rumo ao Mediterrâneo oriental." },
      { name: "Kublai Khan", years: "1215–1294", text: "Neto de Gêngis Khan, tornou-se Grande Khan em 1260 e, em 1271, fundou a dinastia Yuan na China, completando a conquista da dinastia Song em 1279. Sob seu governo, a China mongol viveu o auge da Pax Mongolica, recebendo viajantes estrangeiros como Marco Polo." },
      { name: "Marco Polo", years: "1254–1324", text: "Comerciante e viajante veneziano que passou cerca de duas décadas na Ásia, incluindo longo período na corte de Kublai Khan. Seu relato de viagens tornou-se uma das principais fontes ocidentais sobre a China mongol e a Pax Mongolica, embora alguns historiadores questionem certos detalhes de seu relato." },
    ],
    quiz: [
      {
        question: "Em que ano Temüjin foi proclamado Gêngis Khan em um kurultai às margens do rio Onon?",
        options: ["1206", "1187", "1227", "1260"],
        correctIndex: 0,
        explanation: "Em 1206, as tribos mongóis reconheceram Temüjin como líder supremo, concedendo-lhe o título de Gêngis Khan.",
      },
      {
        question: "Qual arma foi fundamental para a superioridade militar da cavalaria mongol?",
        options: ["Arco composto", "Espada longa", "Canhão de pólvora", "Besta pesada europeia"],
        correctIndex: 0,
        explanation: "O arco composto, leve e poderoso, permitia aos cavaleiros mongóis disparar com precisão mesmo em movimento e a grandes distâncias.",
      },
      {
        question: "Como se chamava o código de leis instituído por Gêngis Khan?",
        options: ["Yassa", "Yam", "Kurultai", "Tanzimat"],
        correctIndex: 0,
        explanation: "A Yassa era o código legal que regulava a conduta militar, social e política no império mongol.",
      },
      {
        question: "Qual era a função do sistema Yam no império mongol?",
        options: ["Rede de postos para transporte rápido de mensagens e viajantes", "Sistema de cobrança de impostos", "Tribunal religioso", "Exército de elite pessoal do khan"],
        correctIndex: 0,
        explanation: "O Yam era uma rede de estações de revezamento que permitia comunicação e transporte rápidos por todo o vasto território mongol.",
      },
      {
        question: "Após a morte de Gêngis Khan, em 1227, como o império passou a ser organizado?",
        options: ["Foi dividido em ulus (territórios) entre seus filhos", "Foi imediatamente unificado sob um só imperador absoluto", "Foi entregue à dinastia Song", "Foi dissolvido e as tribos voltaram à independência total"],
        correctIndex: 0,
        explanation: "O império foi dividido em ulus entre os quatro filhos de Gêngis Khan com sua primeira esposa: Jochi, Chagatai, Ogedei e Tolui.",
      },
      {
        question: "O Império Mongol é geralmente descrito como o maior império da história em qual aspecto específico?",
        options: ["Território contíguo (conectado por terra)", "População total governada", "Duração total em número de séculos", "Número de línguas oficiais"],
        correctIndex: 0,
        explanation: "Embora impérios como o Britânico tenham somado área total maior contando colônias ultramarinas, o Império Mongol é considerado o maior império contíguo (de território conectado por terra) da história.",
      },
      {
        question: "Quem liderou a invasão mongol da Rússia e da Europa Oriental nas décadas de 1230 e 1240?",
        options: ["Batu Khan", "Hulagu Khan", "Möngke Khan", "Ogedei Khan"],
        correctIndex: 0,
        explanation: "Batu Khan, neto de Gêngis Khan, comandou no terreno a campanha que resultou na fundação da Horda Dourada.",
      },
      {
        question: "Quais batalhas de 1241 marcaram o auge da invasão mongol da Europa Central?",
        options: ["Legnica e Mohi", "Ain Jalut e Bagdá", "Kiev e Moscou", "Yamen e Xiangyang"],
        correctIndex: 0,
        explanation: "Na Batalha de Legnica os mongóis derrotaram forças polonesas e alemãs, e na Batalha de Mohi, um exército húngaro, ambas em 1241.",
      },
      {
        question: "Qual canato mongol foi fundado por Batu Khan na região do rio Volga?",
        options: ["Horda Dourada", "Ilcanato", "Canato de Chagatai", "Dinastia Yuan"],
        correctIndex: 0,
        explanation: "A Horda Dourada, estabelecida por Batu Khan, dominou a Rússia e partes da Europa Oriental por mais de dois séculos.",
      },
      {
        question: "O que teria motivado a retirada mongol da Europa em 1242, segundo os historiadores?",
        options: ["A morte de Ogedei Khan e a disputa sucessória que se seguiu", "Uma derrota militar decisiva na Hungria", "A conversão em massa dos mongóis ao cristianismo", "Uma epidemia de peste entre as tropas mongóis"],
        correctIndex: 0,
        explanation: "A morte de Ogedei Khan, em dezembro de 1241, exigiu o retorno dos príncipes mongóis para participar da sucessão, interrompendo a campanha na Europa.",
      },
      {
        question: "Quem liderou a conquista de Bagdá em 1258, que encerrou o Califado Abássida?",
        options: ["Hulagu Khan", "Kublai Khan", "Batu Khan", "Möngke Khan"],
        correctIndex: 0,
        explanation: "Hulagu Khan, neto de Gêngis Khan, comandou a destruição de Bagdá em 1258.",
      },
      {
        question: "Qual canato mongol resultou da conquista da Pérsia e da Mesopotâmia por Hulagu Khan?",
        options: ["Ilcanato", "Horda Dourada", "Canato de Chagatai", "Canato de Ogedei"],
        correctIndex: 0,
        explanation: "Hulagu fundou o Ilcanato, que governou a Pérsia e a Mesopotâmia após a queda de Bagdá.",
      },
      {
        question: "Em qual batalha de 1260 os mamelucos egípcios detiveram a expansão mongol no Oriente Médio?",
        options: ["Ain Jalut", "Mohi", "Legnica", "Yamen"],
        correctIndex: 0,
        explanation: "Na Batalha de Ain Jalut, na Palestina, os mamelucos derrotaram os mongóis, marcando o limite de sua expansão rumo ao Mediterrâneo oriental.",
      },
      {
        question: "Quem fundou a dinastia Yuan na China?",
        options: ["Kublai Khan", "Ogedei Khan", "Möngke Khan", "Gêngis Khan"],
        correctIndex: 0,
        explanation: "Kublai Khan, neto de Gêngis Khan, proclamou-se imperador da China em 1271, fundando a dinastia Yuan.",
      },
      {
        question: "Qual foi o resultado das duas tentativas mongóis de invadir o Japão, em 1274 e 1281?",
        options: ["Ambas fracassaram, em parte devido a tufões", "Ambas tiveram sucesso e o Japão foi anexado", "Apenas a primeira teve sucesso", "O Japão se rendeu sem qualquer combate"],
        correctIndex: 0,
        explanation: "Tempestades, chamadas de kamikaze (\"vento divino\") pelos japoneses, destruíram as frotas mongóis, contribuindo para o fracasso das duas invasões.",
      },
      {
        question: "Em que ano foi concluída a conquista da dinastia Song do Sul, unificando toda a China sob domínio mongol?",
        options: ["1279", "1234", "1271", "1368"],
        correctIndex: 0,
        explanation: "A dinastia Song do Sul foi derrotada na Batalha de Yamen em 1279, completando a unificação da China sob a dinastia Yuan.",
      },
      {
        question: "O que caracterizou o período conhecido como Pax Mongolica?",
        options: ["Uma fase de relativa estabilidade que favoreceu o comércio pela Rota da Seda", "Uma aliança militar formal entre mongóis e europeus", "O fim definitivo de qualquer conflito entre os canatos mongóis", "A conversão de todo o império ao budismo"],
        correctIndex: 0,
        explanation: "Sob o controle mongol de vastas rotas terrestres, mercadores e viajantes puderam circular com mais segurança entre a Ásia e a Europa.",
      },
      {
        question: "Qual característica é frequentemente associada à política religiosa dos khans mongóis em seus territórios conquistados?",
        options: ["Tolerância relativa às diferentes religiões dos povos conquistados", "Imposição obrigatória do xamanismo mongol a todos os súditos", "Perseguição sistemática a toda religião organizada", "Conversão forçada de toda a população ao islamismo"],
        correctIndex: 0,
        explanation: "Os khans mongóis geralmente permitiam que os povos conquistados mantivessem suas próprias religiões, incluindo budismo, islamismo, cristianismo e outras crenças.",
      },
      {
        question: "Qual viajante europeu ficou famoso por relatar sua estadia na corte de Kublai Khan?",
        options: ["Marco Polo", "Cristóvão Colombo", "Vasco da Gama", "Ibn Battuta"],
        correctIndex: 0,
        explanation: "O veneziano Marco Polo relatou ter passado quase duas décadas na Ásia, incluindo tempo na corte de Kublai Khan em Khanbaliq.",
      },
      {
        question: "Qual evento, em 1368, marcou o fim do domínio mongol na China?",
        options: ["A queda da dinastia Yuan e a ascensão da dinastia Ming", "A conquista mongol da dinastia Song", "A morte de Kublai Khan", "A fundação da Horda Dourada"],
        correctIndex: 0,
        explanation: "Em 1368, revoltas internas e crises levaram à derrubada da dinastia Yuan, com Zhu Yuanzhang fundando a dinastia Ming.",
      },
    ],
  },
];

export function deepDiveForTerritory(name: string): EmpireDeepDive | null {
  return EMPIRE_DEEP_DIVES.find((dive) => dive.datasetNames.includes(name)) ?? null;
}

export function deepDiveBySlug(slug: string): EmpireDeepDive | null {
  return EMPIRE_DEEP_DIVES.find((dive) => dive.slug === slug) ?? null;
}
