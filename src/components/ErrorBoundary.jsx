import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { fontSerif, fontSans } from '../data/styles';

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isDarkMode = document.documentElement.classList.contains('dark');

      return (
        <div
          style={fontSans}
          className={`min-h-screen flex items-center justify-center px-6 ${
            isDarkMode ? 'bg-[#1a0b2e] text-white' : 'bg-[#faf9f6] text-gray-900'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full text-center"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-red-900/30' : 'bg-red-50'
                }`}
              >
                <AlertTriangle
                  size={48}
                  className={isDarkMode ? 'text-red-400' : 'text-red-500'}
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>

            {/* Error Message */}
            <h1
              style={fontSerif}
              className="text-4xl md:text-5xl italic mb-4"
            >
              Oops! Something went wrong
            </h1>

            <p
              className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3 }}
                className={`mb-8 p-6 rounded-2xl text-left ${
                  isDarkMode ? 'bg-white/5' : 'bg-gray-100'
                }`}
              >
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-red-500">
                  Error Details (Development Mode)
                </h2>
                <pre className="text-xs overflow-auto max-h-40 font-mono">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleReload}
                className="bg-purple-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Reload Page
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleGoHome}
                className={`py-4 px-8 rounded-2xl font-bold border-2 transition-colors flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <Home size={18} />
                Go Home
              </motion.button>
            </div>

            {/* Support Message */}
            <p
              className={`mt-12 text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              If this problem persists, please contact support at{' '}
              <a
                href="mailto:support@purpleplanning.com"
                className="text-purple-500 hover:text-purple-600 underline"
              >
                support@purpleplanning.com
              </a>
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
