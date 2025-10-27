import React from 'react';
import { CloseIcon } from './Icons';

interface DocumentationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-400 mb-2 border-b border-dark-700 pb-1">{title}</h3>
        <div className="prose prose-invert prose-sm max-w-none text-light-200">
            {children}
        </div>
    </div>
);

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center p-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-dark-900 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
                <header className="flex items-center justify-between p-4 border-b border-dark-800 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-primary-400">Technical Documentation</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-colors"
                        aria-label="Close documentation"
                    >
                        <CloseIcon />
                    </button>
                </header>
                <div className="p-6 overflow-y-auto">
                    <Section title="Implementation Architecture">
                        <p>This tool is a single-page application (SPA) built with React and TypeScript. Styling is handled exclusively by Tailwind CSS for a modern, utility-first approach.</p>
                        <ul>
                            <li><strong>Frontend:</strong> React 18 with functional components and hooks.</li>
                            <li><strong>Language:</strong> TypeScript for type safety and improved developer experience.</li>
                            <li><strong>API Client:</strong> Official <code>@google/genai</code> SDK to interact with the Gemini API.</li>
                            <li><strong>State Management:</strong> Local component state is managed with <code>useState</code> and <code>useCallback</code>. Persistent state (history) uses <code>localStorage</code> via a custom hook.</li>
                            <li><strong>Styling:</strong> Tailwind CSS loaded via CDN.</li>
                        </ul>
                    </Section>
                    
                    <Section title="API Selection Rationale">
                        <p>The Google Gemini API was chosen for this project due to its powerful generative capabilities, ease of integration, and cost-effectiveness for creative text tasks.</p>
                        <ul>
                            <li><strong>Model:</strong> We use the <code>gemini-2.5-flash</code> model, which offers an excellent balance of performance, creativity, and speed, making it ideal for a responsive user experience.</li>
                            <li><strong>Flexibility:</strong> The Gemini API's support for system instructions allows for effective control over the output's tone and style (e.g., humorous, dramatic), a key feature of this tool. A slightly higher temperature (0.7) is used to encourage more creative and less predictable outputs.</li>
                            <li><strong>Scalability:</strong> The API is backed by Google's infrastructure, ensuring reliability and scalability.</li>
                        </ul>
                    </Section>

                    <Section title="Prompt Engineering Methodology">
                        <p>Our approach for creative writing focuses on role-playing, clear constraints, and rich context to inspire high-quality, imaginative output from the model.</p>
                        <ol>
                            <li><strong>Role-Playing:</strong> Each prompt assigns a creative persona to the AI (e.g., "You are a master storyteller," "You are a zen poet."). This primes the model to adopt the desired voice, style, and conventions for the chosen creative format.</li>
                            <li><strong>Contextual Grounding:</strong> The user's idea is embedded within a clear structure (e.g., `**Story Premise:**` or `**Theme:**`). This anchors the generation process to the user's core concept.</li>
                            <li><strong>Structured Instructions & Constraints:</strong> For formats with specific rules like poems, we provide explicit constraints (e.g., "strictly follow the 5-7-5 syllable structure" for a haiku, or "must be 14 lines" and follow a specific rhyme scheme for a sonnet). For narrative forms, instructions guide the structure (e.g., "beginning, rising action, climax, and resolution").</li>
                            <li><strong>Genre and Tone Specification:</strong> The user's chosen genre and tone are directly inserted into the prompt, ensuring the AI's output is stylistically aligned with their expectations.</li>
                        </ol>
                    </Section>
                    
                    <Section title="Rate Limits & Usage Costs">
                        <p>Usage of the Gemini API is subject to rate limits and costs. It's important to be aware of these to ensure uninterrupted service.</p>
                        <ul>
                            <li><strong>Rate Limits:</strong> The default rate limit for the Gemini Flash model is typically 60 requests per minute (RPM). Exceeding this limit will result in API errors.</li>
                            <li><strong>Costs:</strong> Pricing is based on the number of input and output tokens. For the most up-to-date pricing information, please refer to the official Google AI documentation.</li>
                            <li><a href="https://ai.google.dev/gemini-api/pricing" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:underline">Official Gemini API Pricing</a></li>
                        </ul>
                    </Section>

                    <Section title="Limitation Management">
                        <p>This tool is designed with several strategies to manage API and application limitations.</p>
                        <ul>
                            <li><strong>Error Handling:</strong> API calls are wrapped in <code>try...catch</code> blocks. Specific, user-friendly error messages are displayed in the UI.</li>
                            <li><strong>Performance Tracking:</strong> We track the generation time for each request, providing users with feedback on performance.</li>
                            <li><strong>Input Validation:</strong> Basic client-side validation prevents empty prompts from being sent to the API.</li>
                            <li><strong>Result Caching:</strong> The history panel, backed by <code>localStorage</code>, acts as a client-side cache, allowing users to revisit previous generations without making new API calls.</li>
                        </ul>
                    </Section>
                </div>
            </div>
        </div>
    );
};