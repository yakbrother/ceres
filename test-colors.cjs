const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 }
  });
  const page = await context.newPage();

  try {
    // Navigate to the site
    console.log('🌐 Navigating to site...');
    await page.goto('http://localhost:4326', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Take screenshot of light theme
    console.log('📸 Taking light theme screenshot...');
    await page.screenshot({ 
      path: 'light-theme-test.png',
      fullPage: true 
    });

    // Check light theme colors
    console.log('🎨 Checking light theme colors...');
    
    // Get accent color (links)
    const accentColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    console.log('Light theme accent color:', accentColor);

    // Get a sample link color
    const linkElement = await page.$('a');
    if (linkElement) {
      const linkColor = await linkElement.evaluate(el => getComputedStyle(el).color);
      console.log('Sample link color:', linkColor);
    }

    // Switch to dark theme
    console.log('🌙 Switching to dark theme...');
    const themeToggle = await page.$('[aria-label*="theme"]');
    if (themeToggle) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
    }

    // Take screenshot of dark theme
    console.log('📸 Taking dark theme screenshot...');
    await page.screenshot({ 
      path: 'dark-theme-test.png',
      fullPage: true 
    });

    // Check dark theme colors
    console.log('🎨 Checking dark theme colors...');
    const darkAccentColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();
    });
    console.log('Dark theme accent color:', darkAccentColor);

    // Check text colors
    const textColors = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        primary: styles.getPropertyValue('--color-text-primary').trim(),
        secondary: styles.getPropertyValue('--color-text-secondary').trim(),
        muted: styles.getPropertyValue('--color-text-muted').trim()
      };
    });
    console.log('Text colors:', textColors);

    // Navigate to a content page to see more text
    console.log('📄 Checking content page...');
    await page.goto('http://localhost:4326/docs/installation', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'content-page-dark.png',
      fullPage: true 
    });

    // Switch back to light theme for content page
    const themeToggle2 = await page.$('[aria-label*="theme"]');
    if (themeToggle2) {
      await themeToggle2.click();
      await page.waitForTimeout(1000);
    }

    await page.screenshot({ 
      path: 'content-page-light.png',
      fullPage: true 
    });

    console.log('✅ Color contrast test completed!');
    console.log('📸 Screenshots saved:');
    console.log('  - light-theme-test.png');
    console.log('  - dark-theme-test.png'); 
    console.log('  - content-page-light.png');
    console.log('  - content-page-dark.png');

  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    await browser.close();
  }
})();