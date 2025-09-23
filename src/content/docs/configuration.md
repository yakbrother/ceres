---
title: "Configuration Guide"
category: "Setup"
description: "Learn how to configure and customize the Digital Brain Template"
lastUpdated: "2024-01-15"
tags: ["configuration", "customization"]
---

# Configuration Guide

This guide covers how to configure and customize your Digital Brain Template.

## Site Configuration

The main site configuration is located in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://your-domain.com",
  integrations: [mdx(), sitemap(), pagefind()],
});
```

## Content Configuration

Content types are defined in `src/content/config.ts`:

```typescript
const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    lastUpdated: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});
```

## Theme Customization

### Colors

Customize colors in `src/styles/global.css`:

```css
:root {
  --color-accent: #ff6b35;
  --color-text-primary: #1a1a1a;
  --color-bg-primary: #ffffff;
}
```

### Typography

The template uses fluid typography with CSS `clamp()` functions:

```css
:root {
  --step--2: clamp(0.69rem, 0.66rem + 0.18vw, 0.8rem);
  --step--1: clamp(0.83rem, 0.78rem + 0.29vw, 1rem);
  --step-0: clamp(1rem, 0.91rem + 0.43vw, 1.25rem);
}
```

## Navigation

The sidebar navigation is automatically generated from your content structure. Organize your content using the `category` frontmatter field.

## Search Configuration

Pagefind search is automatically configured. To customize search behavior, modify the search component in `src/components/SearchBar.astro`.
