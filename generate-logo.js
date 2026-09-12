const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

async function generateLogo() {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    
    console.log('Reading original logo...');
    const imageBytes = fs.readFileSync('public/images/logo.jpeg').toString('base64');
    
    console.log('Generating new logo...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBytes,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: 'Create a modern, high-quality, professional logo for a travel and trekking company named "Gilgit Getaways Trek and Tours", inspired by the provided image. Keep the same vibe, colors, and layout but make it a clean, vector-style logo suitable for a website.',
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        fs.writeFileSync('public/images/generated-logo.jpeg', Buffer.from(base64EncodeString, 'base64'));
        console.log('Logo generated successfully and saved to public/images/generated-logo.jpeg');
        return;
      }
    }
    console.log('No image generated in the response.');
  } catch (error) {
    console.error('Error generating logo:', error);
  }
}

generateLogo();
