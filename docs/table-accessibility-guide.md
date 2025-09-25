# Table Accessibility Guide

This guide explains how to create accessible tables in your documentation. Following these guidelines ensures that users with screen readers and other assistive technologies can effectively navigate and understand tabular data.

## Basic Table Structure

Every accessible table should include:

1. **Caption**: Describes the table's purpose
2. **Headers**: Use `<th>` elements with appropriate `scope` attributes
3. **Proper markup**: Use semantic HTML elements (`<table>`, `<thead>`, `<tbody>`, etc.)

### Example: Basic Data Table

```html
<table>
  <caption>Monthly Sales Report - Q1 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Units Sold</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
      <td>150</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,000</td>
      <td>180</td>
    </tr>
  </tbody>
</table>
```

## Table with Row Headers

When the first column contains headers that describe each row:

```html
<table>
  <caption>Product Comparison</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Widget A</th>
      <td>$29.99</td>
      <td>4.5/5</td>
    </tr>
    <tr>
      <th scope="row">Widget B</th>
      <td>$34.99</td>
      <td>4.2/5</td>
    </tr>
  </tbody>
</table>
```

## Responsive Tables

For mobile-friendly tables, wrap them in a container and use responsive classes:

```html
<div class="table-wrapper table-responsive">
  <table>
    <caption>User Activity Report</caption>
    <thead>
      <tr>
        <th scope="col">User</th>
        <th scope="col">Last Login</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="User">John Doe</td>
        <td data-label="Last Login">2024-01-15</td>
        <td data-label="Status">Active</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Complex Tables

For tables with multiple header levels or complex relationships:

### Multi-level Headers

```html
<table>
  <caption>Quarterly Sales by Region</caption>
  <thead>
    <tr>
      <th rowspan="2" scope="col">Region</th>
      <th colspan="3" scope="colgroup">Q1 2024</th>
    </tr>
    <tr>
      <th scope="col">Jan</th>
      <th scope="col">Feb</th>
      <th scope="col">Mar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$5,000</td>
      <td>$6,000</td>
      <td>$7,500</td>
    </tr>
  </tbody>
</table>
```

### Using IDs and Headers

For very complex relationships, use `id` and `headers` attributes:

```html
<table>
  <caption>Complex Data Relationships</caption>
  <thead>
    <tr>
      <th id="region" scope="col">Region</th>
      <th id="q1-sales" scope="col">Q1 Sales</th>
      <th id="q1-target" scope="col">Q1 Target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="north" scope="row">North</th>
      <td headers="north q1-sales">$18,500</td>
      <td headers="north q1-target">$20,000</td>
    </tr>
  </tbody>
</table>
```

## Accessibility Checklist

### Required Elements
- [ ] `<caption>` element describing the table
- [ ] `<th>` elements for all headers
- [ ] `scope="col"` for column headers
- [ ] `scope="row"` for row headers
- [ ] Semantic structure with `<thead>`, `<tbody>`, `<tfoot>` when appropriate

### Enhanced Accessibility
- [ ] `aria-label` for additional context if needed
- [ ] `aria-describedby` linking to detailed descriptions
- [ ] `role="table"` for non-semantic table layouts (use sparingly)
- [ ] `data-label` attributes for responsive mobile layouts
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Keyboard navigation support

### Mobile Considerations
- [ ] Responsive design that works on small screens
- [ ] Touch-friendly target sizes (minimum 44px)
- [ ] Horizontal scrolling for wide tables
- [ ] Alternative layouts for very complex tables

## Common Mistakes to Avoid

1. **Missing captions**: Always provide context for what the table contains
2. **No header markup**: Using regular cells for headers confuses screen readers
3. **Incorrect scope attributes**: `scope="col"` vs `scope="row"` matters
4. **Layout tables**: Use CSS Grid/Flexbox instead of tables for layout
5. **Poor mobile experience**: Tables that don't work on small screens
6. **No keyboard navigation**: Users should be able to navigate with Tab/Arrow keys

## Testing Your Tables

1. **Screen reader test**: Use NVDA, JAWS, or VoiceOver to navigate your table
2. **Keyboard navigation**: Try using only Tab, Shift+Tab, and arrow keys
3. **Mobile test**: Verify the table works well on small screens
4. **Color contrast**: Ensure adequate contrast between text and backgrounds
5. **Automated testing**: Use tools like axe-core to catch issues

## When Not to Use Tables

Tables should only be used for tabular data. Don't use tables for:
- Page layout (use CSS Grid or Flexbox)
- Simple lists (use `<ul>` or `<ol>`)
- Key-value pairs (use description lists `<dl>`)
- Visual alignment (use CSS)

Remember: If your data makes sense in a spreadsheet, it probably belongs in a table. If it's just for visual formatting, use CSS instead.