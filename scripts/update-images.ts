import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating tours...');
  const tours = await prisma.tour.findMany();
  for (const tour of tours) {
    if (tour.image?.includes('picsum.photos')) {
      // Extract the seed name or just assign a generic one based on index
      const seedMatch = tour.image.match(/seed\/([^\/]+)/);
      const seedName = seedMatch ? seedMatch[1] : `tour-${tour.id.substring(0, 4)}`;
      await prisma.tour.update({
        where: { id: tour.id },
        data: { image: `/images/tour-${seedName}.jpg` }
      });
      console.log(`Updated tour ${tour.title} -> /images/tour-${seedName}.jpg`);
    }
  }

  console.log('Updating expeditions...');
  const expeditions = await prisma.expedition.findMany();
  for (const exp of expeditions) {
    if (exp.image?.includes('picsum.photos')) {
      const seedMatch = exp.image.match(/seed\/([^\/]+)/);
      const seedName = seedMatch ? seedMatch[1] : `expedition-${exp.id.substring(0, 4)}`;
      await prisma.expedition.update({
        where: { id: exp.id },
        data: { image: `/images/expedition-${seedName}.jpg` }
      });
      console.log(`Updated expedition ${exp.title} -> /images/expedition-${seedName}.jpg`);
    }
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
