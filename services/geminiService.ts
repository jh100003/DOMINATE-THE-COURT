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

  const prompt = `
    "${productName}" 농구화를 실제로 경기에서 착용했거나, 이 시리즈와 연관이 깊은 유명 NBA 선수나 셀럽 3명을 알려주세요.
    선수의 이름, 소속 팀(전성기 또는 현재), 그리고 그 선수가 이 신발을 신었을 때의 퍼포먼스나 스타일에 대한 짧은 코멘트를 포함해주세요.
    
    또한, 가능하다면 해당 선수의 경기 장면이나 프로필 사진의 공개된 URL(위키미디어 등)을 'imageUrl' 필드에 넣어주세요. 
    만약 확실한 이미지 URL을 찾기 어렵다면, imageUrl은 빈 문자열로 두세요.
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
              name: { type: Type.STRING },
              team: { type: Type.STRING },
              comment: { type: Type.STRING },
              imageUrl: { type: Type.STRING, description: "URL of the player image if available" }
            },
            required: ["name", "team", "comment"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as PlayerInfo[];
  } catch (error) {
    console.error("Error fetching player info:", error);
    return [];
  }
};