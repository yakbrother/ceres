---
title: "Code Styling Demo"
category: "Customizing"
lastUpdated: "2025-01-01"
description: "Showcase of enhanced code block features including syntax highlighting, copy buttons, and language detection"
---

This page demonstrates the enhanced code styling features including syntax highlighting, copy buttons, language detection, and file path indicators.

## Basic Inline Code

Here's some `inline code` that should be styled properly. You can also reference specific functions like `useState()` or file paths like `/src/components/Button.tsx`.

## JavaScript Examples

```javascript path=/src/utils/helpers.js start=1
// JavaScript with syntax highlighting and copy button
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const searchHandler = debounce((query) => {
  performSearch(query);
}, 300);

export { debounce, searchHandler };
```

## TypeScript with React

```typescript path=/src/components/SearchBar.tsx start=12
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search...",
  className = "",
}) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${className}`}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search input"
      />
      <button type="submit" aria-label="Search">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
```

## CSS with Custom Properties

```css path=/src/styles/components.css start=45
/* Enhanced button component with accessibility */
.btn {
  /* Use CSS custom properties for theming */
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius);
  padding: var(--space-sm) var(--space-md);

  /* Typography */
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.2;

  /* Interaction states */
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-1px);
}

.btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Button variants */
.btn--secondary {
  background: transparent;
  color: var(--color-primary);
}

.btn--secondary:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
```

## Shell Commands

```bash path=null start=null
# Install dependencies
npm install sharp @astrojs/mdx

# Start development server
npm run dev

# Build for production
npm run build

# Run accessibility tests
npm run test:a11y

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## Configuration Files

```json path=/package.json start=1
{
  "name": "digital-garden-template",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test:a11y": "playwright test accessibility.spec.js"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/mdx": "^2.0.0",
    "sharp": "^0.32.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@axe-core/playwright": "^4.8.0"
  }
}
```

## YAML Configuration

```yaml path=/.github/workflows/deploy.yml start=1
name: Deploy Digital Garden
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: |
          npm run test
          npm run test:a11y

      - name: Build site
        run: npm run build

      - name: Deploy to Netlify
        if: github.ref == 'refs/heads/main'
        run: netlify deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## Python Example

```python path=/scripts/optimize-images.py start=1
#!/usr/bin/env python3
"""
Image optimization script for digital gardens.
Converts images to WebP format and generates responsive sizes.
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageOpt

class ImageOptimizer:
    """Optimizes images for web usage."""

    def __init__(self, input_dir: str, output_dir: str):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.sizes = [400, 800, 1200, 1600]
        self.formats = ['webp', 'jpg']

    def optimize_image(self, image_path: Path) -> None:
        """Optimize a single image file."""
        try:
            with Image.open(image_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')

                for size in self.sizes:
                    if img.width >= size:
                        # Resize image
                        resized = img.copy()
                        resized.thumbnail((size, size), Image.Resampling.LANCZOS)

                        for fmt in self.formats:
                            output_path = self.output_dir / f"{image_path.stem}-{size}w.{fmt}"

                            # Save with optimization
                            save_kwargs = {'optimize': True}
                            if fmt == 'webp':
                                save_kwargs['quality'] = 80
                            elif fmt == 'jpg':
                                save_kwargs['quality'] = 85
                                save_kwargs['progressive'] = True

                            resized.save(output_path, format=fmt.upper(), **save_kwargs)
                            print(f"Generated: {output_path}")

        except Exception as e:
            print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    optimizer = ImageOptimizer("./src/images", "./public/images")

    for image_file in optimizer.input_dir.glob("*.{jpg,jpeg,png}"):
        optimizer.optimize_image(image_file)
```

## Features Demonstrated

- ✅ **Syntax highlighting** with different themes for light/dark mode
- ✅ **Copy buttons** that appear on hover (try copying any code block above)
- ✅ **Language detection** and labeling
- ✅ **File path indicators** showing the source file
- ✅ **Line number support** (when enabled with `data-line-numbers` attribute)
- ✅ **Responsive design** that adapts to mobile screens
- ✅ **Accessibility features** including keyboard navigation and screen reader support
- ✅ **Shell prompt indicators** for command line examples
- ✅ **Custom scrollbars** for better visual integration

The enhanced code blocks provide a professional, GitHub-like experience while maintaining accessibility and performance.
