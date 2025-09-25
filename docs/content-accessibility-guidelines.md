# Content Accessibility Guidelines

This guide provides comprehensive guidelines for creating accessible content using the Digital Brain template. Following these guidelines ensures your content is usable by everyone, including people with disabilities.

## Quick Reference Checklist

Before publishing content, verify:
- [ ] All images have meaningful alt text or are marked decorative
- [ ] Headings follow logical hierarchy (H1 → H2 → H3)
- [ ] Links have descriptive text (not "click here")
- [ ] Color isn't the only way information is conveyed
- [ ] Content is readable without images or CSS
- [ ] Tables have proper headers and captions
- [ ] Lists use proper HTML markup
- [ ] Video/audio content has alternatives

---

## Writing Accessible Content

### Language and Readability

**Use Clear, Simple Language**
- Write for your audience's reading level
- Explain technical terms when first used
- Use active voice when possible
- Keep sentences and paragraphs reasonably short

**Example:**
```markdown
<!-- Good -->
## Setting Up Your Environment
Install Node.js to run the development server.

<!-- Less accessible -->  
## Environmental Configuration Prerequisites
The requisite runtime environment necessitates Node.js installation for server instantiation.
```

### Heading Structure

**Use Logical Heading Hierarchy**
- Use only one H1 per page
- Don't skip heading levels
- Use headings to structure content, not for styling

**Example:**
```markdown
# Page Title (H1)

## Main Section (H2)

### Subsection (H3)

#### Detail (H4)

## Another Main Section (H2)
```

**Don't do this:**
```markdown
# Page Title (H1)

### Skipped H2 - This confuses screen readers

## Back to H2 - Out of order
```

---

## Images and Media

### Images

**Meaningful Images Need Alt Text**
```markdown
<!-- Good: Descriptive alt text -->
![Dashboard showing three metrics: 45 active users, 23% conversion rate, and $12,345 revenue](dashboard-screenshot.png)

<!-- Bad: Non-descriptive -->
![Image](dashboard-screenshot.png)
![Dashboard screenshot](dashboard-screenshot.png)
```

**Decorative Images Should Be Hidden**
```markdown
<!-- For purely decorative images -->
![](decorative-border.png){aria-hidden="true"}

<!-- Or use empty alt text -->
![""](decorative-border.png)
```

**Complex Images Need Descriptions**
```markdown
<!-- For charts, graphs, complex diagrams -->
![Sales chart showing steady growth from January to December](sales-chart.png)

The chart shows monthly sales data for 2024:
- January: $10,000
- February: $12,000
- March: $15,000
[continue with data description]
```

### Videos and Audio

**Provide Alternatives**
- Add captions for videos
- Provide transcripts for audio content
- Include audio descriptions for visual content

```markdown
## Tutorial Video

<video controls>
  <source src="tutorial.mp4" type="video/mp4">
  <track kind="captions" src="tutorial-captions.vtt" srclang="en" label="English">
  Your browser doesn't support video playback.
</video>

**Transcript:** [Link to full transcript](tutorial-transcript.txt)
```

---

## Links and Navigation

### Link Text

**Make Links Descriptive**
```markdown
<!-- Good: Clear destination -->
Read the [accessibility guidelines](./accessibility-guidelines.md) for more information.

Download the [user manual (PDF, 2MB)](./user-manual.pdf) to get started.

<!-- Bad: Vague links -->
Click [here](./accessibility-guidelines.md) for more information.

[Download](./user-manual.pdf) to get started.
```

**Multiple Links to Same Destination**
```markdown
<!-- Good: Different context, different text -->
Learn about [color contrast requirements](./design-guide.md#color-contrast) in our design guide.

Our [design guide](./design-guide.md) covers color contrast and other visual principles.

<!-- Bad: Same link text, different context -->
Read more about [color contrast](./design-guide.md#color-contrast).

Read more about [color contrast](./accessibility-guide.md#color).
```

---

## Tables

### Data Tables

**Always Include Headers and Captions**
```markdown
| Month    | Revenue  | Growth |
|----------|----------|--------|
| January  | $10,000  | +5%    |
| February | $12,000  | +20%   |
| March    | $15,000  | +25%   |

*Table: Quarterly Revenue Growth showing steady increase*
```

**For Complex Tables, Use HTML**
```html
<table>
  <caption>Quarterly Sales by Region and Product</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Product A</th>
      <th scope="col">Product B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$5,000</td>
      <td>$7,500</td>
    </tr>
    <tr>
      <th scope="row">South</th>
      <td>$4,200</td>
      <td>$6,800</td>
    </tr>
  </tbody>
</table>
```

### Layout Tables

