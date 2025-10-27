
import { GoogleGenAI } from "@google/genai";
import { CreativeTone } from "../types";

// Assume process.env.API_KEY is available in the execution environment
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully,
  // but for this environment, we'll throw an error if the key is missing.
  console.error("API_KEY environment variable not set!");
}

const getSystemInstruction = (tone: CreativeTone): string => {
    switch (tone) {
        case CreativeTone.HUMOROUS:
            return "You are a witty and humorous writer. Your tone should be lighthearted, clever, and entertaining.";
        case CreativeTone.DRAMATIC:
            return "You are a dramatic storyteller. Your tone should be serious, evocative, and emotionally resonant. Build tension and use powerful imagery.";
        case CreativeTone.WHIMSICAL:
            return "You are a whimsical and imaginative author. Your style is playful, magical, and charming, reminiscent of fairy tales.";
        case CreativeTone.SUSPENSEFUL:
             return "You are a master of suspense. Your writing should be tense, mysterious, and keep the reader on the edge of their seat. Use foreshadowing and create an atmosphere of unease.";
        case CreativeTone.SERIOUS:
        default:
            return "You are a serious and thoughtful author. Your tone should be formal, profound, and literary. Focus on deep themes and sophisticated language.";
    }
};

export const generateDocumentation = async (
    prompt: string, 
    tone: CreativeTone,
    onChunk: (chunk: string) => void
): Promise<string> => {
    // A new instance should be created for each call to ensure the latest API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    try {
        const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: getSystemInstruction(tone),
                temperature: 0.7, // Slightly higher for more creativity
                topP: 0.95,
                topK: 64,
            },
        });
        
        let fullText = "";
        for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullText += chunkText;
                onChunk(chunkText);
            }
        }
        
        return fullText;

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        throw new Error(
            `Failed to generate content: ${error.message || 'An unknown API error occurred.'}`
        );
    }
};
