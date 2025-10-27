
import { CreativeContentType, PromptTemplate, CreativeTone } from './types';

export const CONTENT_TYPE_OPTIONS: { value: CreativeContentType, label: string }[] = [
    { value: CreativeContentType.SHORT_STORY, label: 'Short Story' },
    { value: CreativeContentType.POEM_HAIKU, label: 'Poem (Haiku)' },
    { value: CreativeContentType.POEM_SONNET, label: 'Poem (Sonnet)' },
    { value: CreativeContentType.CHARACTER_BACKSTORY, label: 'Character Backstory' },
    { value: CreativeContentType.WORLD_BUILDING, label: 'World Building Snippet' },
];

export const TONE_OPTIONS: CreativeTone[] = [CreativeTone.DRAMATIC, CreativeTone.HUMOROUS, CreativeTone.WHIMSICAL, CreativeTone.SUSPENSEFUL, CreativeTone.SERIOUS];

export const PROMPT_TEMPLATES: Record<CreativeContentType, PromptTemplate> = {
    [CreativeContentType.SHORT_STORY]: {
        name: 'Short Story',
        description: 'Generate a short story from a premise.',
        placeholder: 'A detective who can talk to ghosts, trying to solve their own murder.',
        prompt: (promptText, genre) => `
          You are a master storyteller. Your task is to write a compelling short story in the ${genre} genre.

          **Story Premise:**
          ${promptText}

          **Instructions:**
          1.  Establish a clear setting and atmosphere.
          2.  Introduce a compelling protagonist with clear motivations.
          3.  Build a narrative with a clear beginning, rising action, climax, and resolution.
          4.  Use vivid descriptions and engaging dialogue.
          5.  Ensure the story fits the specified premise and genre.
          6.  The story should be brief, concise, and no more than 200 words.
        `,
    },
    [CreativeContentType.POEM_HAIKU]: {
        name: 'Poem (Haiku)',
        description: 'Generate a haiku (5-7-5 syllables) about a specific theme.',
        placeholder: 'An old, silent pond in autumn.',
        prompt: (promptText, genre) => `
          You are a zen poet. Your task is to compose a haiku about the provided theme.

          **Theme:**
          ${promptText}

          **Instructions:**
          1.  The poem must strictly follow the 5-7-5 syllable structure.
          2.  Evoke a clear image or feeling related to the theme.
          3.  The language should be simple, yet profound.
          4.  The output should be ONLY the three lines of the haiku.
        `,
    },
    [CreativeContentType.POEM_SONNET]: {
        name: 'Poem (Sonnet)',
        description: 'Generate a Shakespearean sonnet.',
        placeholder: 'The fleeting nature of a summer romance.',
        prompt: (promptText, genre) => `
          You are a classical poet in the style of William Shakespeare. Your task is to write a Shakespearean sonnet on the provided topic.

          **Topic:**
          ${promptText}

          **Instructions:**
          1.  The sonnet must be exactly 14 lines long.
          2.  It must be written in iambic pentameter.
          3.  It must follow the ABAB CDCD EFEF GG rhyme scheme.
          4.  The final couplet should provide a resolution or a turn of thought (a volta).
          5.  Use elevated, poetic language appropriate for the form.
          6.  The output should be ONLY the 14 lines of the sonnet.
        `,
    },
    [CreativeContentType.CHARACTER_BACKSTORY]: {
        name: 'Character Backstory',
        description: 'Create a detailed backstory for a character.',
        placeholder: 'An exiled royal guard, now working as a baker, who secretly protects a hidden artifact.',
        prompt: (promptText, genre) => `
          You are a character designer for a ${genre} story. Your task is to create a compelling backstory for a character based on the provided concept.

          **Character Concept:**
          ${promptText}

          **Instructions:**
          1.  Give the character a name and a brief physical description.
          2.  Describe their formative years and the key events that shaped them.
          3.  Explain their primary motivation, their greatest fear, and their core conflict (internal or external).
          4.  Detail their key relationships (allies, enemies, family).
          5.  Weave the character concept into a rich, believable history.
          6.  The output should be a concise backstory of 1-2 paragraphs.
        `,
    },
    [CreativeContentType.WORLD_BUILDING]: {
        name: 'World Building Snippet',
        description: 'Describe a unique location, culture, or concept for a fictional world.',
        placeholder: 'A city built on the back of a colossal, sleeping beast.',
        prompt: (promptText, genre) => `
          You are a master world builder for the ${genre} genre. Your task is to flesh out the provided concept into a rich and immersive world-building snippet.

          **Concept:**
          ${promptText}

          **Instructions:**
          1.  Provide a vivid description of the location, culture, or concept. Engage multiple senses.
          2.  Explain how it functions and its role within the larger world.
          3.  Describe the people who interact with it and how it affects their daily lives.
          4.  Hint at its history, legends, or secrets.
          5.  The output should be a single, rich paragraph that is concise and evocative.
        `,
    },
};
