const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public', 'images');
const files = fs.readdirSync(dir);

files.slice(0, 10).forEach(file => {
  const stat = fs.statSync(path.join(dir, file));
  console.log(`${file}: ${stat.size} bytes`);
});
