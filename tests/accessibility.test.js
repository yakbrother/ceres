// Accessibility testing with axe-core
// This script can be run to test accessibility compliance

const axeCore = require('axe-core');
const fs = require('fs');
const path = require('path');

/**
 * Test accessibility of a page using axe-core
 * @param {string} html - HTML content to test
 * @param {string} pageName - Name of the page being tested
 * @returns {Promise<Object>} Axe test results
 */
async function testPageAccessibility(html, pageName = 'Unknown') {
  // Configure axe-core
  const axeConfig = {
    rules: {
      // Enable all WCAG 2.1 AA rules
      'color-contrast': { enabled: true },
      'focus-order-semantics': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'aria-roles': { enabled: true },
      'landmark-unique': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true }
    },
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
  };

  try {
    // Create a DOM context for testing
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    global.window = dom.window;
    global.document = dom.window.document;

    // Run axe-core analysis
    const results = await axeCore.run(document, axeConfig);

    // Generate report
    const report = {
      pageName,
      timestamp: new Date().toISOString(),
      url: 'static-analysis',
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable,
      summary: {
        violationCount: results.violations.length,
        passCount: results.passes.length,
        incompleteCount: results.incomplete.length,
        inapplicableCount: results.inapplicable.length
      }
    };

    return report;
  } catch (error) {
    console.error(`Error testing ${pageName}:`, error);
    return {
      pageName,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate a human-readable accessibility report
 * @param {Object} results - Axe test results
 * @returns {string} Formatted report
 */
function generateAccessibilityReport(results) {
  let report = `
# Accessibility Test Report
**Page:** ${results.pageName}
**Tested:** ${new Date(results.timestamp).toLocaleString()}

## Summary
- ✅ **Passed:** ${results.summary.passCount} checks
- ❌ **Violations:** ${results.summary.violationCount} issues
- ⚠️ **Incomplete:** ${results.summary.incompleteCount} needs review
- ➖ **Not Applicable:** ${results.summary.inapplicableCount} checks

`;

  // Add violations section
  if (results.violations.length > 0) {
    report += `## Violations (${results.violations.length})\n\n`;
    results.violations.forEach((violation, index) => {
      report += `### ${index + 1}. ${violation.help}\n`;
      report += `**Impact:** ${violation.impact}\n`;
      report += `**Description:** ${violation.description}\n`;
      report += `**Help URL:** ${violation.helpUrl}\n`;
      report += `**Affected Elements:** ${violation.nodes.length}\n\n`;
      
      violation.nodes.forEach((node, nodeIndex) => {
        report += `#### Element ${nodeIndex + 1}\n`;
        report += `**Target:** \`${node.target.join(' ')}\`\n`;
        report += `**HTML:** \`${node.html.substring(0, 100)}${node.html.length > 100 ? '...' : ''}\`\n`;
        if (node.failureSummary) {
          report += `**Issue:** ${node.failureSummary}\n`;
        }
        report += '\n';
      });
    });
  }

  // Add incomplete items
  if (results.incomplete.length > 0) {
    report += `## Items Needing Review (${results.incomplete.length})\n\n`;
    results.incomplete.forEach((item, index) => {
      report += `### ${index + 1}. ${item.help}\n`;
      report += `**Description:** ${item.description}\n`;
      report += `**Help URL:** ${item.helpUrl}\n\n`;
    });
  }

  // Add successful checks
  if (results.passes.length > 0) {
    report += `## Successful Checks (${results.passes.length})\n\n`;
    results.passes.slice(0, 10).forEach((pass, index) => {
      report += `- ✅ ${pass.help}\n`;
    });
    if (results.passes.length > 10) {
      report += `- ... and ${results.passes.length - 10} more\n`;
    }
  }

  return report;
}

/**
 * Test all pages in the dist directory
 */
async function testAllPages() {
  const distDir = path.join(__dirname, '../dist');
  const results = [];

  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.log('❌ No dist directory found. Please run `npm run build` first.');
    return;
  }

  // Find all HTML files
  function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHtmlFiles(filePath, fileList);
      } else if (file.endsWith('.html')) {
        fileList.push(filePath);
      }
    });
    
    return fileList;
  }

  const htmlFiles = findHtmlFiles(distDir);
  console.log(`Found ${htmlFiles.length} HTML files to test`);

  // Test each file
  for (const filePath of htmlFiles) {
    const relativePath = path.relative(distDir, filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Testing: ${relativePath}`);
    const result = await testPageAccessibility(html, relativePath);
    results.push(result);
  }

  // Generate reports
  const reportsDir = path.join(__dirname, '../accessibility-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  let totalViolations = 0;
  let totalPasses = 0;

  results.forEach(result => {
    if (!result.error) {
      totalViolations += result.summary.violationCount;
      totalPasses += result.summary.passCount;
      
      const report = generateAccessibilityReport(result);
      const fileName = result.pageName.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.md';
      fs.writeFileSync(path.join(reportsDir, fileName), report);
    }
  });

  // Generate summary report
  const summary = `# Accessibility Test Summary

**Generated:** ${new Date().toLocaleString()}
**Pages Tested:** ${results.length}
**Total Violations:** ${totalViolations}
**Total Passes:** ${totalPasses}

## Pages Results

${results.map(result => {
  if (result.error) {
    return `- ❌ ${result.pageName}: Error - ${result.error}`;
  }
  const status = result.summary.violationCount === 0 ? '✅' : '❌';
  return `- ${status} ${result.pageName}: ${result.summary.violationCount} violations, ${result.summary.passCount} passes`;
}).join('\n')}

## Recommendations

${totalViolations === 0 ? '🎉 All pages passed accessibility testing!' : `
⚠️ Found ${totalViolations} accessibility issues that need attention.

### Priority Actions:
1. Review violation reports in the accessibility-reports directory
2. Fix high and critical impact issues first
3. Test fixes manually with screen readers
4. Re-run automated tests to verify fixes
`}

For detailed reports, check the individual files in the \`accessibility-reports/\` directory.
`;

  fs.writeFileSync(path.join(reportsDir, 'summary.md'), summary);

  console.log(`\n📊 Accessibility Testing Complete`);
  console.log(`📁 Reports saved to: ${reportsDir}`);
  console.log(`🎯 Total violations: ${totalViolations}`);
  console.log(`✅ Total passes: ${totalPasses}`);

  if (totalViolations > 0) {
    console.log(`\n⚠️  Found accessibility issues. Check reports for details.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All pages passed accessibility testing!`);
  }
}

// Export functions for use in other testing contexts
module.exports = {
  testPageAccessibility,
  generateAccessibilityReport,
  testAllPages
};

// Run tests if called directly
if (require.main === module) {
  testAllPages().catch(console.error);
}