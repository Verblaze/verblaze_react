<p align="center">
  <a href="https://www.verblaze.com/">
    <img src="https://www.verblaze.com/logo.svg" alt="Verblaze Logo" width="200"/>
  </a>
</p>

# Verblaze React SDK

Verblaze React SDK is a powerful translation management system integration that allows you to easily manage multilingual support in your application. With this SDK, you can dynamically manage and update your translations.

## Features

- 🌍 Multi-language support
- 🚀 Easy integration
- 💾 Automatic caching
- 🔄 Automatic version control and updates
- ⚡️ High-performance operation
- 🔌 Simple API integration
- 🎯 Auto-translated components
- 🔄 Robust error handling

## Getting Started

### Installation

```bash
npm install verblaze-react
# or
yarn add verblaze-react
```

### Configuration

Initialize the SDK in your application:

```tsx
import { VerblazeProvider } from 'verblaze-react'

function App() {
  return (
    <VerblazeProvider apiKey='YOUR_API_KEY'>
      <YourApp />
    </VerblazeProvider>
  )
}
```

## Usage

### Auto-Translated Components

```tsx
import { useVerblaze, vbt } from 'verblaze-react'

function WelcomeScreen() {
  const { isConfigured } = useVerblaze()

  if (!isConfigured) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{vbt('welcome.title')}</h1>
      <p>{vbt('welcome.description')}</p>
    </div>
  )
}
```

### Simple Translation

```tsx
// Using useVerblaze hook
const { translate } = useVerblaze()
const translatedText = translate('home.welcome')

// Or using vbt helper function
const translatedText = vbt('home.welcome')

// Translation for a specific language
const translatedText = vbt('home.welcome', 'en')
```

### Changing Language

```tsx
function LanguageSwitcher() {
  const { setLanguage, currentLanguage } = useVerblaze()

  return (
    <select
      value={currentLanguage?.code}
      onChange={(e) => setLanguage(e.target.value)}
    >
      <option value='en'>English</option>
      <option value='tr'>Türkçe</option>
      <option value='es'>Español</option>
    </select>
  )
}
```

## Advanced Usage

### Listing Supported Languages

```tsx
function LanguageList() {
  const { supportedLanguages } = useVerblaze()

  return (
    <ul>
      {supportedLanguages.map((lang) => (
        <li key={lang.code}>
          {lang.name} ({lang.nativeName})
        </li>
      ))}
    </ul>
  )
}
```

### Current Language Information

```tsx
function CurrentLanguageInfo() {
  const { currentLanguage } = useVerblaze()

  return <div>Current Language: {currentLanguage?.nativeName}</div>
}
```

## Error Handling

The SDK provides comprehensive error handling:

```tsx
function TranslatedText({ translationKey }: { translationKey: string }) {
  try {
    return <span>{vbt(translationKey)}</span>
  } catch (error) {
    console.error('Translation error:', error)
    return <span>{translationKey}</span>
  }
}
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Support

- Documentation: [Verblaze Documentation](https://verblaze.com/docs)
- Report issues: [GitHub Issues](https://github.com/verblaze/react-sdk/issues)
- Email: support@verblaze.com

## Security

If you discover a security vulnerability, please send an email to info@verblaze.com
