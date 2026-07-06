import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set — configure it before seeding.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

// Name must match the NAME/SUBJECTO property used in the GeoJSON
// snapshots (public/data/historical-basemaps) for the side panel to
// find it. Add more entries here as you curate content.
const empires = [
  {
    name: "Rome",
    description:
      "República e depois Império que dominou o Mediterrâneo por séculos, atingindo sua maior extensão territorial no século II d.C.",
    startYear: -753,
    endYear: 476,
  },
  {
    name: "Mongol Empire",
    description:
      "Fundado por Genghis Khan no início do século XIII, tornou-se o maior império contíguo da história, estendendo-se da Europa Oriental ao Pacífico.",
    startYear: 1206,
    endYear: 1368,
  },
  {
    name: "Ottoman Empire",
    description:
      "Império que durou de 1299 a 1922, controlando partes do sudeste europeu, Oriente Médio e norte da África em seu apogeu.",
    startYear: 1299,
    endYear: 1922,
  },
];

async function main() {
  for (const empire of empires) {
    await prisma.empire.upsert({
      where: { name: empire.name },
      update: empire,
      create: empire,
    });
  }
  console.log(`Seeded ${empires.length} empires.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
