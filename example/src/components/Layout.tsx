import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useVerblaze } from 'verblaze-react'
import { LanguageSelector } from './LanguageSelector'

export const Layout = () => {
    const { isConfigured } = useVerblaze()

    if (!isConfigured) {
        return <div>Loading...</div>
    }

    return (
        <div className="app-container">
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
                <LanguageSelector />
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
} 