import { useTheme } from '../hooks/useTheme';

export default function LoadingSpinner({ fullScreen = true, size = 'md' }) {
  const { darkMode } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`${sizeClasses[size]} border-purple-200 dark:border-purple-900 border-t-purple-600 rounded-full animate-spin`}
      />
      {fullScreen && (
        <p
          className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Lädt...
        </p>
      )}
    </div>
  );

  if (!fullScreen) {
    return spinner;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode
          ? 'bg-gradient-to-b from-[#1a0b2e] via-[#0d0518] to-[#1a0b2e]'
          : 'bg-gradient-to-b from-purple-50 via-white to-purple-50'
      }`}
    >
      {spinner}
    </div>
  );
}
