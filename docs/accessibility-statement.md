# Accessibility Statement

This accessibility statement applies to the Digital Brain documentation template and all sites built using this template.

## Commitment to Accessibility

We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

## Conformance Status

This template aims to conform to the [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/) at Level AA. WCAG 2.1 AA is the international standard for web accessibility.

### Current Compliance Level: **AA Compliant**

We have implemented comprehensive accessibility features to ensure this template meets WCAG 2.1 AA standards:

## Accessibility Features

### ✅ Implemented Features

#### Perceivable
- **Alternative Text**: All images have appropriate alt text or are marked as decorative
- **Captions**: Text alternatives provided for all meaningful images and icons
- **Color Contrast**: Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- **Responsive Design**: Content adapts to different screen sizes and orientations
- **Text Scaling**: Text can be resized up to 200% without loss of functionality
- **Color Independence**: Information isn't conveyed through color alone

#### Operable
- **Keyboard Navigation**: All functionality available via keyboard
- **Focus Indicators**: Visible focus indicators for all interactive elements
- **Skip Links**: "Skip to main content" and navigation links provided
- **No Seizure Content**: No flashing content that could trigger seizures
- **Reduced Motion**: Respects `prefers-reduced-motion` user preferences
- **Touch Targets**: Minimum 44px touch target size for mobile devices

#### Understandable
- **Page Titles**: Descriptive and unique page titles
- **Heading Structure**: Logical heading hierarchy (h1→h2→h3)
- **Language**: Page language properly declared
- **Consistent Navigation**: Navigation is consistent across pages
- **Error Messages**: Clear, accessible error messages and instructions
- **Form Labels**: All form inputs have proper labels and instructions

#### Robust
- **Valid HTML**: Semantically correct HTML structure
- **ARIA Landmarks**: Proper landmark roles for page regions
- **ARIA Labels**: Descriptive labels for interactive elements
- **Screen Reader Support**: Compatible with major screen readers
- **Semantic Markup**: Proper use of HTML elements for their intended purpose

### 🔧 Advanced Accessibility Features

#### Dynamic Content
- **Live Regions**: ARIA live regions announce dynamic content changes
- **Search Accessibility**: Full keyboard and screen reader support for search
- **Modal Dialogs**: Proper focus management and ARIA attributes
- **Progressive Enhancement**: Works without JavaScript

#### Mobile Accessibility
- **Touch Gestures**: Swipe support for navigation
- **Mobile Menu**: Fully accessible mobile navigation
- **Orientation Support**: Works in both portrait and landscape modes
- **Voice Control**: Compatible with voice control software

#### Testing and Quality Assurance
- **Automated Testing**: Integrated axe-core testing
- **Manual Testing**: Regular testing with screen readers
- **Keyboard Testing**: Comprehensive keyboard-only navigation testing
- **Color Blind Testing**: Tested with color blindness simulators

## Supported Assistive Technologies

This template has been tested with:

- **Screen Readers**: NVDA, JAWS, VoiceOver, Dragon NaturallySpeaking
- **Voice Control**: Dragon NaturallySpeaking, Windows Speech Recognition
- **Keyboard Navigation**: All major operating systems
- **Mobile Assistive Tech**: TalkBack (Android), VoiceOver (iOS)

## Browser Support

Accessibility features work across:
- Chrome/Chromium (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Known Issues

Currently, there are no known accessibility issues. If you discover any problems, please report them using the contact information below.

## Testing Information

### Automated Testing
This template uses axe-core for automated accessibility testing. Run tests with:
```bash
npm run test:a11y
```

### Manual Testing Performed
- ✅ Screen reader testing (NVDA, VoiceOver)
- ✅ Keyboard-only navigation
- ✅ Mobile device testing
- ✅ Color contrast validation
- ✅ Reduced motion testing
- ✅ High contrast mode testing

## Feedback and Contact

We welcome your feedback on the accessibility of this template. Please let us know if you encounter accessibility barriers:

- **Email**: [Insert your email]
- **GitHub Issues**: [Insert your repository URL]
- **Response Time**: We aim to respond within 2 business days

## Ongoing Efforts

We regularly review and improve accessibility:
- Monthly automated testing
- Quarterly manual testing
- Annual accessibility audit
- User feedback integration
- Updates for new accessibility standards

## Third-Party Content

Some content may be provided by third parties. We work to ensure all integrated content meets our accessibility standards, but if you encounter issues with third-party components, please let us know.

## Content Authors

If you're using this template to create content, please follow our [Content Accessibility Guidelines](./content-accessibility-guidelines.md) to maintain accessibility standards.

## Legal Information

This accessibility statement was last updated on [Insert Date]. Our commitment to accessibility is ongoing, and we continuously work to improve the experience for all users.

---

*This statement is based on the W3C accessibility statement template and follows best practices for accessibility statements.*