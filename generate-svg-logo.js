const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

async function generateSvgLogo() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    
    console.log('Reading original logo...');
    const imageBytes = fs.readFileSync('public/images/logo.jpeg').toString('base64');
    
    console.log('Generating SVG logo...');
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBytes,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: 'You are an expert SVG designer. Create a modern, high-quality, professional SVG logo for a travel and trekking company named "Gilgit Getaways Trek and Tours", inspired by the provided image. Keep the same vibe, colors (orange, white, dark), and layout but make it a clean, vector-style logo suitable for a website. Return ONLY the raw SVG code, no markdown formatting, no explanation.',
          },
        ],
      },
    });

    const svgCode = response.text.replace(/```xml|```svg|```/g, '').trim();
    fs.writeFileSync('public/images/logo.svg', svgCode);
    console.log('SVG Logo generated successfully and saved to public/images/logo.svg');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
}

generateSvgLogo();
