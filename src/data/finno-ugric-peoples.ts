export type FinnoUgricPeople = {
  id: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  language: string;
  group: "baltic" | "ugric" | "permian" | "volga" | "saami";
  description: string;
  traditions: string[];
  mapCoordinates: {
    x: number;
    y: number;
  };
  imageUrl?: string;
  flagUrl?: string;
  color: string;
};

export const finnoUgricPeoples: FinnoUgricPeople[] = [
  {
    id: "finnish",
    name: "Финны",
    nativeName: "Suomalaiset",
    population: 5500000,
    region: "Финляндия",
    language: "Финский",
    group: "baltic",
    description: "Финны — основное население Финляндии. Финский язык относится к прибалтийско-финской подгруппе финно-угорских языков. Традиционно финны занимались земледелием, рыболовством и лесными промыслами.",
    traditions: [
      "Праздник летнего солнцестояния (Юханнус)",
      "Сауна как часть культуры",
      "Календарные праздники Калевалы"
    ],
    mapCoordinates: {
      x: 550,
      y: 180
    },
    color: "#4C6D97"
  },
  {
    id: "estonians",
    name: "Эстонцы",
    nativeName: "Eestlased",
    population: 1100000,
    region: "Эстония",
    language: "Эстонский",
    group: "baltic",
    description: "Эстонцы — финно-угорский народ, составляющий основное население Эстонии. Эстонский язык принадлежит к прибалтийско-финской подгруппе финно-угорских языков и близок к финскому.",
    traditions: [
      "Певческие праздники",
      "Янов день (Jaanipäev)",
      "Традиционные ремесла (вязание, ткачество)"
    ],
    mapCoordinates: {
      x: 510,
      y: 220
    },
    color: "#4C6D97"
  },
  {
    id: "hungarians",
    name: "Венгры",
    nativeName: "Magyarok",
    population: 13000000,
    region: "Венгрия, Румыния, Словакия",
    language: "Венгерский",
    group: "ugric",
    description: "Венгры (мадьяры) — самый многочисленный финно-угорский народ. Венгерский язык относится к угорской подгруппе и значительно отличается от других финно-угорских языков. Предки венгров пришли в Европу из Зауралья в IX веке.",
    traditions: [
      "Национальные танцы (чардаш)",
      "Традиционные вышивки",
      "Гуляш и другие блюда национальной кухни"
    ],
    mapCoordinates: {
      x: 450,
      y: 320
    },
    color: "#5B8C71"
  },
  {
    id: "komi",
    name: "Коми",
    nativeName: "Коми",
    population: 228000,
    region: "Республика Коми, Россия",
    language: "Коми",
    group: "permian",
    description: "Коми — финно-угорский народ, проживающий преимущественно в Республике Коми на севере европейской части России. Традиционно занимались охотой, рыболовством, оленеводством и земледелием.",
    traditions: [
      "Промысловые культы",
      "Традиционные праздники (Луд)",
      "Резьба по кости и дереву"
    ],
    mapCoordinates: {
      x: 650,
      y: 220
    },
    color: "#E5864E"
  },
  {
    id: "udmurts",
    name: "Удмурты",
    nativeName: "Удмуртъёс",
    population: 552000,
    region: "Удмуртская Республика, Россия",
    language: "Удмуртский",
    group: "permian",
    description: "Удмурты — финно-угорский народ, проживающий в Удмуртской Республике и соседних регионах России. Удмуртский язык относится к пермской подгруппе финно-угорских языков.",
    traditions: [
      "Праздник Гербер",
      "Традиция священных рощ (Луд)",
      "Многоцветная вышивка"
    ],
    mapCoordinates: {
      x: 630,
      y: 280
    },
    color: "#E5864E"
  },
  {
    id: "mari",
    name: "Марийцы",
    nativeName: "Мари",
    population: 547000,
    region: "Республика Марий Эл, Россия",
    language: "Марийский",
    group: "volga",
    description: "Марийцы (мари) — финно-угорский народ, проживающий преимущественно в Республике Марий Эл и соседних регионах России. Марийский язык относится к волжской подгруппе финно-угорских языков.",
    traditions: [
      "Природная религия (Чимарий)",
      "Священные рощи",
      "Традиционная вышивка с геометрическими узорами"
    ],
    mapCoordinates: {
      x: 600,
      y: 320
    },
    color: "#D45B5B"
  },
  {
    id: "mordvins",
    name: "Мордва",
    nativeName: "Мокшэрзят",
    population: 744000,
    region: "Республика Мордовия, Россия",
    language: "Эрзянский, Мокшанский",
    group: "volga",
    description: "Мордва — финно-угорский народ, состоящий из двух субэтносов: эрзя и мокша, проживающий преимущественно в Республике Мордовия и соседних регионах России. Эрзянский и мокшанский языки относятся к волжской подгруппе финно-угорских языков.",
    traditions: [
      "Традиционные женские головные уборы",
      "Обрядовые праздники (Раськень Озкс)",
      "Искусство вышивки"
    ],
    mapCoordinates: {
      x: 580,
      y: 350
    },
    color: "#D45B5B"
  },
  {
    id: "khanty",
    name: "Ханты",
    nativeName: "Хантыт",
    population: 31000,
    region: "ХМАО, Россия",
    language: "Хантыйский",
    group: "ugric",
    description: "Ханты — коренной малочисленный народ севера Западной Сибири. Проживают в Ханты-Мансийском автономном округе и на севере Томской области. Язык относится к угорской подгруппе финно-угорских языков.",
    traditions: [
      "Медвежий праздник",
      "Традиционное оленеводство",
      "Шаманские практики"
    ],
    mapCoordinates: {
      x: 720,
      y: 240
    },
    color: "#5B8C71"
  },
  {
    id: "mansi",
    name: "Манси",
    nativeName: "Маньси",
    population: 12000,
    region: "ХМАО, Россия",
    language: "Мансийский",
    group: "ugric",
    description: "Манси — малочисленный финно-угорский народ, проживающий в Ханты-Мансийском автономном округе России. Мансийский язык принадлежит к угорской подгруппе финно-угорских языков и близок к хантыйскому.",
    traditions: [
      "Медвежий праздник",
      "Традиционная охота и рыболовство",
      "Орнаментальное искусство"
    ],
    mapCoordinates: {
      x: 700,
      y: 270
    },
    color: "#5B8C71"
  },
  {
    id: "saami",
    name: "Саамы",
    nativeName: "Sápmi",
    population: 80000,
    region: "Северная Скандинавия, Кольский полуостров",
    language: "Саамские языки",
    group: "saami",
    description: "Саамы — финно-угорский народ, проживающий на севере Скандинавии и Кольском полуострове России. Саамские языки формируют отдельную подгруппу в составе финно-угорских языков.",
    traditions: [
      "Оленеводство",
      "Йойк (традиционное пение)",
      "Сезонные миграции и связанные с ними обряды"
    ],
    mapCoordinates: {
      x: 500,
      y: 120
    },
    color: "#9659B5"
  }
];

export const finnoUgricGroups = [
  { id: "baltic", name: "Прибалтийско-финская", color: "#4C6D97" },
  { id: "ugric", name: "Угорская", color: "#5B8C71" },
  { id: "permian", name: "Пермская", color: "#E5864E" },
  { id: "volga", name: "Волжская", color: "#D45B5B" },
  { id: "saami", name: "Саамская", color: "#9659B5" }
];
