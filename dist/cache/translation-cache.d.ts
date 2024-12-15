import { Language } from '../models/language';
import { TranslationFile } from '../models/translation';
export declare class TranslationCache {
    private static readonly TRANSLATIONS_KEY;
    private static readonly CURRENT_LANGUAGE_KEY;
    static saveTranslations(translations: Map<string, TranslationFile>): Promise<void>;
    static getTranslations(): Promise<Map<string, TranslationFile> | null>;
    static saveCurrentLanguage(language: Language): Promise<void>;
    static getCurrentLanguage(): Promise<Language | null>;
    static clearCache(): Promise<void>;
}
