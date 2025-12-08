import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationParams, AIRecommendation, PlayerInfo } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Function to get personalized recommendations based on physical stats
export const getPersonalizedRecommendations = async (
  params: RecommendationParams
): Promise<AIRecommendation[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  const prompt = `
    사용자 정보:
    키: ${params.height}cm
    몸무게: ${params.weight}kg
    포지션: ${params.position}
    플레이스타일: ${params.playStyle}

    위 사용자의 신체 조건과 플레이 스타일에 가장 적합한 현재 시중에서 구할 수 있는 농구화 모델 3가지를 추천해주세요.
    각 추천에 대해 구체적인 이유(쿠셔닝, 접지력, 피팅 등 신체 조건과의 연관성)를 설명해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              suitableFor: { type: Type.STRING, description: "이 제품이 특히 좋은 점 (짧게)" },
              reason: { type: Type.STRING, description: "사용자 스펙에 맞춘 추천 이유" }
            },
            required: ["productName", "suitableFor", "reason"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as AIRecommendation[];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

// Function to get player insights for a specific product
export const getProductCelebrities = async (productName: string): Promise<PlayerInfo[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  // Updated prompt to strictly target Wikimedia for valid images
  const prompt = `
    Find 3 famous basketball players who wear or are known for using "${productName}".
    
    For each player:
    1. Identify their Name and Team.
    2. Write a short comment about their style with this gear.
    3. Find a DIRECT image URL from "Wikimedia Commons" or a similar open license source.
       - STRICT RULE: The URL MUST start with "https://" and END with ".jpg", ".png", or ".webp".
       - STRICT RULE: Do NOT use "google.com/search", "google.com/imgres", or base64 data.
       - STRICT RULE: Prefer "upload.wikimedia.org" URLs.
       - If you cannot find a guaranteed direct image link, leave "imageUrl" empty ("").

    Output raw JSON array.
    Format:
    [
      {
        "name": "Player Name",
        "team": "Team Name",
        "comment": "Comment...",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/..." 
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    let text = response.text || "[]";
    
    // Clean up markdown code blocks if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Extract JSON array
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      text = text.substring(firstBracket, lastBracket + 1);
    }

    const data = JSON.parse(text) as PlayerInfo[];
    
    // POST-PROCESSING: Filter out garbage URLs
    const cleanedData = data.map(player => {
      let url = player.imageUrl || "";
      
      // Reject Google Search result pages masked as images
      if (url.includes('google.com') || url.includes('search?') || url.includes('imgres?')) {
        url = "";
      }
      
      // Reject non-image extensions
      if (url.length > 0 && !/\.(jpg|jpeg|png|webp|gif)$/i.test(url)) {
         // Allow wikimedia thumbnails which might have complex paths, but usually end in extension.
         // If it doesn't look like an image file, kill it.
         url = "";
      }

      return {
        ...player,
        imageUrl: url
      };
    });

    return cleanedData;
  } catch (error) {
    console.error("Error fetching player info:", error);
    return [];
  }
};