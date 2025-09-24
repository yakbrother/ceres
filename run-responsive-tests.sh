#!/bin/bash

# Run responsive layout tests with Playwright
# Make sure your Astro dev server is running on http://localhost:4321

echo "🧪 Running responsive layout tests..."
echo "Make sure your dev server is running: npm run dev"
echo ""

# Install Playwright if not already installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js and npm first."
    exit 1
fi

# Check if playwright is installed
if ! npx playwright --version &> /dev/null; then
    echo "📦 Installing Playwright..."
    npm install -D @playwright/test
    npx playwright install
fi

# Run the tests
echo "🚀 Running responsive layout tests..."
npx playwright test responsive-layout.spec.js --headed

echo ""
echo "✅ Tests completed! Check the results above."
echo ""
echo "💡 To run tests without browser UI: npx playwright test responsive-layout.spec.js"
echo "💡 To debug tests: npx playwright test responsive-layout.spec.js --debug"