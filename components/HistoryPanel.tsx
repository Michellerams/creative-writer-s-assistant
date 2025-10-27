import React from 'react';
import { GenerationResult } from '../types';
import { CONTENT_TYPE_OPTIONS } from '../constants';
import { CloseIcon, TrashIcon } from './Icons';

interface HistoryPanelProps {
    isOpen: boolean;
    history: GenerationResult[];
    onSelect: (result: GenerationResult) => void;
    onClear: () => void;
    onClose: () => void;
}

const HistoryItem: React.FC<{item: GenerationResult, onSelect: (item: GenerationResult) => void}> = ({ item, onSelect }) => {
    const contentTypeLabel = CONTENT_TYPE_OPTIONS.find(opt => opt.value === item.params.contentType)?.label || 'Unknown Type';
    return (
        <li
            onClick={() => onSelect(item)}
            className="p-3 rounded-lg hover:bg-dark-800 cursor-pointer transition-colors"
        >
            <p className="font-semibold text-sm truncate">{contentTypeLabel}</p>
            <p className="text-xs text-light-400 truncate">Genre: {item.params.genre}</p>
            <p className="text-xs text-light-400 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
        </li>
    );
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, history, onSelect, onClear, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
        >
            <aside
                onClick={(e) => e.stopPropagation()}
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-dark-900 shadow-xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <header className="flex items-center justify-between p-4 border-b border-dark-800 flex-shrink-0">
                        <h2 className="text-lg font-bold text-primary-400">Generation History</h2>
                        <div className="flex items-center gap-2">
                             <button
                                onClick={onClear}
                                className="p-2 rounded-full hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                                aria-label="Clear history"
                                disabled={history.length === 0}
                            >
                                <TrashIcon />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-colors"
                                aria-label="Close history"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    </header>
                    <div className="flex-grow overflow-y-auto p-2">
                        {history.length > 0 ? (
                            <ul className="space-y-2">
                                {history.map(item => (
                                    <HistoryItem key={item.id} item={item} onSelect={onSelect} />
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-light-500 p-8">
                                <p>No history yet.</p>
                                <p className="text-sm">Generated items will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
};