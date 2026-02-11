import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 *
 * Provides optimized image loading with:
 * - Responsive srcset for different viewport sizes
 * - WebP format support with fallback
 * - Lazy loading
 * - Loading skeleton/placeholder
 * - Optimized Unsplash URLs
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  aspectRatio = 'auto',
  objectFit = 'cover',
  showPlaceholder = true,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Optimize Unsplash URLs with query parameters
  const optimizeUnsplashUrl = (url, width, format = 'auto') => {
    if (!url) return '';

    // Check if it's an Unsplash URL
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${width}&q=75&fm=${format}&fit=crop&auto=format`;
    }

    // Return original URL for non-Unsplash images
    return url;
  };

  // Generate srcset for different viewport sizes
  const generateSrcSet = (baseUrl, format = 'auto') => {
    const widths = [400, 640, 768, 1024, 1280, 1536, 1920];

    return widths
      .map((width) => `${optimizeUnsplashUrl(baseUrl, width, format)} ${width}w`)
      .join(', ');
  };

  // Generate WebP srcset
  const webpSrcSet = generateSrcSet(src, 'webp');
  // Generate fallback srcset (JPEG/PNG)
  const fallbackSrcSet = generateSrcSet(src, 'jpg');

  // Optimized default src (medium size)
  const optimizedSrc = optimizeUnsplashUrl(src, 800);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setImageLoaded(true);
  };

  return (
    <div className={`relative ${className}`} style={{ aspectRatio }}>
      {/* Loading Placeholder */}
      {showPlaceholder && !imageLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: imageLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-purple-800/10"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-12 h-12 rounded-full bg-purple-300/30 dark:bg-purple-600/30"
            />
          </div>
        </motion.div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      ) : (
        <picture>
          {/* WebP source for modern browsers */}
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />

          {/* Fallback source for older browsers */}
          <source type="image/jpeg" srcSet={fallbackSrcSet} sizes={sizes} />

          {/* Fallback img tag */}
          <motion.img
            src={optimizedSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          />
        </picture>
      )}
    </div>
  );
}
