---
title: "Hosting & Deployment"
description: "Choose the right hosting platform and set up automated deployment for your digital garden"
---

# Hosting & Deployment

Get your digital garden online with modern hosting platforms and automated deployment. Here's how to choose and set up the best solution for your needs.

## Popular Hosting Platforms

### Netlify (Recommended)
**Best for**: Beginners and advanced users alike
**Pricing**: Free tier with 100GB bandwidth

```bash path=null start=null
# Deploy with Netlify CLI
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

**netlify.toml configuration:**
```toml path=null start=null
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### Vercel
**Best for**: Next.js and React projects
**Pricing**: Free tier with 100GB bandwidth

```json path=null start=null
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### GitHub Pages
**Best for**: Open source projects and portfolios
**Pricing**: Free for public repositories

```yaml path=null start=null
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v4
```

### Cloudflare Pages
**Best for**: Global performance and edge functions
**Pricing**: Generous free tier

**_redirects file:**
```text path=null start=null
# Redirect old URLs
/old-path/* /new-path/:splat 301

# SPA fallback
/* /index.html 200
```

## Automated Deployment Setup

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml path=null start=null
name: Build and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Check accessibility
        run: npm run test:a11y

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install and build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to Netlify
        uses: netlify/actions/deploy@master
        with:
          publish-dir: ./dist
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Custom Domains

### DNS Configuration

Set up your custom domain with DNS records:

```text path=null start=null
# DNS records for example.com

# Root domain
@    A     192.0.2.1
@    AAAA  2001:db8::1

# WWW subdomain
www  CNAME example.com

# Subdomain for staging
staging CNAME brave-panda-123456.netlify.app
```

### SSL/TLS Setup

Most hosting platforms provide automatic SSL certificates:

```html path=null start=null
<!-- Force HTTPS in HTML -->
<script>
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
  }
</script>
```

## Performance Optimization

### Build Optimization

```javascript path=null start=null
// astro.config.mjs
export default {
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
};
```

### Image Optimization

```bash path=null start=null
# Install sharp for image processing
npm install sharp

# Create optimization script
node scripts/optimize-images.js
```

```javascript path=null start=null
// scripts/optimize-images.js
import sharp from 'sharp';
import { glob } from 'glob';

const images = await glob('src/images/**/*.{jpg,jpeg,png}');

for (const image of images) {
  const output = image.replace('src/images', 'public/images').replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  await sharp(image)
    .webp({ quality: 80 })
    .toFile(output);
  
  console.log(`Optimized: ${image} → ${output}`);
}
```

## Environment Variables

### Managing Secrets

```bash path=null start=null
# Local development (.env)
API_KEY=your-development-key
SITE_URL=http://localhost:3000

# Production (set in hosting platform)
API_KEY=your-production-key
SITE_URL=https://yourdomain.com
```

```javascript path=null start=null
// Using environment variables in Astro
const { API_KEY, SITE_URL } = import.meta.env;

// Make sure to define in astro.config.mjs
export default {
  site: SITE_URL,
  // ...
};
```

## Monitoring and Analytics

### Simple Analytics Setup

```html path=null start=null
<!-- Privacy-focused analytics -->
<script>
  // Simple page view tracking
  function trackPageView() {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        url: location.pathname,
        referrer: document.referrer,
        timestamp: Date.now()
      }));
    }
  }

  // Track on page load
  trackPageView();
</script>
```

### Performance Monitoring

```javascript path=null start=null
// Core Web Vitals tracking
function sendToAnalytics({name, value, id}) {
  console.log(`${name}: ${value} (${id})`);
  
  // Send to your analytics service
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', JSON.stringify({
      name, value, id, url: location.href
    }));
  }
}

// Largest Contentful Paint
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  sendToAnalytics({
    name: 'LCP',
    value: lastEntry.startTime,
    id: lastEntry.id
  });
}).observe({entryTypes: ['largest-contentful-paint']});

// First Input Delay  
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    sendToAnalytics({
      name: 'FID',
      value: entry.processingStart - entry.startTime,
      id: entry.name
    });
  }
}).observe({entryTypes: ['first-input']});
```

## Backup Strategy

### Automated Backups

```yaml path=null start=null
# .github/workflows/backup.yml
name: Backup Content
on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create backup
        run: |
          tar -czf backup-$(date +%Y%m%d).tar.gz src/ public/ package.json
      
      - name: Upload to storage
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp backup-$(date +%Y%m%d).tar.gz s3://your-backup-bucket/
```

## Deployment Checklist

Before going live:

- [ ] Test build process locally
- [ ] Verify all links work
- [ ] Check mobile responsiveness  
- [ ] Test accessibility with screen readers
- [ ] Validate HTML and CSS
- [ ] Test loading performance (aim for <3s)
- [ ] Set up monitoring and analytics
- [ ] Configure custom domain and SSL
- [ ] Test 404 and error pages
- [ ] Set up automated backups

## Hosting Comparison

| Platform | Free Tier | Custom Domain | SSL | Build Minutes | Bandwidth |
|----------|-----------|---------------|-----|---------------|-----------|
| **Netlify** | ✅ | ✅ | ✅ | 300/month | 100GB |
| **Vercel** | ✅ | ✅ | ✅ | 6000/month | 100GB |
| **GitHub Pages** | ✅ | ✅ | ✅ | Unlimited | 100GB |
| **Cloudflare Pages** | ✅ | ✅ | ✅ | 500/month | Unlimited |

Choose based on your needs: Netlify for simplicity, Vercel for Next.js projects, GitHub Pages for open source, or Cloudflare Pages for global performance.

Your digital garden should be fast, secure, and always available. Start with a free platform and upgrade as your garden grows!