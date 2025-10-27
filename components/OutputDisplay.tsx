import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GenerationResult } from '../types';
import { CopyIcon, DownloadIcon, InfoIcon } from './Icons';

interface OutputDisplayProps {
    result: GenerationResult | null;
    isLoading: boolean;
    error: string | null;
    streamingOutput: string;
}

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-light-500">
        <InfoIcon />
        <h3 className="mt-2 text-lg font-medium">Your creative content will appear here.</h3>
        <p className="text-sm">Choose your settings on the left and write a prompt to begin.</p>
    </div>
);

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-primary-400">
         <svg className="animate-spin h-10 w-10 text-primary-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg">Generating content...</p>
        <p className="text-sm text-light-400">The muse is at work.</p>
    </div>
);


const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
        <h3 className="text-lg font-bold">Generation Failed</h3>
        <p className="text-sm mt-2">{message}</p>
    </div>
);

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ result, isLoading, error, streamingOutput }) => {
    
    const handleCopy = () => {
        if (result?.output) {
            navigator.clipboard.writeText(result.output).then(() => {
                alert('Copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    const handleDownload = () => {
        if (result?.output) {
            const blob = new Blob([result.output], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `creative-writer-ai-${result.id}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const outputText = isLoading ? streamingOutput : result?.output;

    return (
        <div className="bg-dark-900 rounded-lg shadow-lg flex flex-col h-full">
            <div className="flex justify-between items-center p-2 border-b border-dark-800">
                <h2 className="text-lg font-semibold text-primary-400 px-2">Generated Output</h2>
                {result && !isLoading && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-secondary-400">
                            Time: {result.performance.generationTime}ms
                        </span>
                        <button onClick={handleCopy} className="p-2 rounded-md hover:bg-dark-800 transition-colors" aria-label="Copy output">
                            <CopyIcon />
                        </button>
                        <button onClick={handleDownload} className="p-2 rounded-md hover:bg-dark-800 transition-colors" aria-label="Download output">
                            <DownloadIcon />
                        </button>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
                {isLoading && !streamingOutput && <Loader />}
                {error && <ErrorDisplay message={error} />}
                {!error && !result && !isLoading && <Placeholder />}
                {outputText && (
                    <article className="prose prose-invert prose-sm max-w-none prose-pre:bg-dark-950 prose-pre:rounded-md">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {outputText}
                        </ReactMarkdown>
                        {isLoading && <span className="inline-block w-2 h-4 bg-secondary-400 animate-pulse ml-1 align-bottom"></span>}
                    </article>
                )}
            </div>
        </div>
    );
};