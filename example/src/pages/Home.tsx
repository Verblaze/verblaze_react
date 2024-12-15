import React from 'react'
import { useVerblaze, vbt } from 'verblaze-react'

export const Home = () => {
    const { currentLanguage } = useVerblaze()

    return (
        <div className="home-page">
            <h1>{vbt('home.title')}</h1>
            <p>{vbt('home.welcome_message')}</p>
            <div className="language-info">
                <p>
                    Current Language: {currentLanguage?.general} ({currentLanguage?.code})
                </p>
            </div>
        </div>
    )
} 