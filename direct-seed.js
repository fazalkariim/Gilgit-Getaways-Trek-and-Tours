const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedTours = [
  {
    title: 'Kalash Valley Traditions',
    price: 900,
    duration: '8 days',
    location: 'Chitral',
    description: 'The Kalash Valley is a hidden gem in Chitral, where visitors immerse in rich traditions, festivals, rituals, crafts, folklore, and spiritual beliefs with stunning mountain scenery.',
    image: '/images/tour-kalash.jpeg'
  },
  {
    title: 'Sikh Sites Pilgrimage',
    price: 650,
    duration: '7 days',
    location: 'Punjab',
    description: 'Visit sacred Sikh sites in Nankana Sahib and Kartarpur with spiritual experiences, history, rituals, and cultural insights.',
    image: '/images/Tour-sikh.jpeg'
  },
  {
    title: 'Hunza Community Experience',
    price: 1200,
    duration: '10 days',
    location: 'Hunza Valley',
    description: 'Experience Hunza life with homestays, forts, crafts, folklore, and breathtaking landscapes.',
    image: '/images/Tour-hunza.jpeg'
  },
  {
    title: 'Gandhara Historical Sites',
    price: 850,
    duration: '9 days',
    location: 'Swat, Taxila, Peshawar',
    description: 'Explore Buddhist ruins, museums, and Greco-Buddhist heritage with expert guides.',
    image: '/images/Tour-gandhara.jpeg'
  },
  {
    title: 'Indus Valley Archaeology',
    price: 1100,
    duration: '11 days',
    location: 'Mohenjo-Daro',
    description: 'Discover ancient civilization, urban planning, and artifacts at Harappa and Mohenjo-Daro.',
    image: '/images/Tour-indus.jpeg'
  },
  {
    title: 'Silk Road Legacy Journey',
    price: 1400,
    duration: '12 days',
    location: 'Hunza',
    description: 'Travel the Karakoram Highway, explore trade history, markets, and cultural exchanges.',
    image: '/images/Tour-silkroas.jpeg'
  },
  {
    title: 'Chitral Festival Visit',
    price: 700,
    duration: '6 days',
    location: 'Chitral',
    description: 'Experience vibrant festivals, music, rituals, and local traditions.',
    image: '/images/Tour-chitralfest.jpeg'
  },
  {
    title: 'Baltistan Cultural Immersion',
    price: 1000,
    duration: '9 days',
    location: 'Skardu',
    description: 'Discover Balti culture with homestays, forts, monasteries, and heritage experiences.',
    image: '/images/Tour-baltistan.jpeg'
  },
  {
    title: 'Baltoro Jeep Adventure',
    price: 1500,
    duration: '14 days',
    location: 'Baltoro',
    description: 'An exhilarating jeep safari through the rugged terrains of Baltoro, offering spectacular views of the Karakoram giants.',
    image: '/images/Tour-adventure-baltorojeep.jpeg'
  },
  {
    title: 'Deosai Plains Safari',
    price: 800,
    duration: '5 days',
    location: 'Deosai',
    description: 'Explore the second highest plateau in the world, known for its rich flora and fauna, including the Himalayan brown bear.',
    image: '/images/Tour-adventure-deosaijeep.jpeg'
  },
  {
    title: 'Hindukush Driving Expedition',
    price: 1300,
    duration: '12 days',
    location: 'Hindukush',
    description: 'A thrilling driving expedition through the majestic Hindukush mountain range, experiencing local cultures and stunning vistas.',
    image: '/images/Tour-adventure-hindukushdriver.jpeg'
  },
  {
    title: 'Hunza Valley Biking',
    price: 950,
    duration: '8 days',
    location: 'Hunza',
    description: 'Cycle through the breathtaking Hunza Valley, experiencing the local hospitality and panoramic views of Rakaposhi.',
    image: '/images/Tour-adventure-hunzabiking.jpeg'
  },
  {
    title: 'Indus River Rafting',
    price: 600,
    duration: '4 days',
    location: 'Indus River',
    description: 'Experience the thrill of white-water rafting on the mighty Indus River, surrounded by towering mountains.',
    image: '/images/Tour-adventure-indusriver.jpeg'
  },
  {
    title: 'Kaghan Valley Exploration',
    price: 750,
    duration: '6 days',
    location: 'Kaghan',
    description: 'A scenic tour of the lush Kaghan Valley, visiting the famous Saif-ul-Maluk lake and Babusar Top.',
    image: '/images/Tour-adventure-kaghanvalley.jpeg'
  },
  {
    title: 'Karakoram Highway Journey',
    price: 1100,
    duration: '10 days',
    location: 'Karakoram',
    description: 'Travel along the eighth wonder of the world, the Karakoram Highway, experiencing unparalleled mountain scenery.',
    image: '/images/Tour-adventure-karakorm.jpeg'
  },
  {
    title: 'Shandur Polo Festival',
    price: 850,
    duration: '7 days',
    location: 'Shandur',
    description: 'Witness the highest polo ground in the world and experience the thrilling Shandur Polo Festival.',
    image: '/images/Tour-adventure-shandurpolo.jpeg'
  },
  {
    title: 'Astore Valley Scenic Tour',
    price: 700,
    duration: '5 days',
    location: 'Astore',
    description: 'Discover the hidden beauty of Astore Valley, with its lush green meadows and stunning views of Nanga Parbat.',
    image: '/images/Tour-scenic-astore.jpeg'
  },
  {
    title: 'Deosai National Park Tour',
    price: 850,
    duration: '6 days',
    location: 'Deosai',
    description: 'A comprehensive tour of Deosai National Park, exploring its unique high-altitude ecosystem.',
    image: '/images/Tour-scenic-deosai.jpeg'
  },
  {
    title: 'Fairy Meadows Retreat',
    price: 900,
    duration: '7 days',
    location: 'Fairy Meadows',
    description: 'Relax in the serene Fairy Meadows with unparalleled, close-up views of the majestic Nanga Parbat.',
    image: '/images/Tour-scenic-farimeadow.jpeg'
  },
  {
    title: 'Khunjerab Pass Excursion',
    price: 650,
    duration: '4 days',
    location: 'Khunjerab',
    description: 'Visit the highest paved international border crossing in the world at Khunjerab Pass.',
    image: '/images/Tour-scenic-khunjerab.jpeg'
  },
  {
    title: 'Naltar Valley Getaway',
    price: 750,
    duration: '5 days',
    location: 'Naltar',
    description: 'Explore the colorful lakes and lush pine forests of the beautiful Naltar Valley.',
    image: '/images/Tour-scenic-naltar.jpeg'
  },
  {
    title: 'Shangrila Resort Skardu',
    price: 1200,
    duration: '6 days',
    location: 'Skardu',
    description: 'Experience luxury and tranquility at the famous Shangrila Resort, known as "Heaven on Earth".',
    image: '/images/Tour-scenic-shangrilla.jpeg'
  },
  {
    title: 'Skardu Lakes Tour',
    price: 800,
    duration: '6 days',
    location: 'Skardu',
    description: 'Visit the stunning lakes of Skardu, including Upper Kachura, Lower Kachura, and Sadpara Lake.',
    image: '/images/Tour-scenic-skardulack.jpeg'
  }
];

