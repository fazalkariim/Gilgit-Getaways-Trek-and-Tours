const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file === '.keep') return;
  
  if (file.endsWith('.jpg') || file.endsWith('.jpg.jpeg') || file.endsWith('.jpeg.jpeg')) {
    fs.unlinkSync(path.join(dir, file));
    console.log(`Deleted ${file}`);
  }
});
