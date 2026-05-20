const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    // Convert multer file buffer to Gemini's inlineData format
    const imageParts = [
      {
        inlineData: {
          data: req.file.buffer.toString("base64"),
          mimeType: req.file.mimetype
        }
      }
    ];

    const prompt = `
      You are an expert nutritionist and meal analyzer. Analyze this image of a meal.
      Identify each distinct food item present.
      For each item, estimate the portion size and the nutritional macros (calories, protein in grams, fat in grams, carbs in grams).
      
      You must respond ONLY with a valid JSON array of objects. Do not include markdown formatting or backticks (like \`\`\`json). 
      If it is not food, return an empty array [].
      
      The JSON objects must strictly follow this exact structure:
      [
        {
          "name": "string (e.g., Grilled Chicken Breast)",
          "servingSize": "string (e.g., 150g or 1 cup)",
          "calories": number,
          "protein": number,
          "fat": number,
          "carbs": number
        }
      ]
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();

    // Clean up potential markdown formatting that Gemini might output despite instructions
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let parsedFoods = [];
    try {
      parsedFoods = JSON.parse(text);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', text);
      return res.status(500).json({ success: false, error: 'AI returned invalid data format.' });
    }

    return res.json({ success: true, foods: parsedFoods });

  } catch (err) {
    console.error('AI Scan Error:', err);
    return res.status(500).json({ success: false, error: 'Failed to analyze image. Ensure the image is clear and try again.' });
  }
};