const seedExpeditions = [
  {
    title: 'Spantik Expedition',
    price: 7800,
    duration: '35 Days',
    location: 'Skardu',
    difficulty: 'Moderate',
    description: 'Spantik, also known as Golden Peak, is a relatively accessible 7000m peak in the Karakoram range. It offers a great introduction to high-altitude mountaineering with stunning views of the surrounding giants. The expedition involves glacier travel and moderately steep snow/ice slopes.',
    image: '/images/expedition-spantik.jpeg'
  },
  {
    title: 'Diran Expedition',
    price: 6500,
    duration: '32 Days',
    location: 'Gilgit',
    difficulty: 'Moderate',
    description: 'Diran Peak (7266m) is a beautiful pyramid-shaped mountain in the Rakaposhi-Haramosh massif. While considered moderate in technical difficulty, it presents challenges with its avalanche-prone slopes. The expedition provides an excellent opportunity for climbers looking to progress to 7000m peaks.',
    image: '/images/expedition-diran.jpeg'
  },
  {
    title: 'Broad Peak Expedition',
    price: 14500,
    duration: '52 Days',
    location: 'Skardu',
    difficulty: 'Hard',
    description: 'Broad Peak (8051m) is the 12th highest mountain in the world. Located in the Baltoro Muztagh, it is often considered one of the more accessible 8000m peaks, though it still requires significant mountaineering experience, endurance, and acclimatization. The summit ridge is famously long and demanding.',
    image: '/images/expedition-broadpeak.jpeg'
  },
  {
    title: 'Gasherbrum I & II Expedition',
    price: 13800,
    duration: '53 Days',
    location: 'Skardu',
    difficulty: 'Hard',
    description: 'This expedition targets both Gasherbrum I (Hidden Peak, 8080m) and Gasherbrum II (8035m). GII is often considered the most accessible of the Karakoram 8000ers, while GI presents a more technical challenge. Climbing both in one expedition is a monumental achievement requiring excellent fitness and logistics.',
    image: '/images/expedition-gasherbrum.jpeg'
  },
  {
    title: 'Pastore Peak Expedition',
    price: 3200,
    duration: '22 Days',
    location: 'Skardu',
    difficulty: 'Easy',
    description: 'Pastore Peak (6200m) is an excellent trekking peak located near K2 Base Camp. It offers a fantastic introduction to Himalayan climbing without extreme technical difficulties. The summit provides breathtaking panoramic views of K2, Broad Peak, and the Gasherbrums.',
    image: '/images/expedition-pastor.jpeg'
  },
  {
    title: 'Laila Peak Expedition',
    price: 4500,
    duration: '28 Days',
    location: 'Skardu',
    difficulty: 'Hard',
    description: 'Laila Peak (6096m) in the Hushe Valley is famous for its distinctive spear-like shape. Despite its relatively lower altitude, it is a highly technical climb requiring advanced ice and mixed climbing skills. The steep northwest face is a coveted prize for serious alpinists.',
    image: '/images/expedition-laila.jpeg'
  },
  {
    title: 'Trango Tower Expedition',
    price: 18000,
    duration: '42 Days',
    location: 'Skardu',
    difficulty: 'Extreme',
    description: 'The Trango Towers feature some of the largest and most challenging rock walls in the world. Great Trango Tower (6286m) and Nameless Tower (6239m) demand elite big-wall climbing skills, aid climbing expertise, and the ability to endure harsh weather at high altitude.',
    image: '/images/expedition-trango.jpeg'
  },
  {
    title: 'K2 Expedition',
    price: 38000,
    duration: '60 Days',
    location: 'Skardu',
    difficulty: 'Extreme',
    description: 'K2 (8611m), the Savage Mountain, is the ultimate mountaineering challenge. It is steeper, more technical, and subject to worse weather than Everest. This expedition is strictly for elite, highly experienced high-altitude climbers ready to face the absolute limits of human endurance.',
    image: '/images/expedition-k2.jpeg'
  },
  {
    title: 'Nanga Parbat Expedition',
    price: 16500,
    duration: '40 Days',
    location: 'Chilas',
    difficulty: 'Extreme',
    description: 'Nanga Parbat (8126m), the Killer Mountain, is the westernmost anchor of the Himalayas. It features massive vertical relief, particularly the Rupal Face. The climb is highly technical and dangerous, requiring immense skill and respect for the mountain\'s volatile conditions.',
    image: '/images/expedition-nanga.jpeg'
  },
  {
    title: 'Masherbrum Expedition',
    price: 12000,
    duration: '40 Days',
    location: 'Skardu',
    difficulty: 'Hard',
    description: 'Masherbrum (K1, 7821m) is a striking and formidable peak in the Baltoro region. It is considered one of the hardest mountains to climb in the world due to its objective dangers and technical difficulty. A true test for seasoned alpinists.',
    image: '/images/expedition-basherbrum.jpeg'
  },
  {
    title: 'Chogo Lingsa Expedition',
    price: 15000,
    duration: '50 Days',
    location: 'Skardu',
    difficulty: 'Hard',
    description: 'A challenging expedition in the remote Karakoram. Chogo Lingsa offers a pristine and less-traveled route for climbers seeking solitude and serious technical challenges away from the crowded 8000m peaks.',
    image: '/images/expedition-chogo.jpeg'
  },
  {
    title: 'Latok I Expedition',
    price: 10500,
    duration: '40 Days',
    location: 'Skardu',
    difficulty: 'Extreme',
    description: 'Latok I (7145m) is legendary for its unclimbed North Ridge, one of the most coveted and difficult objectives in world alpinism. The peak demands extreme technical mixed climbing at high altitude. Only for the absolute elite.',
    image: '/images/expedition-latok.jpeg'
  },
  {
    title: 'Baintha Brakk (The Ogre)',
    price: 20000,
    duration: '45 Days',
    location: 'Skardu',
    difficulty: 'Extreme',
    description: 'Baintha Brakk (7285m), famously known as The Ogre, is one of the hardest mountains to climb on Earth. Its steep, granite towers and unpredictable weather make it a formidable objective that has seen very few successful ascents.',
    image: '/images/expedition-ogre.jpeg'
  },
  {
    title: 'Rakaposhi Expedition',
    price: 8500,
    duration: '35 Days',
    location: 'Gilgit',
    difficulty: 'Moderate',
    description: 'Rakaposhi (7788m) dominates the Hunza Valley skyline with its massive, unbroken snow slopes. While visually stunning, the climb involves significant vertical gain and objective hazards. A classic Karakoram expedition.',
    image: '/images/expedition-rakaposhi.jpeg'
  },
  {
    title: 'Ultar Sar Expedition',
    price: 9200,
    duration: '40 Days',
    location: 'Gilgit',
    difficulty: 'Hard',
    description: 'Ultar Sar (7388m) rises dramatically above the Hunza Valley. It is known for its extreme avalanche danger and technical difficulty. The peak remained unclimbed until the 1990s, highlighting its formidable nature.',
    image: '/images/expedition-ultar.jpeg'
  },
  {
    title: 'Distaghil Sar Expedition',
    price: 16000,
    duration: '50 Days',
    location: 'Gilgit',
    difficulty: 'Hard',
    description: 'Distaghil Sar (7885m) is the highest peak in the Hispar Muztagh. It is a massive, remote mountain requiring a long approach and establishing multiple high camps. A serious undertaking for experienced expedition climbers.',
    image: '/images/expedition-distaghil.jpeg'
  }
];

async function main() {
  await prisma.tour.deleteMany();
  await prisma.expedition.deleteMany();
  
  await prisma.tour.createMany({ data: seedTours });
  await prisma.expedition.createMany({ data: seedExpeditions });
  
  console.log('Database seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
