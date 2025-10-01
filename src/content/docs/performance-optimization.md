---
category: "Docs"
lastUpdated: "2023-11-20"
title: "Performance Optimization"
description: "Optimize your digital garden for speed with image optimization, Core Web Vitals, and modern performance techniques"
---

# Performance Optimization

Fast websites provide better user experiences and rank higher in search results. Here's how to optimize your digital garden for speed without sacrificing functionality.

## Core Web Vitals

Google's Core Web Vitals measure user experience through three key metrics:

### Largest Contentful Paint (LCP) - Loading
**Target**: Under 2.5 seconds

```html path=null start=null
<!-- Optimize LCP by preloading critical resources -->
<link rel="preload" href="/fonts/inter-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-image.webp" as="image">

<!-- Priority hints for images -->
<img src="hero.webp" alt="Hero image" fetchpriority="high">
<img src="secondary.webp" alt="Secondary" fetchpriority="low">
```

```css path=null start=null
/* Optimize critical rendering path */
/* Inline critical CSS, load non-critical CSS asynchronously */
.above-fold {
  /* Critical styles here */
  font-family: system-ui, sans-serif;
  color: #333;
}

/* Non-critical CSS loaded separately */
.below-fold {
  /* Load this later */
}
```

### First Input Delay (FID) - Interactivity  
**Target**: Under 100 milliseconds

```javascript path=null start=null
// Optimize JavaScript execution
// Break up long tasks
function processLargeDataset(data) {
  const batchSize = 100;
  let index = 0;
  
  function processBatch() {
    const endIndex = Math.min(index + batchSize, data.length);
    
    // Process batch
    for (let i = index; i < endIndex; i++) {
      processItem(data[i]);
    }
    
    index = endIndex;
    
    if (index < data.length) {
      // Yield to main thread
      setTimeout(processBatch, 0);
    }
  }
  
  processBatch();
}

// Use requestIdleCallback for non-critical tasks
function doNonCriticalWork() {
  requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
      const task = tasks.shift();
      task();
    }
  });
}
```

### Cumulative Layout Shift (CLS) - Visual Stability
**Target**: Under 0.1

```css path=null start=null
/* Prevent layout shifts with size reservations */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9; /* Prevent shift when loading */
}

/* Skeleton loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Reserve space for dynamic content */
.dynamic-content {
  min-height: 200px; /* Prevents layout shift */
}
```

## Image Optimization

Images often account for 50%+ of page weight. Optimize aggressively:

### Modern Image Formats

```html path=null start=null
<!-- Use WebP with JPEG fallback -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Responsive images with srcset -->
<img 
  src="image-800w.webp"
  srcset="
    image-400w.webp 400w,
    image-800w.webp 800w,
    image-1200w.webp 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Responsive image"
  loading="lazy"
>
```

### Automatic Image Optimization

```javascript path=null start=null
// Image optimization script using Sharp
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';

async function optimizeImages() {
  const images = await glob('src/images/**/*.{jpg,jpeg,png}');
  
  for (const imagePath of images) {
    const { name, dir } = path.parse(imagePath);
    const outputDir = dir.replace('src/images', 'public/images');
    
    // Generate multiple formats and sizes
    const sizes = [400, 800, 1200];
    const formats = ['webp', 'avif', 'jpeg'];
    
    for (const size of sizes) {
      for (const format of formats) {
        const output = `${outputDir}/${name}-${size}w.${format}`;
        
        await sharp(imagePath)
          .resize(size, null, { withoutEnlargement: true })
          .toFormat(format, {
            quality: format === 'jpeg' ? 80 : undefined,
            effort: format === 'avif' ? 9 : undefined
          })
          .toFile(output);
      }
    }
    
    console.log(`Optimized: ${imagePath}`);
  }
}

optimizeImages().catch(console.error);
```

### Lazy Loading Implementation

```javascript path=null start=null
// Intersection Observer for lazy loading
class LazyImageLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '50px 0px' }
    );
    
    this.init();
  }
  
  init() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.imageObserver.observe(img));
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.imageObserver.unobserve(img);
      }
    });
  }
  
  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.remove('lazy');
    
    img.onload = () => {
      img.classList.add('loaded');
    };
  }
}

new LazyImageLoader();
```

## Build Optimization

### Bundle Analysis and Code Splitting

