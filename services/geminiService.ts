import { GoogleGenAI } from "@google/genai";

// Safe environment variable access helper
const getEnv = (key: string): string | undefined => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      // @ts-ignore
      return import.meta.env[key];
    }
  } catch (e) {}
  return undefined;
};

const apiKey = getEnv('API_KEY') || getEnv('VITE_GEMINI_API_KEY');

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_TO_PREVENT_CRASH' });

export const generateAIResponse = async (prompt: string, contextRole: string): Promise<string> => {
  if (!apiKey) {
    return "AI Configuration Error: API Key is missing. Please check your environment variables.";
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    const systemInstruction = `You are K-Assistant, a helpful AI integrated into KVISION Academy's management system. 
    Your current user role context is: ${contextRole}.
    
    If context is STUDENT: Help with homework, explain concepts, summarize notes. Keep it encouraging.
    If context is TEACHER: Help create lesson plans, quiz questions, or report comments. Professional tone.
    If context is ADMIN: Help draft announcements, emails, or analyze school data trends. Formal tone.
    
    Keep responses concise and formatted nicely.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};