const { test, expect } = require('@playwright/test');

test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Visit a docs page that has ToC content
    await page.goto('http://localhost:4321/docs/');
  });

  test('Large screens show three-column layout', async ({ page }) => {
    // Set viewport to large size (1400px)
    await page.setViewportSize({ width: 1400, height: 900 });

    // Wait for layout to stabilize
    await page.waitForTimeout(500);

    // Verify all three components are visible
    const sidebar = page.locator('.sidebar');
    const mainContent = page.locator('.main-content');
    const toc = page.locator('.toc');
    const hamburgerMenu = page.locator('#mobile-menu-toggle');

    await expect(sidebar).toBeVisible();
    await expect(mainContent).toBeVisible();
    await expect(toc).toBeVisible();
    
    // Hamburger menu should be hidden on large screens
    await expect(hamburgerMenu).not.toBeVisible();
    
    // Desktop ToC title should be visible
    const tocTitle = page.locator('.toc__title');
    await expect(tocTitle).toBeVisible();
    
    // Mobile ToC toggle should be hidden
    const tocMobileToggle = page.locator('.toc__mobile-toggle');
    await expect(tocMobileToggle).not.toBeVisible();
  });

  test('Medium screens show two-column layout with ToC dropdown', async ({ page }) => {
    // Set viewport to medium size (1000px)
    await page.setViewportSize({ width: 1000, height: 900 });

    // Wait for layout to stabilize
    await page.waitForTimeout(500);

    // Verify sidebar and main content are visible
    const sidebar = page.locator('.sidebar');
    const mainContent = page.locator('.main-content');
    
    await expect(sidebar).toBeVisible();
    await expect(mainContent).toBeVisible();
    
    // Right-column ToC should be hidden
    const rightToc = page.locator('.toc').last();
    await expect(rightToc).not.toBeVisible();
    
    // Mobile ToC toggle should be visible in main content
    const tocMobileToggle = page.locator('.toc__mobile-toggle');
    await expect(tocMobileToggle).toBeVisible();
    
    // Check that ToC dropdown has tan background
    const tocToggleStyles = await tocMobileToggle.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Hamburger menu should still be hidden on medium screens
    const hamburgerMenu = page.locator('#mobile-menu-toggle');
    await expect(hamburgerMenu).not.toBeVisible();
  });

  test('Small screens show single-column layout with hamburger menu', async ({ page }) => {
    // Set viewport to small size (600px)
    await page.setViewportSize({ width: 600, height: 900 });

    // Wait for layout to stabilize
    await page.waitForTimeout(500);

    // Main content should be visible
    const mainContent = page.locator('.main-content');
    await expect(mainContent).toBeVisible();
    
    // Sidebar should be hidden initially
    const sidebar = page.locator('.sidebar');
    await expect(sidebar).not.toBeVisible();
    
    // Hamburger menu should be visible
    const hamburgerMenu = page.locator('#mobile-menu-toggle');
    await expect(hamburgerMenu).toBeVisible();
    
    // ToC dropdown should be visible in main content
    const tocMobileToggle = page.locator('.toc__mobile-toggle');
    await expect(tocMobileToggle).toBeVisible();
  });

  test('ToC dropdown functionality on medium/small screens', async ({ page }) => {
    // Set viewport to medium size
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.waitForTimeout(500);

    // Find and click the ToC mobile toggle
    const tocMobileToggle = page.locator('#toc-mobile-toggle');
    await expect(tocMobileToggle).toBeVisible();
    
    // Initially, ToC nav should be hidden
    const tocNav = page.locator('.toc__nav');
    await expect(tocNav).not.toBeVisible();
    
    // Click to open ToC dropdown
    await tocMobileToggle.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // ToC nav should now be visible
    await expect(tocNav).toBeVisible();
    
    // Verify tan background color
    const tocNavStyles = await tocNav.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Click toggle again to close
    await tocMobileToggle.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // ToC nav should be hidden again
    await expect(tocNav).not.toBeVisible();
  });

  test('Hamburger menu functionality on small screens', async ({ page }) => {
    // Set viewport to small size
    await page.setViewportSize({ width: 600, height: 900 });
    await page.waitForTimeout(500);

    const hamburgerMenu = page.locator('#mobile-menu-toggle');
    const sidebar = page.locator('#sidebar');
    
    // Initially, sidebar should not have open class
    await expect(sidebar).not.toHaveClass(/sidebar--open/);
    
    // Click hamburger to open sidebar
    await hamburgerMenu.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Sidebar should now have open class
    await expect(sidebar).toHaveClass(/sidebar--open/);
    
    // Verify sidebar has tan background when opened
    const sidebarStyles = await sidebar.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Click hamburger again to close
    await hamburgerMenu.click();
    await page.waitForTimeout(300); // Wait for animation
    
    // Sidebar should no longer have open class
    await expect(sidebar).not.toHaveClass(/sidebar--open/);
  });

  test('Responsive breakpoint transitions', async ({ page }) => {
    // Start at large size
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.waitForTimeout(500);
    
    // Verify three-column layout
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.toc')).toBeVisible();
    
    // Transition to medium size
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.waitForTimeout(500);
    
    // Verify two-column layout
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.toc__mobile-toggle')).toBeVisible();
    
    // Transition to small size
    await page.setViewportSize({ width: 600, height: 900 });
    await page.waitForTimeout(500);
    
    // Verify single-column layout
    await expect(page.locator('#mobile-menu-toggle')).toBeVisible();
    await expect(page.locator('.toc__mobile-toggle')).toBeVisible();
  });
});