const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/api/expeditions/route.ts',
  'app/api/tours/route.ts',
  'components/top-treks.tsx',
  'components/services.tsx',
  'components/gallery.tsx',
  'components/hero.tsx',
  'app/contact/page.tsx',
  'direct-seed.js'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\.jpg/g, '.jpeg');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
