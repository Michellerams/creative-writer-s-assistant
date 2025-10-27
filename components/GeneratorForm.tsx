import React, { useState, useEffect } from 'react';
import { GenerationParams, CreativeContentType, CreativeTone } from '../types';
import { CONTENT_TYPE_OPTIONS, TONE_OPTIONS, PROMPT_TEMPLATES } from '../constants';

interface GeneratorFormProps {
    onGenerate: (params: GenerationParams) => void;
    isLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
    const [contentType, setContentType] = useState<CreativeContentType>(CreativeContentType.SHORT_STORY);
    const [genre, setGenre] = useState<string>('Fantasy');
    const [tone, setTone] = useState<CreativeTone>(CreativeTone.DRAMATIC);
    const [promptText, setPromptText] = useState<string>('');
    const [placeholder, setPlaceholder] = useState<string>('');

    useEffect(() => {
        const template = PROMPT_TEMPLATES[contentType];
        setPlaceholder(template.placeholder);
        setPromptText(''); // Clear prompt input on type change
    }, [contentType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!promptText.trim()) {
            alert('Please provide an idea or prompt to generate content.');
            return;
        }
        onGenerate({ contentType, genre, tone, promptText });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-dark-900 p-4 rounded-lg shadow-lg flex flex-col h-full space-y-4">
            <h2 className="text-lg font-semibold text-primary-400 border-b border-dark-800 pb-2">Generation Controls</h2>
            
            <div>
                <label htmlFor="contentType" className="block text-sm font-medium text-light-400 mb-1">Content Type</label>
                <select
                    id="contentType"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as CreativeContentType)}
                    className="w-full bg-dark-800 border border-dark-700 rounded-md p-2 focus:ring-secondary-500 focus:border-secondary-500"
                >
                    {CONTENT_TYPE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label htmlFor="genre" className="block text-sm font-medium text-light-400 mb-1">Genre</label>
                    <input
                        id="genre"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-700 rounded-md p-2 focus:ring-secondary-500 focus:border-secondary-500"
                        placeholder="e.g., Sci-Fi, Mystery"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="tone" className="block text-sm font-medium text-light-400 mb-1">Output Tone</label>
                    <select
                        id="tone"
                        value={tone}
                        onChange={(e) => setTone(e.target.value as CreativeTone)}
                        className="w-full bg-dark-800 border border-dark-700 rounded-md p-2 focus:ring-secondary-500 focus:border-secondary-500"
                    >
                        {TONE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                <label htmlFor="promptText" className="block text-sm font-medium text-light-400 mb-1">Your Idea / Prompt</label>
                <textarea
                    id="promptText"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-full flex-grow bg-dark-950 border border-dark-700 rounded-md p-2 font-mono text-sm focus:ring-secondary-500 focus:border-secondary-500 resize-none"
                />
            </div>
            
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-600 disabled:bg-dark-700 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                {isLoading ? (
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Generate Content'}
            </button>
        </form>
    );
};