// Shared visual identity — matches the course stylesheet (assets/course.css)
export const T = {
  paper: "#fdfcf9",
  ink: "#1a1a1a",
  inkSoft: "#555555",
  line: "#e3ded4",
  accent: "#b3542c",
  accentSoft: "#fdf0e7",
  blue: "#2c5e8a",
  blueSoft: "#e3edf5",
  green: "#3e7d4e",
  greenSoft: "#e5f1e8",
  gold: "#9a7b2d",
  goldSoft: "#f5eeda",
  font: "'Iowan Old Style', Palatino, Georgia, serif",
  sans: "-apple-system, 'Segoe UI', 'Helvetica Neue', sans-serif",
  mono: "'SF Mono', Menlo, Consolas, monospace",
} as const;

// 1920×1080 sizing (video-layout minimums, scaled up from 1080p guidance)
export const SZ = {
  headline: 128,
  support: 68,
  label: 48,
  small: 40,
} as const;

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
