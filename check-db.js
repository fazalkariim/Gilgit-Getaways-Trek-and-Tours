const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tours = await prisma.tour.findMany();
  console.log(`Tours count: ${tours.length}`);
  const expeditions = await prisma.expedition.findMany();
  console.log(`Expeditions count: ${expeditions.length}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
