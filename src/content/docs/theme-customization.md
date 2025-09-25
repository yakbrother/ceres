---
title: "Theme Customization"
description: "Customize colors, fonts, and layouts to make your digital garden uniquely yours"
---

# Theme Customization

Transform your digital garden's appearance with CSS custom properties and modern styling techniques. Here's how to create a theme that reflects your personality.

## CSS Custom Properties Setup

Use CSS variables for consistent theming across your site:

```css path=null start=null
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 1rem;
  --line-height: 1.6;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  
  /* Borders & Shadows */
  --border-radius: 0.5rem;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Apply variables */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  color: var(--color-text);
  background: var(--color-background);
}
```

## Dark Mode Implementation

Create a seamless dark/light mode toggle:

```css path=null start=null
/* Light theme (default) */
:root {
  --color-background: #ffffff;
  --color-text: #1e293b;
  --color-surface: #f8fafc;
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-text: #f1f5f9;
  --color-surface: #1e293b;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

```javascript path=null start=null
// Theme toggle functionality
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Initialize on page load
initTheme();

// Add toggle button
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
```

## Typography Customization

Fine-tune your text for better readability:

```css path=null start=null
/* Typography scale */
:root {
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
}

/* Heading styles */
h1, h2, h3, h4, h5, h6 {
  color: var(--color-text);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--space-md);
}

h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
h3 { font-size: var(--font-size-xl); }

/* Body text */
p {
  margin-bottom: var(--space-md);
  max-width: 65ch; /* Optimal reading width */
}

/* Code styling */
code {
  font-family: 'Fira Code', monospace;
  background: var(--color-surface);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

pre {
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  overflow-x: auto;
}
```

## Color Schemes

Create beautiful color palettes:

```css path=null start=null
/* Nature theme */
.theme-nature {
  --color-primary: #22c55e;
  --color-secondary: #84cc16;
  --color-accent: #eab308;
}

/* Ocean theme */
.theme-ocean {
  --color-primary: #0ea5e9;
  --color-secondary: #06b6d4;
  --color-accent: #8b5cf6;
}

/* Sunset theme */
.theme-sunset {
  --color-primary: #f97316;
  --color-secondary: #ef4444;
  --color-accent: #ec4899;
}

/* Apply theme classes */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
  padding: var(--space-md);
}
```

## Layout Components

Style common components with your theme:

```css path=null start=null
/* Navigation */
.nav {
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.nav a {
  color: var(--color-text-muted);
  text-decoration: none;
  padding: var(--space-sm);
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.nav a:hover,
.nav a[aria-current="page"] {
  background: var(--color-primary);
  color: white;
}

/* Cards */
.card {
  background: var(--color-surface);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  padding: var(--space-lg);
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: color-mix(in srgb, var(--color-primary) 90%, black);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-secondary);
}
```

## Responsive Design

Make your theme work on all devices:

```css path=null start=null
/* Mobile-first approach */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

/* Responsive typography */
:root {
  --font-size-base: clamp(1rem, 2.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 4vw, 1.5rem);
}

/* Responsive spacing */
:root {
  --space-responsive: clamp(1rem, 4vw, 2rem);
}

/* Media queries */
@media (min-width: 768px) {
  .grid {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--space-lg);
  }
}

@media (max-width: 767px) {
  .nav {
    flex-direction: column;
  }
  
  .card {
    margin-bottom: var(--space-md);
  }
}
```

## Theme Switching

Allow users to choose from multiple themes:

```javascript path=null start=null
const themes = {
  light: {
    '--color-background': '#ffffff',
    '--color-text': '#1e293b',
    '--color-primary': '#3b82f6'
  },
  dark: {
    '--color-background': '#0f172a',
    '--color-text': '#f1f5f9',
    '--color-primary': '#60a5fa'
  },
  nature: {
    '--color-background': '#f0fdf4',
    '--color-text': '#166534',
    '--color-primary': '#22c55e'
  }
};

function applyTheme(themeName) {
  const theme = themes[themeName];
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  localStorage.setItem('theme', themeName);
}

// Theme selector
function createThemeSelector() {
  const selector = document.createElement('select');
  selector.innerHTML = `
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="nature">Nature</option>
  `;
  
  selector.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });
  
  return selector;
}
```

## Quick Customization Tips

1. **Start with variables**: Define all colors and sizes as CSS custom properties
2. **Use semantic naming**: `--color-primary` instead of `--color-blue`
3. **Test accessibility**: Ensure sufficient contrast ratios (4.5:1 minimum)
4. **Mobile first**: Design for small screens, then enhance for larger ones
5. **Smooth transitions**: Add subtle animations for better user experience

Your theme should enhance readability and reflect your digital garden's personality while maintaining accessibility and usability across all devices.