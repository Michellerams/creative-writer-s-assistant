import React, { useEffect } from 'react';
import { LogoIcon } from './Icons';

interface WelcomeAnimationProps {
    onFinish: () => void;
}

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3500); // Duration should be longer than animation

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50 animate-fadeOut pointer-events-none">
            <div className="text-center animate-fadeIn">
                <div className="flex justify-center mb-4">
                    <LogoIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl font-bold text-primary-400 overflow-hidden whitespace-nowrap border-r-4 border-r-secondary-400 mx-auto animate-typing animate-blink">
                    Creative Writer's Assistant
                </h1>
            </div>
        </div>
    );
};