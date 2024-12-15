import { Language } from '../models/language'
import { TranslationFile } from '../models/translation'

export class TranslationCache {
  private static readonly TRANSLATIONS_KEY = 'verblaze_translations'
  private static readonly CURRENT_LANGUAGE_KEY = 'verblaze_current_language'

  static async saveTranslations(
    translations: Map<string, TranslationFile>
  ): Promise<void> {
    try {
      const serializedTranslations = JSON.stringify(
        Array.from(translations.entries())
      )
      localStorage.setItem(this.TRANSLATIONS_KEY, serializedTranslations)
    } catch (error) {
      console.error('Translation cache save error:', error)
    }
  }

  static async getTranslations(): Promise<Map<string, TranslationFile> | null> {
    try {
      const serializedTranslations = localStorage.getItem(this.TRANSLATIONS_KEY)
      if (!serializedTranslations) return null

      const entries = JSON.parse(serializedTranslations)
      return new Map(entries)
    } catch (error) {
      console.error('Translation cache get error:', error)
      return null
    }
  }

  static async saveCurrentLanguage(language: Language): Promise<void> {
    try {
      localStorage.setItem(this.CURRENT_LANGUAGE_KEY, JSON.stringify(language))
    } catch (error) {
      console.error('Current language save error:', error)
    }
  }

  static async getCurrentLanguage(): Promise<Language | null> {
    try {
      const serializedLanguage = localStorage.getItem(this.CURRENT_LANGUAGE_KEY)
      if (!serializedLanguage) return null

      return JSON.parse(serializedLanguage)
    } catch (error) {
      console.error('Current language get error:', error)
      return null
    }
  }

  static async clearCache(): Promise<void> {
    try {
      localStorage.removeItem(this.TRANSLATIONS_KEY)
    } catch (error) {
      console.error('Cache clear error:', error)
    }
  }
}
