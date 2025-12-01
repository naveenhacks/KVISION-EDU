import { GoogleGenAI } from "@google/genai";

// Fix: Use process.env.API_KEY as per Google GenAI SDK guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIResponse = async (prompt: string, contextRole: string): Promise<string> => {
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