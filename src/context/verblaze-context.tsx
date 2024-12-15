import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../models/language';
import { TranslationManager } from '../managers/translation-manager';

interface VerblazeContextType {
    isConfigured: boolean;
    currentLanguage: Language | null;
    supportedLanguages: Language[];
    setLanguage: (languageCode: string) => Promise<void>;
    translate: (key: string, language?: string) => string;
}

const VerblazeContext = createContext<VerblazeContextType | undefined>(undefined);

interface VerblazeProviderProps {
    children: React.ReactNode;
    apiKey: string;
}

export const VerblazeProvider: React.FC<VerblazeProviderProps> = ({ children, apiKey }) => {
    const [isConfigured, setIsConfigured] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
    const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([]);
    const manager = TranslationManager.getInstance();

    useEffect(() => {
        const initialize = async () => {
            try {
                await manager.configure(apiKey);
                setIsConfigured(true);
                setCurrentLanguage(manager.getCurrentLanguage());
                setSupportedLanguages(manager.getSupportedLanguages());
            } catch (error) {
                console.error('Verblaze initialization error:', error);
            }
        };

        initialize();
    }, [apiKey]);

    const setLanguage = async (languageCode: string) => {
        await manager.setLanguage(languageCode);
        setCurrentLanguage(manager.getCurrentLanguage());
    };

    const translate = (key: string, language?: string): string => {
        try {
            return manager.getTranslation(key, language);
        } catch (error) {
            console.error('Translation error:', error);
            return key; // Hata durumunda key'i döndür
        }
    };

    return (
        <VerblazeContext.Provider
            value={{
                isConfigured,
                currentLanguage,
                supportedLanguages,
                setLanguage,
                translate
            }}
        >
            {children}
        </VerblazeContext.Provider>
    );
};

export const useVerblaze = () => {
    const context = useContext(VerblazeContext);
    if (context === undefined) {
        throw new Error('useVerblaze must be used within a VerblazeProvider');
    }
    return context;
};

export const vbt = (key: string, language?: string): string => {
    const context = useVerblaze();
    return context.translate(key, language);
};