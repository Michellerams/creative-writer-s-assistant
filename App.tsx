import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { OutputDisplay } from './components/OutputDisplay';
import { HistoryPanel } from './components/HistoryPanel';
import { DocumentationModal } from './components/DocumentationModal';
import { WelcomeAnimation } from './components/WelcomeAnimation';
import { generateDocumentation } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GenerationResult, GenerationParams } from './types';
import { PROMPT_TEMPLATES } from './constants';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
    const [history, setHistory] = useLocalStorage<GenerationResult[]>('creative-writer-history', []);
    const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState<boolean>(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);
    const [streamingOutput, setStreamingOutput] = useState<string>('');
    const [showWelcome, setShowWelcome] = useState<boolean>(!sessionStorage.getItem('welcomeShown'));

    const handleAnimationFinish = useCallback(() => {
        sessionStorage.setItem('welcomeShown', 'true');
        setShowWelcome(false);
    }, []);

    const handleGenerate = useCallback(async (params: GenerationParams) => {
        setIsLoading(true);
        setError(null);
        setCurrentResult(null);
        setStreamingOutput('');

        const startTime = Date.now();
        const template = PROMPT_TEMPLATES[params.contentType];
        const prompt = template.prompt(params.promptText, params.genre);

        try {
            const resultText = await generateDocumentation(prompt, params.tone, (chunk) => {
                setStreamingOutput(prev => prev + chunk);
            });
            const endTime = Date.now();
            
            // Clean up markdown code block fences if Gemini includes them
            const cleanedText = resultText.replace(/^```markdown\n|```$/g, "").trim();

            const newResult: GenerationResult = {
                id: `res-${Date.now()}`,
                params,
                output: cleanedText,
                timestamp: new Date().toISOString(),
                performance: {
                    generationTime: endTime - startTime,
                },
            };
            
            setCurrentResult(newResult);
            setHistory(prev => [newResult, ...prev.slice(0, 49)]); // Keep latest 50
        } catch (err: any) {
            console.error("Generation failed:", err);
            setError(err.message || 'An unknown error occurred. Please check the console.');
        } finally {
            setIsLoading(false);
        }
    }, [setHistory]);
    
    const handleSelectHistory = useCallback((result: GenerationResult) => {
        setCurrentResult(result);
        setStreamingOutput('');
    }, []);

    const handleClearHistory = useCallback(() => {
        setHistory([]);
    }, [setHistory]);

    if (showWelcome) {
        return <WelcomeAnimation onFinish={handleAnimationFinish} />;
    }

    return (
        <div className="min-h-screen bg-dark-950 text-light-200 flex flex-col">
            <Header 
                onToggleHistory={() => setIsHistoryPanelOpen(p => !p)} 
                onToggleDocs={() => setIsDocModalOpen(p => !p)} 
            />
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden p-4 gap-4">
                <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
                    <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
                </div>
                <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col">
                    <OutputDisplay result={currentResult} isLoading={isLoading} error={error} streamingOutput={streamingOutput} />
                </div>
            </main>
            <HistoryPanel 
                isOpen={isHistoryPanelOpen}
                history={history}
                onSelect={handleSelectHistory}
                onClear={handleClearHistory}
                onClose={() => setIsHistoryPanelOpen(false)}
            />
            <DocumentationModal 
                isOpen={isDocModalOpen}
                onClose={() => setIsDocModalOpen(false)}
            />
        </div>
    );
};

export default App;