**Don't Use Tables for Layout**
Use CSS Grid or Flexbox instead of tables for visual layout.

---

## Lists and Structure

### Proper List Markup

**Use HTML Lists for Related Items**
```markdown
<!-- Good: Proper list structure -->
## Requirements

To get started, you'll need:

1. Node.js (version 16 or higher)
2. A text editor like VS Code
3. Basic knowledge of HTML and CSS

## Available Commands

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
```

**Don't Use Manual Formatting**
```markdown
<!-- Bad: Not a semantic list -->
Requirements:

1) Node.js (version 16 or higher)
2) A text editor like VS Code
3) Basic knowledge of HTML and CSS

Commands:

* npm start - Start development server
* npm build - Build for production
* npm test - Run tests
```

---

## Forms and Interactive Content

### Form Elements

**Always Label Form Inputs**
```html
<!-- Good: Proper labels -->
<label for="email">Email Address (Required)</label>
<input type="email" id="email" name="email" required aria-describedby="email-help">
<div id="email-help">We'll never share your email address</div>

<!-- Bad: Missing labels -->
<input type="email" placeholder="Email Address">
```

### Instructions and Help Text

**Provide Clear Instructions**
```html
<!-- Good: Clear instructions -->
<label for="password">Password</label>
<input type="password" id="password" name="password" aria-describedby="pwd-help">
<div id="pwd-help">
  Password must be at least 8 characters long and include:
  <ul>
    <li>One uppercase letter</li>
    <li>One lowercase letter</li>
    <li>One number</li>
  </ul>
</div>
```

---

## Color and Visual Design

### Color Usage

**Don't Rely Only on Color**
```markdown
<!-- Good: Color + icon + text -->
✅ **Success:** Your changes have been saved.

❌ **Error:** Please correct the highlighted fields.

⚠️ **Warning:** This action cannot be undone.

<!-- Bad: Only color -->
**Success:** Your changes have been saved. (only in green)

**Error:** Please correct the fields. (only in red)
```

### Text Contrast

**Ensure Sufficient Contrast**
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 minimum
- Use online contrast checkers to verify

---

## Code Examples

### Code Blocks

**Provide Context for Code Examples**
```markdown
<!-- Good: Explained code -->
Add the following CSS to your stylesheet to create a responsive grid:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

This creates a flexible grid that automatically adjusts the number of columns based on available space.
```

**Include Alternative Text for ASCII Art**
```markdown
<!-- For ASCII diagrams, provide text description -->
```
┌─────────────┐
│   Header    │
├─────────────┤
│   Content   │
├─────────────┤
│   Footer    │
└─────────────┤
```

*Diagram: Basic page layout with header, content area, and footer stacked vertically*
```

---

## Testing Your Content

### Manual Testing

**Test with Keyboard Only**
1. Use only Tab, Shift+Tab, Enter, Space, and arrow keys
2. Ensure all interactive elements are reachable
3. Verify focus indicators are visible

**Test with Screen Reader**
1. Use NVDA (free), VoiceOver (Mac), or browser extensions
2. Navigate by headings (H key in NVDA)
3. Navigate by links (K key in NVDA)
4. Ensure content makes sense when read aloud

### Automated Testing

**Use Built-in Tools**
Run accessibility tests on your content:
```bash
npm run test:a11y
```

**Browser Extensions**
- axe DevTools (Chrome/Firefox)
- WAVE Web Accessibility Evaluator
- Lighthouse Accessibility Audit

---

## Content Types

### Documentation Pages

**Structure for Scanning**
```markdown
# Page Title

Brief overview of what this page covers.

## Overview
Quick summary for those who need the basics.

## Step-by-Step Guide
1. First step
2. Second step
3. Final step

## Advanced Topics
For users who need more detail.

## Troubleshooting
Common issues and solutions.

## Related Resources
- [Link to related page](./related.md)
- [External resource](https://example.com)
```

### API Documentation

**Make Technical Content Accessible**
```markdown
# API Endpoint: User Authentication

## Overview
Authenticate users and receive an access token.

## Request Format
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "user_password"
}
```

**Parameters:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

## Response Format
Success response (200 OK):
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 123,
    "email": "user@example.com"
  }
}
```

**Response Fields:**
- `token`: JWT token for authenticated requests
- `user.id`: Unique user identifier
- `user.email`: User's email address
```

---

## Resources and Tools

### Testing Tools
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### Guidelines and Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)

### Screen Readers for Testing
- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- VoiceOver (Built into macOS)
- [Screen Reader Chrome Extension](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn)

Remember: Accessibility benefits everyone. Content that's accessible to people with disabilities is also easier to use for people on mobile devices, in noisy environments, or with temporary impairments.