```javascript path=null start=null
// astro.config.mjs
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor code
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns'],
          
          // Split by route
          home: ['./src/pages/index.astro'],
          blog: ['./src/pages/blog/[...slug].astro']
        }
      }
    }
  },
  
  vite: {
    build: {
      // Generate source maps for production debugging
      sourcemap: true,
      
      // Optimize CSS
      cssCodeSplit: true,
      
      // Set chunk size warning limit
      chunkSizeWarningLimit: 1000
    }
  }
};
```

### CSS Optimization

```css path=null start=null
/* Critical CSS - inline in <head> */
:root {
  --color-text: #333;
  --color-bg: #fff;
  --font-system: system-ui, sans-serif;
}

body {
  font-family: var(--font-system);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

/* Above-the-fold styles */
.header, .hero {
  /* Critical layout styles */
}
```

```html path=null start=null
<!-- Load non-critical CSS asynchronously -->
<link rel="preload" href="/styles/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/non-critical.css"></noscript>
```

## Caching Strategies

### Service Worker for Caching

```javascript path=null start=null
// sw.js - Service Worker
const CACHE_NAME = 'digital-garden-v2';
const STATIC_CACHE = [
  '/',
  '/styles/critical.css',
  '/scripts/main.js',
  '/fonts/inter-regular.woff2'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) return response;
          
          return fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
              return response;
            });
        })
    );
  }
});
```

### HTTP Caching Headers

```javascript path=null start=null
// netlify.toml
[build]
  publish = "dist"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "public, max-age=300"
```

## Performance Monitoring

### Real User Monitoring (RUM)

```javascript path=null start=null
// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }
  
  init() {
    // Core Web Vitals
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    
    // Custom metrics
    this.measureTTI();
    this.measureResourceTiming();
  }
  
  observeLCP() {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.metrics.lcp = lastEntry.startTime;
      this.sendMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }
  
  observeFID() {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        this.metrics.fid = fid;
        this.sendMetric('FID', fid);
      }
    }).observe({ entryTypes: ['first-input'] });
  }
  
  observeCLS() {
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      this.metrics.cls = clsValue;
      this.sendMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  sendMetric(name, value) {
    // Send to analytics service
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', JSON.stringify({
        metric: name,
        value,
        url: location.href,
        timestamp: Date.now()
      }));
    }
  }
}

// Initialize monitoring
new PerformanceMonitor();
```

### Performance Budget

```json path=null start=null
{
  "budget": {
    "total": "500kb",
    "javascript": "150kb", 
    "css": "50kb",
    "images": "300kb",
    "fonts": "100kb"
  },
  "thresholds": {
    "lcp": 2500,
    "fid": 100,
    "cls": 0.1,
    "ttfb": 800
  }
}
```

## Quick Performance Wins

### 1. Enable Compression
```bash path=null start=null
# Enable gzip/brotli compression
# Most hosting platforms enable this automatically
# For custom servers:
gzip_on;
gzip_types text/css application/javascript image/svg+xml;
```

### 2. Optimize Fonts
```css path=null start=null
@font-face {
  font-family: 'WebFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Prevent invisible text during font load */
}
```

### 3. Minimize JavaScript
```javascript path=null start=null
// Use modern JavaScript features for smaller bundles
const data = await fetch('/api/data').then(r => r.json());

// Tree shake unused code
import { debounce } from 'lodash/debounce'; // ✅ Import only what you need
// import _ from 'lodash'; // ❌ Imports entire library
```

### 4. Preload Critical Resources
```html path=null start=null
<head>
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Prefetch likely next pages -->
  <link rel="prefetch" href="/about">
  
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
</head>
```

## Performance Checklist

- [ ] Images are optimized and use modern formats (WebP/AVIF)
- [ ] Lazy loading implemented for below-fold images
- [ ] Critical CSS inlined, non-critical CSS loaded asynchronously
- [ ] JavaScript is minified and code-split
- [ ] Fonts use `font-display: swap`
- [ ] HTTP/2 server push or preload for critical resources
- [ ] Service worker caches static assets
- [ ] Core Web Vitals meet target thresholds
- [ ] Performance monitoring in place

## Tools for Testing

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: Detailed performance analysis
- **PageSpeed Insights**: Google's performance tool
- **GTmetrix**: Performance monitoring service
- **Chrome DevTools**: Network and Performance tabs

Remember: Performance is a feature, not an afterthought. Fast sites create better user experiences, improve accessibility, and rank higher in search results. Start with the biggest impact optimizations first, then iterate based on real user data.