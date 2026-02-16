import { Component } from 'react';
import { fontSerif, fontSans } from '../data/styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service (Sentry, etc.)
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-purple-50 to-white dark:from-[#1a0b2e] dark:to-[#0d0518]">
          <div className="max-w-2xl text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1
              style={fontSerif}
              className="text-4xl md:text-5xl mb-6 text-gray-900 dark:text-white"
            >
              Oops! Etwas ist schiefgelaufen
            </h1>

            <p
              style={fontSans}
              className="text-lg mb-8 text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Keine Sorge, wir haben das Problem erkannt. Bitte versuche die Seite neu zu laden.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-purple-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:bg-purple-700 hover:shadow-xl active:scale-[0.98] transition-all"
              >
                Seite neu laden
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="bg-white dark:bg-white/10 text-purple-600 dark:text-white py-4 px-8 rounded-2xl font-bold border-2 border-purple-200 dark:border-white/20 hover:border-purple-400 active:scale-[0.98] transition-all"
              >
                Zurück zur Startseite
              </button>
            </div>

            {/* Error Details (development only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-12 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">
                  Technische Details (nur in Entwicklung sichtbar)
                </summary>
                <div className="mt-4 p-6 bg-gray-100 dark:bg-white/5 rounded-xl overflow-auto">
                  <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
