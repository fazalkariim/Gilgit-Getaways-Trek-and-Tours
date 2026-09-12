const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tours = await prisma.tour.findMany();
  for (const tour of tours) {
    if (tour.image.endsWith('.jpg.jpeg') || tour.image.endsWith('.jpeg.jpeg')) {
      const newImage = tour.image.replace(/\.jpeg$/, '');
      await prisma.tour.update({
        where: { id: tour.id },
        data: { image: newImage }
      });
      console.log(`Updated tour ${tour.id} image to ${newImage}`);
    }
  }

  const expeditions = await prisma.expedition.findMany();
  for (const exp of expeditions) {
    if (exp.image.endsWith('.jpg.jpeg') || exp.image.endsWith('.jpeg.jpeg')) {
      const newImage = exp.image.replace(/\.jpeg$/, '');
      await prisma.expedition.update({
        where: { id: exp.id },
        data: { image: newImage }
      });
      console.log(`Updated expedition ${exp.id} image to ${newImage}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
