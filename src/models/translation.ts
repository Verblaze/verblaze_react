export interface TranslationResponse {
  data: {
    translations: {
      [languageCode: string]: TranslationList
    }
  }
}

export interface TranslationList extends Array<TranslationFileResponse> {}

export interface TranslationFileResponse {
  file_key: string
  file_title: string
  values: Record<string, string>
}

export interface TranslationFile {
  fileTitle: string
  fileKey: string
  values: Record<string, string>
}
