# Digital Brain Template - Project Specification

## Project Overview
A modern, accessible documentation template built with Astro 5.13 for creating digital brain/knowledge base websites with fluid design principles and comprehensive navigation.

## Core Requirements

### Framework & Standards
- **Astro Version**: 5.13 (latest standards and conventions)
- **Content Format**: MDX for enhanced markdown capabilities
- **Build**: Static site generation optimized for performance

### Design Principles
- **CSS Techniques**: Implement patterns from [Smashing Magazine CSS Tips](https://www.smashingmagazine.com/2024/06/css-tips-and-techniques/)
- **Fluid Typography**: Utopia.fyi methodology for responsive scaling
- **Modern Layouts**: CSS Grid techniques from:
  - [Sustainable Dev Layouts](https://the-sustainable.dev/modern-layouts-with-a-couple-of-lines-of-css/)
  - [Smashing Magazine Modern CSS](https://www.smashingmagazine.com/2024/05/modern-css-layouts-no-framework-needed/)
- **Accessibility**: WCAG 2.1 AA compliance minimum
- **Color Scheme**: Orange accent color for links/buttons, subtle mesh gradients

## Content Structure

### File Organization
```
/content/
├── category-1/
│   ├── page-1.md
│   ├── page-2.md
│   └── ...
├── category-2/
│   ├── page-1.md
│   └── ...
└── about.md
```

### Frontmatter Schema
```yaml
---
title: "Page Title"
category: "Category Name"
description: "Page description for SEO"
lastUpdated: "2025-01-15"
tags: ["tag1", "tag2"]
---
```

## Layout & Navigation

### Design Reference
- **Base Design**: [Astro Mintlify Template](https://astro-mintlify.vercel.app/getting-started/introduction)
- **Layout**: Three-column responsive design

### Navigation Structure
1. **Header**: Site title, theme toggle, search, hamburger menu (mobile)
2. **Left Sidebar**: 
   - Auto-generated from markdown files
   - Accordion-style category grouping
   - Pulls from left on mobile (hamburger trigger)
   - Categories from frontmatter
   - No manual ordering required
3. **Main Content**: Article content with fluid typography
4. **Right Sidebar**: 
   - Auto-generated TOC from H2 headers
   - Smooth scrolling links
   - Collapses to dropdown on mobile

## Typography

### Font Stack
**Primary**: "Space Grotesk Variable"
**Fallback**: `ui-sans-serif, system-ui, -apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`

### Implementation
- Variable font loading optimization
- Fluid scaling using Utopia.fyi principles
- Consistent vertical rhythm
- High contrast ratios for accessibility

## Components & Features

### MDX Components
- **Asides**: Manual insertion for tips, jokes, definitions, external links
- **Style Reference**: [Mintlify Asides](https://astro-mintlify.vercel.app/components/asides)
- **Types**: Note, Tip, Warning, Definition, External Link

### Search Functionality
- **Engine**: Pagefind integration
- **Features**: Static index generation, offline support, zero runtime dependencies
- **UI**: Search bar in header with results overlay

### Icons
- **Library**: Font Awesome
- **Usage**: Navigation, buttons, asides, external links

## Theme System

### Color Scheme
- **Accent**: Orange (#ff6b35 or similar)
- **Backgrounds**: Subtle mesh gradients
- **Modes**: Light and dark theme support
- **Contrast**: High contrast ratios for accessibility

### CSS Architecture
- **Custom Properties**: Extensive use of CSS variables
- **Structure**: Mobile-first responsive design
- **Layout**: Modern CSS Grid and Flexbox
- **Modularity**: Component-based CSS organization

## Configuration

### Site Variables (Configurable)
```javascript
// astro.config.mjs or site config
export const siteConfig = {
  title: "My Digital Brain",
  author: "Your Name",
  email: "your.email@domain.com",
  description: "Personal knowledge base and documentation",
  url: "https://yourdomain.com",
  social: {
    twitter: "@username",
    github: "username",
    linkedin: "username"
  }
}
```

### Pages
- **Homepage**: Overview/landing page
- **About**: Configurable about page
- **Category Pages**: Auto-generated category indexes
- **Individual Articles**: From markdown files
- **Search Results**: Pagefind results page

## Technical Requirements

### Performance
- **Core Web Vitals**: Optimized for excellent scores
- **Assets**: Optimized images, fonts, and CSS
- **Build**: Fast static generation

### Accessibility
- **Standards**: WCAG 2.1 AA minimum
- **Navigation**: Keyboard navigation support
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color**: High contrast ratios, color-blind friendly

### SEO
- **Meta Tags**: Dynamic meta generation from frontmatter
- **Structured Data**: JSON-LD for articles
- **Sitemap**: Auto-generated XML sitemap
- **RSS**: Optional RSS feed generation

## Development Features

### Content Management
- **Hot Reload**: Development server with live updates
- **Validation**: Frontmatter schema validation
- **Timestamps**: Automatic "last updated" tracking
- **Preview**: Draft content support

### Build Process
- **Optimization**: Asset optimization and minification
- **Search Index**: Pagefind index generation
- **Deployment**: Static files ready for any host

## Success Criteria

1. **Performance**: Lighthouse scores 90+ across all metrics
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Responsive**: Seamless experience across all device sizes
4. **Maintainable**: Easy to customize and extend
5. **User Experience**: Intuitive navigation and search functionality

## Future Considerations

### Potential Enhancements
- Tag-based filtering and organization
- Reading time estimates
- Social sharing buttons
- Comment system integration
- Analytics integration
- PWA capabilities

---

**Note**: This specification serves as a comprehensive guide for development. All requirements should be implemented following modern web standards and best practices for performance, accessibility, and user experience.
