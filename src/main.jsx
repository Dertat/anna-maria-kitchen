import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/cyrillic-400.css';
import '@fontsource/inter/cyrillic-500.css';
import '@fontsource/inter/cyrillic-600.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/playfair-display/cyrillic-500.css';
import '@fontsource/playfair-display/cyrillic-600.css';
import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/playfair-display/latin-600.css';
import '@fontsource/playfair-display/latin-500-italic.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import { resetScrollOnReload } from './lib/scrollReset';
import { ThemeProvider } from './theme/ThemeProvider';
import './index.css';
import './logo-intro.css';

resetScrollOnReload();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
