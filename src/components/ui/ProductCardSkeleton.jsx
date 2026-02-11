import { useTheme } from '../../hooks/useTheme';

export default function ProductCardSkeleton() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`rounded-3xl overflow-hidden animate-pulse ${
        darkMode ? 'bg-white/5' : 'bg-gray-100'
      }`}
    >
      {/* Image Skeleton */}
      <div
        className={`aspect-[3/4] ${
          darkMode ? 'bg-white/10' : 'bg-gray-200'
        }`}
      />

      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <div
          className={`h-6 rounded-lg ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          } w-3/4`}
        />

        {/* Description */}
        <div className="space-y-2">
          <div
            className={`h-4 rounded ${
              darkMode ? 'bg-white/5' : 'bg-gray-100'
            } w-full`}
          />
          <div
            className={`h-4 rounded ${
              darkMode ? 'bg-white/5' : 'bg-gray-100'
            } w-5/6`}
          />
        </div>

        {/* Price */}
        <div
          className={`h-8 rounded-lg ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          } w-1/3 mt-4`}
        />
      </div>
    </div>
  );
}
