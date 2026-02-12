/**
 * Design System Tokens
 * Central source of truth for design decisions
 */

// SPACING SCALE (8px grid system)
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '6rem',    // 96px
};

// TYPOGRAPHY SCALE
export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  '4xl': '3rem',     // 48px
  '5xl': '4rem',     // 64px
};

// LINE HEIGHTS
export const lineHeight = {
  tight: '1.2',      // Headings
  snug: '1.3',       // Subheadings
  normal: '1.5',     // Body text
  relaxed: '1.6',    // Long-form content
};

// FONT WEIGHTS
export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// LETTER SPACING
export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.05em',
  wider: '0.1em',
  widest: '0.15em',
};

// ANIMATION DURATIONS
export const duration = {
  fast: '200ms',
  normal: '300ms',
  slow: '600ms',
};

// ANIMATION EASINGS
export const easing = {
  smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  linear: 'linear',
};

// TOUCH TARGETS
export const touchTarget = {
  min: '44px',       // WCAG AAA minimum
  comfortable: '48px',
};

// BORDER RADIUS
export const borderRadius = {
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  full: '9999px',
};

// Z-INDEX SCALE
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
};

// BREAKPOINTS
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// COLORS (Dark Mode Compliant)
export const colors = {
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// SEMANTIC COLORS
export const semantic = {
  success: {
    light: { bg: '#ecfdf5', text: '#065f46' },
    dark: { bg: '#064e3b', text: '#6ee7b7' },
  },
  error: {
    light: { bg: '#fef2f2', text: '#991b1b' },
    dark: { bg: '#7f1d1d', text: '#fca5a5' },
  },
  warning: {
    light: { bg: '#fffbeb', text: '#92400e' },
    dark: { bg: '#78350f', text: '#fcd34d' },
  },
  info: {
    light: { bg: '#eff6ff', text: '#1e40af' },
    dark: { bg: '#1e3a8a', text: '#93c5fd' },
  },
};

export default {
  spacing,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  duration,
  easing,
  touchTarget,
  borderRadius,
  zIndex,
  breakpoints,
  colors,
  semantic,
};
