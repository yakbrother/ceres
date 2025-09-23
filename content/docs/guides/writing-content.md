---
title: "Writing Content"
category: "Guides"
description: "Learn how to write and structure content for your Digital Brain"
lastUpdated: "2025-01-15"
tags: ["content", "markdown", "mdx", "writing"]
---

# Writing Content

This guide covers everything you need to know about creating and structuring content for your Digital Brain template.

## Content Format

The Digital Brain template uses **MDX** (Markdown with JSX) for content, which allows you to:

- Write in familiar Markdown syntax
- Include interactive components
- Use custom styling and layouts
- Embed rich media and widgets

## Frontmatter Schema

Every content file must include frontmatter with the following fields:

```yaml
---
title: "Your Page Title" # Required: Page title
category: "Category Name" # Required: Category for navigation
description: "Page description" # Required: SEO description
lastUpdated: "2025-01-15" # Required: Last update date
tags: ["tag1", "tag2"] # Optional: Array of tags
draft: false # Optional: Hide from production
---
```

## Markdown Basics

### Headings

Use headings to structure your content. H2 and H3 headings automatically appear in the table of contents:

```markdown
# Page Title (H1 - use only once)

## Main Section (H2 - appears in TOC)

### Subsection (H3 - appears in TOC)

#### Details (H4 - doesn't appear in TOC)
```

### Text Formatting

```markdown
**Bold text**
_Italic text_
`Inline code`
~~Strikethrough~~
```

### Links

```markdown
[Internal link](/docs/guides/customization)
[External link](https://example.com)
[Link with title](https://example.com "Link title")
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item
  - Another nested item

1. Ordered list item
2. Another item
   1. Nested numbered item
   2. Another nested item
```

### Code Blocks

Use fenced code blocks with syntax highlighting:

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

```css
.example {
  color: var(--color-accent);
  font-weight: 600;
}
```
````

### Tables

```markdown
| Feature | Description          | Status      |
| ------- | -------------------- | ----------- |
| Search  | Pagefind integration | ✅ Complete |
| Themes  | Dark/light mode      | ✅ Complete |
| Mobile  | Responsive design    | ✅ Complete |
```

### Blockquotes

```markdown
> This is a blockquote. Use it for important notes,
> quotes, or highlighted information.
```

### Images

```markdown
![Alt text](./image.jpg "Optional title")
![Remote image](https://example.com/image.jpg)
```

## Advanced Features

### Custom Components

The template includes several custom MDX components:

#### Asides

Use asides for special content blocks:

```mdx
<Aside type="note">This is a note aside for general information.</Aside>

<Aside type="tip">This is a tip aside for helpful suggestions.</Aside>

<Aside type="warning">This is a warning aside for important cautions.</Aside>

<Aside type="definition">
  This is a definition aside for explaining terms.
</Aside>
```

#### External Links

Highlight external links with special styling:

```mdx
<ExternalLink href="https://example.com">
  Visit our external resource
</ExternalLink>
```

### Embedding Media

#### Videos

```markdown
<video controls>
  <source src="/videos/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

#### Interactive Elements

Since we're using MDX, you can embed interactive components:

```mdx
<details>
  <summary>Click to expand</summary>
  This content is hidden by default and can be expanded by clicking the summary.
</details>
```

## Content Organization

### File Structure

Organize your content logically:

```
content/docs/
├── getting-started/     # Beginner content
│   ├── introduction.md
│   └── installation.md
├── guides/             # How-to guides
│   ├── writing-content.md
│   └── customization.md
├── reference/          # Technical reference
│   ├── api.md
│   └── components.md
└── tutorials/          # Step-by-step tutorials
    ├── basic-setup.md
    └── advanced-config.md
```

### Naming Conventions

- Use lowercase filenames with hyphens: `writing-content.md`
- Make filenames descriptive and SEO-friendly
- Keep URLs short but meaningful

### Categories

Categories are used for:

- Sidebar navigation grouping
- Breadcrumb navigation
- Content organization

Choose clear, consistent category names:

- "Getting Started" - for onboarding content
- "Guides" - for how-to content
- "Reference" - for technical documentation
- "Tutorials" - for step-by-step instructions

## SEO Best Practices

### Meta Information

Always include:

- Descriptive titles (50-60 characters)
- Compelling descriptions (150-160 characters)
- Relevant tags for content discovery

### Content Structure

- Use one H1 per page (the title)
- Create a logical heading hierarchy
- Include internal links to related content
- Write descriptive link text

### Images

- Always include alt text
- Use descriptive filenames
- Optimize image sizes for web

## Writing Tips

### Voice and Tone

- Write in a clear, conversational tone
- Use active voice when possible
- Be concise but thorough
- Consider your audience's expertise level

### Content Structure

- Start with an overview or introduction
- Use headings to break up long sections
- Include examples and code samples
- End with next steps or related links

### Accessibility

- Use descriptive link text
- Provide alt text for images
- Ensure good color contrast
- Structure content logically with headings

## Publishing Workflow

### Draft Content

Mark content as draft to hide it from production:

```yaml
---
title: "Work in Progress"
category: "Guides"
description: "This content is still being written"
lastUpdated: "2025-01-15"
draft: true
---
```

### Review Process

1. Write content in draft mode
2. Review for accuracy and clarity
3. Check links and formatting
4. Remove `draft: true` to publish
5. Update `lastUpdated` date

### Maintenance

- Regularly review and update content
- Check for broken links
- Update screenshots and examples
- Refresh outdated information

## Next Steps

- Learn about [customization options](/docs/guides/customization)
- Explore the [component reference](/docs/reference/components)
- Check out [configuration settings](/docs/reference/configuration)
