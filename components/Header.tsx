import React from 'react';
import { DocsIcon, HistoryIcon, LogoIcon } from './Icons';

interface HeaderProps {
    onToggleHistory: () => void;
    onToggleDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory, onToggleDocs }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-dark-900 border-b border-dark-800 shadow-md flex-shrink-0">
            <div className="flex items-center gap-3">
                <LogoIcon />
                <h1 className="text-xl font-bold text-primary-400">Creative Writer's Assistant</h1>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onToggleDocs}
                    className="p-2 rounded-full hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    aria-label="Show Documentation"
                >
                    <DocsIcon />
                </button>
                <button
                    onClick={onToggleHistory}
                    className="p-2 rounded-full hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    aria-label="Show History"
                >
                    <HistoryIcon />
                </button>
            </div>
        </header>
    );
};