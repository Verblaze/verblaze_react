import React from 'react'
import { useVerblaze } from 'verblaze-react'

export const LanguageSelector = () => {
    const { currentLanguage, supportedLanguages, setLanguage } = useVerblaze()

    return (
        <select
            value={currentLanguage?.code}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-selector"
        >
            {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.general}
                </option>
            ))}
        </select>
    )
}