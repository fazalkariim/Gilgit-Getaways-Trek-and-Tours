const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.jpg.jpeg') || file.endsWith('.jpeg.jpeg')) {
    fs.unlinkSync(path.join(dir, file));
    console.log('Deleted', file);
  }
}
