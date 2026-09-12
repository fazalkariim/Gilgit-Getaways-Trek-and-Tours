import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tours = await prisma.tour.findMany();
  for (const tour of tours) {
    let newImage = tour.image;
    if (tour.image === '/images/tour-kalash.jpg') newImage = '/images/tour-kalash.jpg';
    if (tour.image === '/images/tour-sikh.jpg') newImage = '/images/Tour-sikh.jpg';
    if (tour.image === '/images/tour-hunza.jpg') newImage = '/images/Tour-hunza.jpg';
    if (tour.image === '/images/tour-gandhara.jpg') newImage = '/images/Tour-gandhara.jpg';
    if (tour.image === '/images/tour-indus.jpg') newImage = '/images/Tour-indus.jpg';
    if (tour.image === '/images/tour-silkroad.jpg') newImage = '/images/Tour-silkroas.jpg';
    if (tour.image === '/images/tour-chitralfest.jpg') newImage = '/images/Tour-chitralfest.jpg';
    if (tour.image === '/images/tour-baltistan.jpg') newImage = '/images/Tour-baltistan.jpg';

    if (newImage !== tour.image) {
      await prisma.tour.update({
        where: { id: tour.id },
        data: { image: newImage }
      });
    }
  }

  const expeditions = await prisma.expedition.findMany();
  for (const exp of expeditions) {
    let newImage = exp.image;
    if (exp.image === '/images/expedition-spantik.jpg') newImage = '/images/expedition-spantik.jpg';
    if (exp.image === '/images/expedition-diran.jpg') newImage = '/images/expedition-diran.jpg';
    if (exp.image === '/images/expedition-broadpeak.jpg') newImage = '/images/expedition-broadpeak.jpg';
    if (exp.image === '/images/expedition-gasherbrum.jpg') newImage = '/images/expedition-gasherbrum.jpg';
    if (exp.image === '/images/expedition-pastore.jpg') newImage = '/images/expedition-pastor.jpg';
    if (exp.image === '/images/expedition-laila.jpg') newImage = '/images/expedition-laila.jpg';
    if (exp.image === '/images/expedition-trango.jpg') newImage = '/images/expedition-trango.jpg';
    if (exp.image === '/images/expedition-k2.jpg') newImage = '/images/expedition-k2.jpg';
    if (exp.image === '/images/expedition-nanga.jpg') newImage = '/images/expedition-nanga.jpg';
    if (exp.image === '/images/expedition-masherbrum.jpg') newImage = '/images/expedition-basherbrum.jpg';
    if (exp.image === '/images/expedition-chogo.jpg') newImage = '/images/expedition-chogo.jpg';
    if (exp.image === '/images/expedition-latok.jpg') newImage = '/images/expedition-latok.jpg';
    if (exp.image === '/images/expedition-ogre.jpg') newImage = '/images/expedition-ogre.jpg';
    if (exp.image === '/images/expedition-rakaposhi.jpg') newImage = '/images/expedition-rakaposhi.jpg';
    if (exp.image === '/images/expedition-ultar.jpg') newImage = '/images/expedition-ultar.jpg';
    if (exp.image === '/images/expedition-distaghil.jpg') newImage = '/images/expedition-distaghil.jpg';

    if (newImage !== exp.image) {
      await prisma.expedition.update({
        where: { id: exp.id },
        data: { image: newImage }
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
