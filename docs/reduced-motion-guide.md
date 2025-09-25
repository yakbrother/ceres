# Reduced Motion Accessibility Guide

This guide explains how the template respects users' motion preferences and how to implement motion-sensitive features in your content.

## What is Reduced Motion?

Some users experience vestibular disorders, seizures, or other conditions that make animations and motion effects problematic. The `prefers-reduced-motion` CSS media query allows users to indicate they prefer reduced motion through their operating system settings.

## How It's Implemented

### Automatic CSS Handling

The template automatically respects reduced motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions and animations are disabled */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    transform: none !important;
    scroll-behavior: auto !important;
  }
}
```

### JavaScript Utilities

Global utilities are available for motion-aware JavaScript:

```javascript
// Check if user prefers reduced motion
if (window.prefersReducedMotion()) {
  // Skip animation
} else {
  // Perform animation
}

// Respectful animation utility
window.respectfulAnimate(element, keyframes, options);
```

## What Gets Disabled

When reduced motion is preferred, the following are automatically disabled or modified:

### Transitions and Animations
- ✅ CSS transitions become instant
- ✅ CSS animations are skipped
- ✅ Transform effects are removed
- ✅ Smooth scrolling becomes instant

### Interactive Elements
- ✅ Button hover effects (color changes remain, transforms removed)
- ✅ Link hover animations
- ✅ Focus indicator animations
- ✅ Mobile menu transitions

### Preserved Functionality
- ✅ Focus indicators remain visible
- ✅ Color changes still occur
- ✅ Layout changes function normally
- ✅ All interactive elements remain usable

## Implementation Examples

### CSS Animations

**Good: Respects reduced motion**
```css
.element {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
  }
}
```

**Better: Uses CSS variables (automatic)**
```css
.element {
  transition: transform var(--transition-medium);
}
/* Automatic via global reduced motion styles */
```

### JavaScript Animations

**Good: Manual check**
```javascript
function animateElement(element) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Just apply final state
    element.style.opacity = '1';
  } else {
    // Animate normally
    element.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], { duration: 300 });
  }
}
```

**Better: Use utility function**
```javascript
function animateElement(element) {
  window.respectfulAnimate(element, [
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 300 });
}
```

### Scroll Behavior

**Good: Conditional smooth scrolling**
```javascript
function scrollToElement(element) {
  const behavior = window.prefersReducedMotion() ? 'auto' : 'smooth';
  element.scrollIntoView({ behavior });
}
```

## Testing Reduced Motion

### Enable Reduced Motion

**macOS:**
1. System Preferences → Accessibility → Display
2. Check "Reduce motion"

**Windows 10/11:**
1. Settings → Ease of Access → Display
2. Turn on "Show animations in Windows"

**iOS:**
1. Settings → Accessibility → Motion
2. Turn on "Reduce Motion"

**Android:**
1. Settings → Accessibility
2. Turn off "Remove animations" (varies by device)

### Browser Testing

**Chrome DevTools:**
1. Open DevTools → Rendering tab
2. Set "Emulate CSS media feature prefers-reduced-motion"

**Firefox DevTools:**
1. Open DevTools → Inspector → Rules
2. Click the media query toggle button

### Testing Checklist

- [ ] All animations respect `prefers-reduced-motion: reduce`
- [ ] Smooth scrolling becomes instant scrolling
- [ ] Transform effects are disabled
- [ ] Essential functionality still works
- [ ] Focus indicators remain visible
- [ ] Color changes still occur
- [ ] No motion triggers seizures or vestibular issues

## Common Patterns

### Loading States
```css
.loading-spinner {
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .loading-spinner::after {
    content: 'Loading...';
  }
}
```

### Parallax Effects
```css
.parallax {
  transform: translateY(var(--scroll-offset));
  transition: transform 0.1s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .parallax {
    transform: none !important;
  }
}
```

### Auto-playing Media
```javascript
// Respect motion preferences for auto-play
function handleAutoplay(video) {
  if (window.prefersReducedMotion()) {
    video.autoplay = false;
    video.setAttribute('controls', '');
  }
}
```

## Best Practices

### 1. Always Provide Alternatives
Don't just remove animations—provide alternative feedback:
- Loading states: Show text instead of spinners
- Progress indicators: Use static progress bars
- State changes: Use color/text changes

### 2. Test Early and Often
- Enable reduced motion in your OS settings
- Test all interactive features
- Verify nothing breaks when motion is disabled

### 3. Consider Performance
Reduced motion can also benefit users with:
- Slower devices
- Limited battery life
- Poor network connections

### 4. Maintain Visual Hierarchy
When removing motion, ensure:
- Focus indicators remain clear
- State changes are still visible
- Visual feedback is preserved

## Resources

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.1: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Vestibular Disorders Association](https://vestibular.org/)

Remember: Supporting reduced motion isn't just about accessibility—it's about creating inclusive experiences for all users.