import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

let ai = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

const config = {
  responseMimeType: "application/json",
};
const model = "gemini-2.5-flash";

export async function getAIRecommendation(prompt) {
  if (!apiKey || !ai) {
    console.warn("VITE_GOOGLE_GENAI_API_KEY is not set. Using fallback recommendations.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error generating content with Gemini: ", error);
    return null;
  }
}

