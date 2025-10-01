---
title: "Typography & Fonts"
description: "Choose and optimize fonts for better readability and performance in your digital garden"
category: "Customizing"
lastUpdated: "2024-07-30"
---

# Typography & Fonts

Great typography is invisible—it serves your content without distracting from it. Here's how to choose, load, and optimize fonts for your digital garden.

## Font Selection Strategy

Choose fonts that enhance readability and reflect your garden's personality:

```css path=null start=null
/* System font stack for performance */
:root {
  --font-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SF Mono", Monaco, "Cascadia Code", "Consolas", monospace;
}

/* Web fonts for character */
:root {
  --font-serif: "Crimson Text", Georgia, serif;
  --font-sans: "Inter", var(--font-system);
  --font-mono: "Fira Code", var(--font-mono);
}

body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Efficient Font Loading

Load fonts strategically to avoid layout shifts and improve performance:

```html path=null start=null
<!-- Preconnect to font services -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Load critical fonts with font-display: swap -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>

<!-- Preload the most critical font file -->
<link
  rel="preload"
  href="/fonts/inter-regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

```css path=null start=null
/* Self-hosted fonts with proper fallbacks */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-regular.woff2") format("woff2"), url("/fonts/inter-regular.woff")
      format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Show fallback immediately, swap when loaded */
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

## Typography Scale

Create a harmonious type scale for consistent hierarchy:

```css path=null start=null
:root {
  /* Fluid typography that scales with viewport */
  --font-size-xs: clamp(0.75rem, 1.5vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 2vw, 1rem);
  --font-size-base: clamp(1rem, 2.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 4vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 5vw, 2rem);
  --font-size-3xl: clamp(2rem, 6vw, 2.5rem);

  /* Line heights for different contexts */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}

/* Apply to headings */
h1 {
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
  font-weight: 600;
}

h2 {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  font-weight: 500;
}

h3 {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-normal);
}

/* Optimized reading text */
.prose {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  max-width: 65ch; /* Optimal line length */
}
```

## Code Typography

Style code blocks for better readability:

```css path=null start=null
/* Inline code */
code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: hsl(220, 13%, 95%);
  padding: 0.125em 0.25em;
  border-radius: 0.25em;
  color: hsl(220, 14%, 25%);
}

/* Code blocks */
pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.4;
  background: hsl(220, 13%, 18%);
  color: hsl(220, 14%, 85%);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  tab-size: 2;
}

pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

/* Syntax highlighting with CSS */
.token.comment {
  color: hsl(220, 10%, 50%);
}
.token.keyword {
  color: hsl(286, 60%, 67%);
}
.token.string {
  color: hsl(119, 34%, 47%);
}
.token.number {
  color: hsl(35, 99%, 36%);
}
```

## Responsive Typography

Ensure text looks great on all devices:

```css path=null start=null
/* Base responsive setup */
html {
  /* Prevent iOS text size adjust after orientation change */
  -webkit-text-size-adjust: 100%;
}

/* Better text rendering */
body {
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  body {
    font-size: 1rem;
    line-height: 1.5;
  }

  h1,
  h2,
  h3 {
    line-height: 1.2;
  }

  /* Slightly larger tap targets on mobile */
  a,
  button {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}

/* High-resolution displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

## Font Performance Optimization

Monitor and optimize font loading:

```javascript path=null start=null
// Check if fonts loaded successfully
if ("fonts" in document) {
  document.fonts.ready.then(() => {
    console.log("All fonts loaded");
    document.documentElement.classList.add("fonts-loaded");
  });
}

// Font loading timeout fallback
setTimeout(() => {
  document.documentElement.classList.add("fonts-timeout");
}, 3000);

// Preload fonts based on user interaction
function preloadFonts() {
  const fontUrls = [
    "/fonts/inter-medium.woff2",
    "/fonts/fira-code-regular.woff2",
  ];

  fontUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";
    link.href = url;
    document.head.appendChild(link);
  });
}

// Preload on first interaction
document.addEventListener("mouseenter", preloadFonts, { once: true });
document.addEventListener("touchstart", preloadFonts, { once: true });
```

## Typography Accessibility

Ensure your text is readable for everyone:

```css path=null start=null
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-text: #000000;
    --color-background: #ffffff;
  }

  code {
    border: 1px solid currentColor;
  }
}

/* Larger text support */
@media (min-resolution: 2dppx) {
  body {
    font-size: 1.125rem;
  }
}

/* Focus states for keyboard navigation */
a:focus,
button:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

## Typography Utilities

Helpful utility classes for common typography needs:

```css path=null start=null
/* Text sizes */
.text-xs {
  font-size: var(--font-size-xs);
}
.text-sm {
  font-size: var(--font-size-sm);
}
.text-base {
  font-size: var(--font-size-base);
}
.text-lg {
  font-size: var(--font-size-lg);
}

/* Font weights */
.font-normal {
  font-weight: 400;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}

/* Text styles */
.lead {
  font-size: var(--font-size-lg);
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.small {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Reading optimizations */
.readable {
  max-width: 65ch;
  line-height: 1.7;
  font-size: 1.125rem;
}

/* Prevent orphans and widows */
.no-orphans {
  text-wrap: pretty; /* CSS Text 4 */
  orphans: 2;
  widows: 2;
}
```

## Font Selection Tips

1. **Limit font families**: Use 2-3 maximum for better performance
2. **Test readability**: Ensure text is readable at various sizes
3. **Consider personality**: Fonts should match your content's tone
4. **Check character support**: Ensure fonts support your language needs
5. **Optimize loading**: Use `font-display: swap` and preload critical fonts

Great typography enhances your content and creates a pleasant reading experience. Focus on readability, performance, and consistency across your digital garden.
