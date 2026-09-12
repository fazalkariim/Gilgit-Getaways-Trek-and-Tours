const sharp = require('sharp');

async function printImage() {
  try {
    const { data, info } = await sharp('public/images/logo.jpeg')
      .resize(80)
      .raw()
      .toBuffer({ resolveWithObject: true });
      
    const width = info.width;
    const height = info.height;
    const channels = info.channels;
    
    let ascii = '';
    const chars = ' .:-=+*#%@';
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const brightness = (r + g + b) / 3;
        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
        ascii += chars[charIndex];
      }
      ascii += '\n';
    }
    
    console.log(ascii);
  } catch (err) {
    console.error(err);
  }
}

printImage();
