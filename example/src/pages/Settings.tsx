import React from 'react'
import { useVerblaze, vbt } from 'verblaze-react'

export const Settings = () => {
    const { currentLanguage, supportedLanguages, setLanguage } = useVerblaze()

    return (
        <div className="settings-page">
            <h2>{vbt('settings.title')}</h2>

            <div className="settings-section">
                <h3>{vbt('settings.language_settings')}</h3>
                <div className="language-list">
                    {supportedLanguages.map((lang) => (
                        <div
                            key={lang.code}
                            className={`language-item ${currentLanguage?.code === lang.code ? 'active' : ''
                                }`}
                            onClick={() => setLanguage(lang.code)}
                        >
                            <span className="language-name">{lang.general}</span>
                            <span className="language-code">({lang.code})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 