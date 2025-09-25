# Link Accessibility Guide

This guide explains how to create accessible links in your documentation. Accessible links help all users, especially those using screen readers or keyboard navigation, understand link purposes and destinations.

## Basic Link Principles

### 1. Use Descriptive Link Text

**Good Examples:**
```html
<a href="/docs/getting-started">Getting Started Guide</a>
<a href="/contact">Contact Support</a>
<a href="https://example.com">Visit Example Company Website</a>
```

**Poor Examples:**
```html
<a href="/docs/getting-started">Click here</a>
<a href="/contact">More info</a>
<a href="https://example.com">Read more</a>
```

### 2. Avoid Vague Link Text

Instead of generic terms, use specific descriptions:
- ❌ "Click here" → ✅ "Download the user manual"
- ❌ "Read more" → ✅ "Learn about accessibility testing"
- ❌ "More info" → ✅ "Contact our support team"

## External Links

External links are automatically enhanced with:
- Visual indicator (↗)
- `target="_blank"` to open in new tab
- `rel="noopener noreferrer"` for security
- ARIA labels indicating new tab behavior

### Manual External Link Setup

For manual control, use this pattern:
```html
<a href="https://external-site.com" 
   target="_blank" 
   rel="noopener noreferrer"
   aria-label="Visit External Site (opens in new tab)">
  External Site
</a>
```

## File Download Links

File links automatically show file type indicators:

```html
<!-- These automatically show file type -->
<a href="/manual.pdf">User Manual</a> <!-- Shows "(PDF)" -->
<a href="/data.xlsx">Quarterly Report</a> <!-- Shows "(Excel spreadsheet)" -->
<a href="/presentation.pptx">Company Overview</a> <!-- Shows "(PowerPoint presentation)" -->
```

## Email and Phone Links

Use semantic link types for contact information:

```html
<!-- Email links -->
<a href="mailto:support@example.com">Email Support</a>

<!-- Phone links -->
<a href="tel:+1234567890">Call: (123) 456-7890</a>
```

## Navigation Links

### Skip Links
Skip links help keyboard users navigate efficiently:

```html
<!-- These are automatically included in the template -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#sidebar" class="skip-link">Skip to navigation</a>
```

### Breadcrumb Navigation
Use proper ARIA labeling for breadcrumbs:

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Documentation</a></li>
    <li aria-current="page">Current Page</li>
  </ol>
</nav>
```

## Complex Link Patterns

### Links with Additional Context

Use `aria-describedby` for complex links:

```html
<a href="/advanced-guide" aria-describedby="guide-description">
  Advanced User Guide
</a>
<div id="guide-description" class="sr-only">
  Comprehensive guide covering advanced features and customization options
</div>
```

### Card-based Links

For clickable cards, use proper structure:

```html
<article class="card">
  <h3>
    <a href="/feature-guide">Complete Feature Guide</a>
  </h3>
  <p>Learn about all available features in this comprehensive guide.</p>
  <a href="/feature-guide" aria-label="Read the complete feature guide">
    Read Guide
  </a>
</article>
```

### Image Links

Ensure image links have proper alt text:

```html
<!-- Good: descriptive alt text -->
<a href="/gallery">
  <img src="gallery-thumb.jpg" alt="View photo gallery">
</a>

<!-- Alternative: separate text and image -->
<a href="/gallery">
  <img src="gallery-thumb.jpg" alt="" role="presentation">
  View Photo Gallery
</a>
```

## ARIA Enhancements

### aria-current

Use `aria-current` for current page/section:

```html
<nav>
  <a href="/docs" aria-current="page">Documentation</a>
  <a href="/guides">Guides</a>
  <a href="/api">API Reference</a>
</nav>
```

### aria-expanded

For collapsible navigation:

```html
<button aria-expanded="false" aria-controls="submenu">
  Categories
</button>
<ul id="submenu">
  <!-- submenu items -->
</ul>
```

## Testing Your Links

### Keyboard Testing
1. Use only Tab key to navigate through links
2. Ensure all links are reachable and usable
3. Check that focus indicators are visible
4. Test Enter key activates links

### Screen Reader Testing
1. Use screen reader to navigate by links (NVDA: K key)
2. Ensure link purposes are clear from text alone
3. Check that external link indicators are announced
4. Verify file type information is communicated

### Automated Testing
The template includes automatic enhancements, but you should also:
1. Validate HTML for proper link structure
2. Check for empty links or missing href attributes
3. Ensure all links have meaningful text content

## Common Mistakes

### 1. Same Link Text for Different Destinations
```html
<!-- Bad: ambiguous link text -->
<a href="/user-guide">Read more</a>
<a href="/api-docs">Read more</a>

<!-- Good: specific link text -->
<a href="/user-guide">Read the user guide</a>
<a href="/api-docs">View API documentation</a>
```

### 2. Missing Link Context
```html
<!-- Bad: unclear without surrounding text -->
<p>Our API is powerful. <a href="/api">Here</a> you can find details.</p>

<!-- Good: self-contained link text -->
<p>Our API is powerful. <a href="/api">View API documentation</a> for details.</p>
```

### 3. Links Opening Unexpectedly
```html
<!-- Bad: no indication it opens new window -->
<a href="https://example.com" target="_blank">External Site</a>

<!-- Good: clear indication (done automatically) -->
<a href="https://example.com" target="_blank" aria-label="External Site (opens in new tab)">
  External Site ↗
</a>
```

## Accessibility Checklist

- [ ] All links have descriptive text
- [ ] No "click here" or "read more" without context
- [ ] External links indicate new tab behavior
- [ ] File download links show file type
- [ ] Email and phone links use proper protocols
- [ ] Navigation includes skip links
- [ ] Current page/section marked with aria-current
- [ ] Complex links have additional ARIA descriptions
- [ ] All links keyboard accessible
- [ ] Focus indicators visible and clear
- [ ] Link purposes understandable out of context

Remember: Good link text benefits everyone, not just screen reader users. Clear, descriptive links improve usability for all users.