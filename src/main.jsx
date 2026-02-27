import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';

// Globale Fehler-Handler: fangen alles, was ErrorBoundary nicht sieht
// (async Fehler, Event-Handler, Fehler außerhalb des React-Trees).
// Hier lässt sich später Sentry.captureException() einsetzen.
window.addEventListener('error', (event) => {
  console.error('[Global Error]', event.error ?? event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise Rejection]', event.reason);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ThemeProvider>
            <LanguageProvider>
              <CookieConsentProvider>
                <CartProvider>
                  <UserProvider>
                    <App />
                  </UserProvider>
                </CartProvider>
              </CookieConsentProvider>
            </LanguageProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
