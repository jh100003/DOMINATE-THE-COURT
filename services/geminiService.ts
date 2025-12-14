import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationParams, AIRecommendation, PlayerInfo, Category } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

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

  // Filter for shoes only as recommendations are typically for footwear in this context
  // or allow all if the user didn't specify, but usually shoes are the main gear.
  // Let's provide Shoes and Accessories (like ankle braces) if injury is present.
  const availableProductsContext = INITIAL_PRODUCTS
    .map(p => `- ID: "${p.id}", Name: "${p.name}", Category: "${p.category}", Features: "${p.description}"`)
    .join('\n');

  const prompt = `
    사용자 정보:
    키: ${params.height}cm
    몸무게: ${params.weight}kg
    포지션: ${params.position}
    플레이스타일: ${params.playStyle}
    부상 이력 및 걱정되는 부위: ${params.injuryHistory || "없음"}

    보유 제품 데이터베이스:
    ${availableProductsContext}

    위 "보유 제품 데이터베이스"에 있는 제품들 중에서만 선택하여, 이 사용자에게 가장 적합한 제품 3가지를 추천해주세요.
    농구화가 가장 우선이지만, 심각한 부상 이력이 있다면 보호대(Category: 보호대/기어)를 섞어서 추천해도 됩니다.
    
    각 추천 제품에 대해 다음 정보를 제공해주세요:
    1. productId (데이터베이스에 있는 정확한 ID 값)
    2. productName (데이터베이스에 있는 정확한 이름)
    3. 이 제품이 이 사용자에게 특히 적합한 이유 (짧은 요약)
    4. 구체적인 추천 사유 (사용자의 신체조건, 스타일, 부상 이력과 연결지어 설명)
    5. matchPercentage (0-100 사이의 정수): 사용자와의 적합도 점수
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
              productId: { type: Type.STRING, description: "Must match one of the IDs from the provided list" },
              productName: { type: Type.STRING },
              suitableFor: { type: Type.STRING, description: "이 제품이 특히 좋은 점 (짧게)" },
              reason: { type: Type.STRING, description: "사용자 스펙 및 부상 이력에 맞춘 상세 추천 이유" },
              matchPercentage: { type: Type.NUMBER, description: "User suitability score 0-100" }
            },
            required: ["productId", "productName", "suitableFor", "reason", "matchPercentage"]
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