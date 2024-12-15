import { Language } from '../models/language';
export declare class TranslationManager {
    private static instance;
    private translations;
    private currentLanguage;
    private supportedLanguages;
    private baseLanguage;
    private apiKey;
    private readonly baseUrl;
    private constructor();
    static getInstance(): TranslationManager;
    configure(apiKey: string): Promise<void>;
    private checkVersion;
    private fetchSupportedLanguages;
    private fetchTranslations;
    getTranslation(key: string, language?: string): string;
    setLanguage(languageCode: string): Promise<void>;
    getSupportedLanguages(): Language[];
    getCurrentLanguage(): Language | null;
}
