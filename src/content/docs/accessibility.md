---
title: "Web Accessibility Essentials"
description: "Essential accessibility practices for building inclusive digital gardens that work for everyone"
---

# Web Accessibility Essentials

Accessibility ensures your digital garden is usable by everyone, including people with disabilities. Here's how to build inclusively from the start.

## Semantic HTML Foundation

Use proper HTML elements for their intended purpose. This provides meaning for screen readers and keyboard navigation.

```html path=null start=null
<!-- Good: Semantic structure -->
<main>
  <article>
    <header>
      <h1>Understanding Digital Gardens</h1>
      <time datetime="2024-01-15">January 15, 2024</time>
    </header>
    <p>Digital gardens are...</p>
    <nav aria-label="Article sections">
      <ol>
        <li><a href="#concepts">Core Concepts</a></li>
        <li><a href="#implementation">Implementation</a></li>
      </ol>
    </nav>
  </article>
</main>

<!-- Bad: Generic divs -->
<div class="main">
  <div class="post">
    <div class="title">Understanding Digital Gardens</div>
    <div class="content">Digital gardens are...</div>
  </div>
</div>
```

## ARIA Labels and Attributes

Enhance semantics when HTML alone isn't enough:

```html path=null start=null
<!-- Search functionality -->
<form role="search" aria-label="Site search">
  <input type="search" 
         aria-label="Search articles"
         aria-describedby="search-help"
         placeholder="Search...">
  <div id="search-help">Search through articles and notes</div>
  <button type="submit">Search</button>
</form>

<!-- Navigation with current page -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/garden" aria-current="page">Garden</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Expandable content -->
<button aria-expanded="false" 
        aria-controls="details"
        onclick="toggleDetails()">
  Show Details
</button>
<div id="details" hidden>
  Additional information here...
</div>
```

## Keyboard Navigation

Ensure all functionality works with keyboard only:

```css path=null start=null
/* Visible focus indicators */
:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Skip navigation for screen readers */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
```

```html path=null start=null
<!-- Skip navigation link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Logical tab order -->
<nav>
  <a href="/" tabindex="1">Home</a>
  <a href="/search" tabindex="2">Search</a>
</nav>
<main id="main-content" tabindex="-1">
  <h1>Content starts here</h1>
</main>
```

## Color and Contrast

Ensure sufficient color contrast and don't rely on color alone:

```css path=null start=null
/* High contrast text */
:root {
  --text-color: #212121;      /* 16:1 contrast ratio */
  --background: #ffffff;
  --link-color: #0066cc;       /* 7:1 contrast ratio */
  --success: #2e7d32;
  --error: #d32f2f;
}

/* Status indicators with multiple cues */
.status {
  padding: 0.5rem;
  border-left: 4px solid;
  font-weight: 500;
}

.status.success {
  background: #e8f5e8;
  border-color: var(--success);
  color: var(--success);
}

.status.success::before {
  content: "✓ ";
}

.status.error {
  background: #ffeaea;
  border-color: var(--error);
  color: var(--error);
}

.status.error::before {
  content: "⚠ ";
}
```

## Image Accessibility

Provide meaningful alt text and handle decorative images:

```html path=null start=null
<!-- Informative images -->
<img src="digital-garden-structure.png" 
     alt="Diagram showing interconnected notes in a digital garden with bidirectional links">

<!-- Decorative images -->
<img src="decoration.svg" alt="" role="presentation">

<!-- Complex images with detailed descriptions -->
<figure>
  <img src="performance-chart.png" 
       alt="Website performance metrics over 6 months">
  <figcaption>
    Performance improved from 65 to 95 Lighthouse score between 
    January and June, with the largest improvement in April after 
    implementing image optimization.
  </figcaption>
</figure>
```

## Form Accessibility

Create accessible forms with proper labels and error handling:

```html path=null start=null
<form>
  <!-- Proper label association -->
  <label for="email">Email Address</label>
  <input type="email" 
         id="email" 
         name="email"
         required
         aria-describedby="email-help email-error">
  <div id="email-help">We'll never share your email</div>
  <div id="email-error" role="alert" aria-live="polite">
    <!-- Error messages inserted here -->
  </div>

  <!-- Grouped related fields -->
  <fieldset>
    <legend>Notification Preferences</legend>
    <input type="checkbox" id="email-notifications" name="notifications" value="email">
    <label for="email-notifications">Email notifications</label>
    
    <input type="checkbox" id="sms-notifications" name="notifications" value="sms">
    <label for="sms-notifications">SMS notifications</label>
  </fieldset>

  <button type="submit">Subscribe</button>
</form>
```

## Testing Your Accessibility

Use these tools and techniques to verify accessibility:

```javascript path=null start=null
// Keyboard navigation test
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    console.log('Tab pressed - check focus visibility');
  }
});

// Screen reader simulation
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

### Testing Checklist

- [ ] Navigate entire site using only keyboard (Tab, Enter, Arrow keys)
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] Ensure all images have appropriate alt text
- [ ] Check that form errors are announced to screen readers
- [ ] Test zoom up to 200% without horizontal scrolling
- [ ] Validate HTML markup for semantic correctness

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe Browser Extension](https://www.deque.com/axe/browser-extensions/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Checker](https://www.tpgi.com/color-contrast-checker/)

Remember: Accessibility isn't a feature to add later—it's a fundamental part of good design that benefits everyone.