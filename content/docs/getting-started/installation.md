---
title: "Installation & Setup"
category: "Getting Started"
description: "Step-by-step guide to install and configure the Digital Brain Template"
lastUpdated: "2025-01-15"
tags: ["installation", "setup", "configuration"]
---

# Installation & Setup

This guide will walk you through setting up the Digital Brain Template on your local machine and deploying it to production.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/digital-brain-template.git
cd digital-brain-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:4321`

## Configuration

### Site Configuration

Edit the `astro.config.mjs` file to customize your site settings:

```javascript
export const siteConfig = {
  title: "My Digital Brain",
  author: "Your Name",
  email: "your.email@domain.com",
  description: "Personal knowledge base and documentation",
  url: "https://yourdomain.com",
  social: {
    twitter: "@username",
    github: "username",
    linkedin: "username",
  },
};
```

### Environment Variables

Create a `.env` file in the root directory for any environment-specific settings:

```bash
# .env
SITE_URL=https://yourdomain.com
CONTACT_EMAIL=your.email@domain.com
```

## Project Structure

Here's an overview of the project structure:

```
digital-brain-template/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── content/
│   └── docs/             # Documentation content
├── astro.config.mjs      # Astro configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Adding Content

### Creating New Pages

1. Create a new `.md` file in the appropriate category folder under `content/docs/`
2. Add the required frontmatter:

```yaml
---
title: "Your Page Title"
category: "Category Name"
description: "Page description for SEO"
lastUpdated: "2025-01-15"
tags: ["tag1", "tag2"]
---
```

3. Write your content using Markdown or MDX

### Creating New Categories

Simply create a new folder under `content/docs/` and add markdown files with the appropriate `category` in the frontmatter.

## Building for Production

### Build the Site

```bash
npm run build
```

This creates a `dist/` folder with your static site.

### Preview Production Build

```bash
npm run preview
```

## Deployment

The Digital Brain Template generates static files that can be deployed to any static hosting service:

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel

1. Import your repository to Vercel
2. Vercel will automatically detect Astro and configure the build

### GitHub Pages

1. Enable GitHub Pages in your repository settings
2. Use GitHub Actions for automatic deployment

### Other Hosts

The `dist/` folder can be uploaded to any web server or CDN.

## Search Setup

The template includes Pagefind for search functionality. After building your site, run:

```bash
npx pagefind --site dist
```

This generates the search index. For automatic search index generation, it's included in the build process.

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**

- Run `npm run check` to see detailed errors
- Ensure all frontmatter matches the schema in `src/content/config.ts`

**Search not working:**

- Ensure Pagefind index is generated after build
- Check that search files are included in deployment

**Styles not loading:**

- Verify CSS imports in layout files
- Check for CSS syntax errors

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/your-username/digital-brain-template/issues)
2. Review the [documentation](/docs/guides/writing-content)
3. Contact support at your.email@domain.com

## Next Steps

Now that you have the template installed:

- Learn about [writing content](/docs/guides/writing-content)
- Explore [customization options](/docs/guides/customization)
- Check out the [component reference](/docs/reference/components)
