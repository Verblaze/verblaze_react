import React from 'react';
import { Language } from '../models/language';
interface VerblazeContextType {
    isConfigured: boolean;
    currentLanguage: Language | null;
    supportedLanguages: Language[];
    setLanguage: (languageCode: string) => Promise<void>;
    translate: (key: string, language?: string) => string;
}
interface VerblazeProviderProps {
    children: React.ReactNode;
    apiKey: string;
}
export declare const VerblazeProvider: React.FC<VerblazeProviderProps>;
export declare const useVerblaze: () => VerblazeContextType;
export declare const vbt: (key: string, language?: string | undefined) => string;
export {};
