import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const calorieSchema = {
  type: "object",
  properties: {
    meal_name: { type: "string" },
    is_food_detected: { type: "boolean" },
    total_estimated_calories: { type: "integer" },
    confidence: { type: "number" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          estimated_portion: { type: "string" },
          estimated_grams: { type: "integer" },
          estimated_calories: { type: "integer" },
          protein_g: { type: "number" },
          carbs_g: { type: "number" },
          fat_g: { type: "number" },
          confidence: { type: "number" },
        },
        required: [
          "name",
          "estimated_portion",
          "estimated_grams",
          "estimated_calories",
          "protein_g",
          "carbs_g",
          "fat_g",
          "confidence",
        ],
      },
    },
    notes: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "meal_name",
    "is_food_detected",
    "total_estimated_calories",
    "confidence",
    "items",
    "notes",
  ],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const imageDataUrl = body?.imageDataUrl as string | undefined;

    if (!imageDataUrl) {
      return Response.json({ error: "Missing imageDataUrl" }, { status: 400 });
    }

    const match = imageDataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

    if (!match) {
      return Response.json({ error: "Invalid image data URL" }, { status: 400 });
    }

    const mimeType = match[1];
    const base64Data = match[2];

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        },
        {
          text: `
Analyze this image as a food calorie estimator.

Return only valid JSON matching the schema.
Rules:
- Identify each visible food item.
- Estimate portion size conservatively.
- Estimate calories and macros per item.
- If uncertain, lower confidence and explain in notes.
- Do not invent hidden ingredients unless strongly implied.
          `.trim(),
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: calorieSchema,
      },
    });

    const text = response.text ?? "{}";
    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error during food scan." }, { status: 500 });
  }
}