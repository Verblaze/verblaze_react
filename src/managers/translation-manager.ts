import { Language } from '../models/language'
import { TranslationFile, TranslationList } from '../models/translation'
import { TranslationCache } from '../cache/translation-cache'
import { VerblazeException } from '../exceptions/verblaze-exception'

export class TranslationManager {
  private static instance: TranslationManager
  private translations: Map<string, TranslationFile> = new Map()
  private currentLanguage: Language | null = null
  private supportedLanguages: Language[] = []
  private baseLanguage: Language | null = null
  private apiKey: string | null = null
  private readonly baseUrl = 'https://api.verblaze.com/v1'

  private constructor() {}

  static getInstance(): TranslationManager {
    if (!this.instance) {
      this.instance = new TranslationManager()
    }
    return this.instance
  }

  async configure(apiKey: string): Promise<void> {
    this.apiKey = apiKey
    await this.checkVersion()
    await this.fetchSupportedLanguages()

    const savedLanguage = await TranslationCache.getCurrentLanguage()
    if (savedLanguage) {
      this.currentLanguage = savedLanguage
    }

    await this.fetchTranslations()
  }

  private async checkVersion(): Promise<void> {
    try {
      const currentVersion =
        localStorage.getItem('verblaze_translation_version') || '1'
      const response = await fetch(`${this.baseUrl}/version-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!
        },
        body: JSON.stringify({
          currentVersion: parseInt(currentVersion),
          platform: 'react'
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.data.needsUpdate) {
          localStorage.setItem(
            'verblaze_translation_version',
            data.data.latestVersion
          )
          await this.fetchTranslations()
          await TranslationCache.clearCache()
        }
      }
    } catch (error) {
      throw new VerblazeException(`Version check failed: ${error}`)
    }
  }

  private async fetchSupportedLanguages(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/supported-languages`, {
        headers: {
          'x-api-key': this.apiKey!
        }
      })

      if (response.ok) {
        const data = await response.json()
        this.supportedLanguages = data.data.supportedLanguages
        this.baseLanguage = data.data.baseLanguage
      }
    } catch (error) {
      throw new VerblazeException(
        `Failed to fetch supported languages: ${error}`
      )
    }
  }

  private async fetchTranslations(): Promise<void> {
    try {
      const cachedTranslations = await TranslationCache.getTranslations()
      if (cachedTranslations) {
        console.log('Using cached translations:', cachedTranslations)
        this.translations = cachedTranslations
        return
      }

      console.log(
        'Fetching translations for languages:',
        this.supportedLanguages
      )

      const response = await fetch(`${this.baseUrl}/translations/multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey!
        },
        body: JSON.stringify({
          languages: this.supportedLanguages.map((lang) => lang.code)
        })
      })

      console.log('Translation API Response Status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Raw API Response:', data)

        const translations = new Map<string, TranslationFile>()
        const translationsData = data.data.translations as Record<
          string,
          TranslationList
        >

        console.log('Parsed translations data:', translationsData)

        for (const [langCode, translationList] of Object.entries(
          translationsData
        )) {
          console.log(`Processing language: ${langCode}`, translationList)

          if (Array.isArray(translationList)) {
            for (const file of translationList) {
              const key = `${file.file_key}_${langCode}`
              console.log(`Adding translation file: ${key}`, file)

              translations.set(key, {
                fileTitle: file.file_title,
                fileKey: file.file_key,
                values: file.values
              })
            }
          } else {
            console.warn(
              `Invalid translation list for language ${langCode}:`,
              translationList
            )
          }
        }

        console.log('Final translations map:', translations)
        this.translations = translations
        await TranslationCache.saveTranslations(translations)
      } else {
        console.error('Translation API Error:', await response.text())
      }
    } catch (error) {
      console.error('Translation fetch error:', error)
      throw new VerblazeException(`Failed to fetch translations: ${error}`)
    }
  }

  getTranslation(key: string, language?: string): string {
    const langCode =
      language || this.currentLanguage?.code || this.baseLanguage?.code

    console.log('Getting translation:', {
      key,
      requestedLanguage: language,
      currentLanguage: this.currentLanguage?.code,
      baseLanguage: this.baseLanguage?.code,
      resolvedLanguage: langCode
    })

    if (!langCode) throw new VerblazeException('No language selected')

    const [fileKey, translationKey] = key.split('.')
    const translationFileKey = `${fileKey}_${langCode}`

    console.log('Looking up translation:', {
      fileKey,
      translationKey,
      translationFileKey,
      availableTranslations: Array.from(this.translations.keys())
    })

    const translationFile = this.translations.get(translationFileKey)
    if (!translationFile) {
      console.warn('Translation file not found:', {
        fileKey,
        langCode,
        availableFiles: Array.from(this.translations.keys())
      })
      throw new VerblazeException(
        `Translation file not found for key: ${fileKey} in language: ${langCode}`
      )
    }

    const translation = translationFile.values[translationKey]
    if (!translation) {
      console.warn('Translation key not found:', {
        translationKey,
        fileKey,
        availableKeys: Object.keys(translationFile.values)
      })
      throw new VerblazeException(
        `Translation key not found: ${translationKey} in file: ${fileKey}`
      )
    }

    return translation
  }

  async setLanguage(languageCode: string): Promise<void> {
    const language = this.supportedLanguages.find(
      (lang) => lang.code === languageCode
    )
    if (!language) {
      throw new VerblazeException(`Language not supported: ${languageCode}`)
    }

    this.currentLanguage = language
    await TranslationCache.saveCurrentLanguage(language)
  }

  getSupportedLanguages(): Language[] {
    return this.supportedLanguages
  }

  getCurrentLanguage(): Language | null {
    return this.currentLanguage
  }
}
