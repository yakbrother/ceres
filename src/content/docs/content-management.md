---
title: "Content Management"
category: "Setup"
description: "Learn how to create and organize content in the Digital Brain Template"
lastUpdated: "2024-01-15"
tags: ["content", "markdown", "organization"]
---

# Content Management

Learn how to create, organize, and manage content in your Digital Brain Template.

## Content Structure

All content files are stored in `src/content/docs/` and use Markdown with frontmatter:

```markdown
---
title: "Your Page Title"
category: "Category Name"
description: "Brief description of the page"
lastUpdated: "2024-01-15"
tags: ["tag1", "tag2"]
draft: false
---

# Your Content Here

Write your content using standard Markdown syntax.
```

## Frontmatter Fields

### Required Fields

- `title`: The page title displayed in navigation and headers
- `category`: Used to group pages in the sidebar navigation
- `description`: Brief description for SEO and page metadata
- `lastUpdated`: Date when the content was last updated

### Optional Fields

- `tags`: Array of tags for categorization and filtering
- `draft`: Set to `true` to exclude from production builds

## Categories

Categories automatically create sections in the sidebar navigation. Pages are grouped by category and sorted alphabetically within each group.

Common category examples:

- "Introduction"
- "Setup"
- "Guides"
- "Reference"
- "Advanced"

## Markdown Features

The template supports all standard Markdown features plus:

### Code Blocks

```javascript
function example() {
  console.log("Syntax highlighting included!");
}
```

### Tables

| Feature | Supported |
| ------- | --------- |
| Tables  | ✅        |
| Lists   | ✅        |
| Links   | ✅        |

### Callouts

> **Note**: This is an important note that readers should pay attention to.

## File Organization

Organize your files logically:

```
src/content/docs/
├── getting-started.md
├── configuration.md
├── advanced/
│   ├── custom-components.md
│   └── deployment.md
└── reference/
    ├── api.md
    └── troubleshooting.md
```

## Best Practices

1. **Use descriptive filenames** that match your page titles
2. **Keep categories consistent** across related content
3. **Update lastUpdated dates** when making significant changes
4. **Use tags sparingly** - focus on the most important keywords
5. **Write clear descriptions** for better SEO and user experience
