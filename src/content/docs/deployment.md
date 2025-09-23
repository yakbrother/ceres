---
title: "Deployment Guide"
category: "Advanced"
description: "Learn how to deploy your Digital Brain Template to various hosting platforms"
lastUpdated: "2024-01-15"
tags: ["deployment", "hosting", "production"]
---

# Deployment Guide

Deploy your Digital Brain Template to production with these platform-specific guides.

## Build Process

Before deploying, build your site for production:

```bash
npm run build
```

This creates a `dist/` directory with your static site files.

## Netlify

1. Connect your Git repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Netlify Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Vercel

1. Import your project from Git
2. Vercel automatically detects Astro projects
3. Deploy with default settings

### Vercel Configuration

Create a `vercel.json` file if needed:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## GitHub Pages

1. Enable GitHub Pages in repository settings
2. Use GitHub Actions for automated deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v1
```

## Custom Server

For custom server deployment:

1. Build the site: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your web server to serve static files
4. Set up proper redirects for client-side routing

### Apache Configuration

Create a `.htaccess` file in your `dist/` directory:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx Configuration

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Environment Variables

For production deployments, set these environment variables:

- `SITE_URL`: Your production domain
- `NODE_ENV`: Set to `production`

## Performance Optimization

The template includes several performance optimizations:

- **Static site generation** for fast loading
- **Automatic image optimization** with Astro
- **CSS and JS minification** in production builds
- **Pagefind search** for client-side search without server load

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test search functionality
- [ ] Check responsive design on mobile devices
- [ ] Validate HTML and accessibility
- [ ] Test dark/light theme switching
- [ ] Verify sitemap generation
- [ ] Check that 404 page works correctly
