const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// 1. Rename files in public/images
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    if (file.endsWith('.jpg')) {
      const newName = file.replace('.jpg', '.jpg');
      fs.renameSync(path.join(imagesDir, file), path.join(imagesDir, newName));
      console.log(`Renamed: ${file} -> ${newName}`);
    } else if (file.endsWith('.jpeg')) {
      const newName = file.replace('.jpeg', '.jpeg');
      fs.renameSync(path.join(imagesDir, file), path.join(imagesDir, newName));
      console.log(`Renamed: ${file} -> ${newName}`);
    }
  }
}

// 2. Update references in codebase
function updateReferences(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        updateReferences(fullPath);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      if (content.includes('.jpg')) {
        content = content.replace(/\.jpg\.jpeg/g, '.jpg');
        modified = true;
      }
      if (content.includes('.jpeg')) {
        content = content.replace(/\.jpeg\.jpeg/g, '.jpeg');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated references in: ${fullPath}`);
      }
    }
  }
}

updateReferences(__dirname);
console.log('Done!');
