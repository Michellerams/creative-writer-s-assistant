
export enum CreativeContentType {
    SHORT_STORY = 'SHORT_STORY',
    POEM_HAIKU = 'POEM_HAIKU',
    POEM_SONNET = 'POEM_SONNET',
    CHARACTER_BACKSTORY = 'CHARACTER_BACKSTORY',
    WORLD_BUILDING = 'WORLD_BUILDING',
}

export enum CreativeTone {
    DRAMATIC = 'Dramatic',
    HUMOROUS = 'Humorous',
    WHIMSICAL = 'Whimsical',
    SUSPENSEFUL = 'Suspenseful',
    SERIOUS = 'Serious',
}

export interface GenerationParams {
    contentType: CreativeContentType;
    genre: string;
    tone: CreativeTone;
    promptText: string;
}

export interface GenerationResult {
    id: string;
    params: GenerationParams;
    output: string;
    timestamp: string;
    performance: {
        generationTime: number; // in milliseconds
    };
}

export interface PromptTemplate {
    name: string;
    description: string;
    placeholder: string;
    prompt: (promptText: string, genre: string) => string;
}