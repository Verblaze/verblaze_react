import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { VerblazeProvider } from 'verblaze-react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'

const App = () => {
  return (
    <VerblazeProvider apiKey="YOUR-API-KEY">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </VerblazeProvider>
  )
}

export default App

