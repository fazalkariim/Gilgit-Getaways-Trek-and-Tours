const fs = require('fs');
const path = require('path');

function findFiles(dir, keywords) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.next')) {
        results = results.concat(findFiles(filePath, keywords));
      }
    } else {
      const lowerFile = file.toLowerCase();
      if (keywords.some(kw => lowerFile.includes(kw))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const keywords = ['blossom', 'winter', 'bahar', 'khiza', 'summer', 'autumn', 'spring'];
const files = findFiles('.', keywords);
console.log(files);
