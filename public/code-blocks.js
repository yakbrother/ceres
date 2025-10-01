/**
 * Enhanced Code Block Functionality
 * Adds copy buttons, language labels, and other interactive features
 */

class CodeBlockEnhancer {
  constructor() {
    this.copyButtons = new Map();
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.enhanceCodeBlocks());
    } else {
      this.enhanceCodeBlocks();
    }
  }

  enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    codeBlocks.forEach((block, index) => this.enhanceCodeBlock(block, index));
    
    // Initialize code tabs if present
    this.initCodeTabs();
  }

  enhanceCodeBlock(preElement, index) {
    // Create container
    const container = document.createElement('div');
    container.className = 'code-block-container';
    
    // Get language from class
    const language = this.extractLanguage(preElement);
    const filename = this.extractFilename(preElement);
    
    // Create header if language or filename exists
    if (language || filename) {
      const header = this.createCodeHeader(language, filename);
      container.appendChild(header);
    }
    
    // Wrap the pre element
    preElement.parentNode.insertBefore(container, preElement);
    container.appendChild(preElement);
    
    // Add copy button
    const copyButton = this.createCopyButton(preElement, index);
    container.appendChild(copyButton);
    
    // Add line numbers if specified
    if (preElement.hasAttribute('data-line-numbers')) {
      this.addLineNumbers(preElement);
    }
  }

  extractLanguage(preElement) {
    const classList = Array.from(preElement.classList);
    const languageClass = classList.find(cls => cls.startsWith('language-'));
    if (languageClass) {
      const lang = languageClass.replace('language-', '');
      return this.formatLanguageName(lang);
    }
    return null;
  }

  extractFilename(preElement) {
    const codeElement = preElement.querySelector('code');
    if (codeElement && codeElement.hasAttribute('data-file')) {
      return codeElement.getAttribute('data-file');
    }
    
    // Check for filename in comment
    const firstLine = preElement.textContent.split('\n')[0];
    const filenameMatch = firstLine.match(/(?:\/\/|#|<!--)\s*(.+?\.(js|ts|css|html|py|php|rb|go|rs|cpp|c|h|java|kt|swift|dart|vue|svelte|astro|md|json|xml|yaml|yml|toml|ini|conf|sh|bash|zsh|fish|ps1|bat|cmd))/i);
    if (filenameMatch) {
      return filenameMatch[1];
    }
    
    return null;
  }

  formatLanguageName(lang) {
    const languageNames = {
      'js': 'JavaScript',
      'ts': 'TypeScript',
      'jsx': 'React JSX',
      'tsx': 'React TSX',
      'vue': 'Vue.js',
      'svelte': 'Svelte',
      'astro': 'Astro',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'less': 'Less',
      'py': 'Python',
      'rb': 'Ruby',
      'php': 'PHP',
      'go': 'Go',
      'rs': 'Rust',
      'cpp': 'C++',
      'c': 'C',
      'java': 'Java',
      'kt': 'Kotlin',
      'swift': 'Swift',
      'dart': 'Dart',
      'bash': 'Bash',
      'shell': 'Shell',
      'zsh': 'Zsh',
      'fish': 'Fish',
      'ps1': 'PowerShell',
      'bat': 'Batch',
      'json': 'JSON',
      'xml': 'XML',
      'yaml': 'YAML',
      'yml': 'YAML',
      'toml': 'TOML',
      'ini': 'INI',
      'conf': 'Config',
      'md': 'Markdown',
      'dockerfile': 'Dockerfile',
      'nginx': 'Nginx',
      'apache': 'Apache',
      'sql': 'SQL',
      'graphql': 'GraphQL',
      'regex': 'RegEx'
    };
    
    return languageNames[lang] || lang.toUpperCase();
  }

  createCodeHeader(language, filename) {
    const header = document.createElement('div');
    header.className = 'code-header';
    
    const leftSide = document.createElement('div');
    leftSide.style.display = 'flex';
    leftSide.style.alignItems = 'center';
    leftSide.style.gap = '1rem';
    
    if (language) {
      const langSpan = document.createElement('span');
      langSpan.className = 'code-language';
      langSpan.textContent = language;
      leftSide.appendChild(langSpan);
    }
    
    if (filename) {
      const fileSpan = document.createElement('span');
      fileSpan.className = 'code-filename';
      fileSpan.textContent = filename;
      leftSide.appendChild(fileSpan);
    }
    
    header.appendChild(leftSide);
    return header;
  }

  createCopyButton(preElement, index) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.setAttribute('title', 'Copy code');
    button.innerHTML = this.getCopyIcon();
    
    const buttonId = `copy-btn-${index}`;
    button.id = buttonId;
    this.copyButtons.set(buttonId, preElement);
    
    button.addEventListener('click', (e) => this.handleCopy(e, preElement));
    
    return button;
  }

  getCopyIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
      </svg>
    `;
  }

  getCheckIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }

  async handleCopy(event, preElement) {
    const button = event.currentTarget;
    const code = preElement.querySelector('code');
    const text = code ? code.textContent : preElement.textContent;
    
    // Clean up the text (remove line numbers, prompts, etc.)
    const cleanText = this.cleanCodeText(text);
    
    try {
      await navigator.clipboard.writeText(cleanText);
      this.showCopySuccess(button);
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyTextToClipboard(cleanText, button);
    }
  }

  cleanCodeText(text) {
    // Remove shell prompts
    let cleanText = text.replace(/^\$ /gm, '');
    
    // Remove line numbers (if any leaked through)
    cleanText = cleanText.replace(/^\s*\d+\s+/gm, '');
    
    // Trim extra whitespace
    return cleanText.trim();
  }

  fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess(button);
    } catch (err) {
      console.error('Fallback copy failed:', err);
      this.showCopyError(button);
    } finally {
      document.body.removeChild(textArea);
    }
  }

  showCopySuccess(button) {
    const originalContent = button.innerHTML;
    const originalTitle = button.title;
    
    button.innerHTML = this.getCheckIcon();
    button.title = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.title = originalTitle;
      button.classList.remove('copied');
    }, 2000);
  }

  showCopyError(button) {
    const originalTitle = button.title;
    button.title = 'Copy failed';
    
    setTimeout(() => {
      button.title = originalTitle;
    }, 2000);
  }

  addLineNumbers(preElement) {
    const code = preElement.querySelector('code');
    if (!code) return;
    
    const lines = code.textContent.split('\n');
    const numberedLines = lines.map((line, index) => {
      if (index === lines.length - 1 && line === '') return '';
      return `<span class="line" data-line="${index + 1}">${line}</span>`;
    });
    
    code.innerHTML = numberedLines.join('\n');
    preElement.classList.add('line-numbers');
  }

  initCodeTabs() {
    const tabContainers = document.querySelectorAll('.code-tabs');
    tabContainers.forEach(container => this.initCodeTabContainer(container));
  }

  initCodeTabContainer(container) {
    const buttons = container.querySelectorAll('.code-tab-button');
    const contents = container.querySelectorAll('.code-tab-content');
    
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        if (contents[index]) {
          contents[index].classList.add('active');
        }
      });
      
      // Set first tab as active by default
      if (index === 0) {
        button.classList.add('active');
        if (contents[index]) {
          contents[index].classList.add('active');
        }
      }
    });
  }

  // Public method to re-enhance code blocks (useful for dynamic content)
  refresh() {
    this.enhanceCodeBlocks();
  }
}

// Initialize when script loads
const codeBlockEnhancer = new CodeBlockEnhancer();

// Export for potential use in other scripts
if (typeof window !== 'undefined') {
  window.CodeBlockEnhancer = codeBlockEnhancer;
}

// Re-enhance code blocks when navigating (for SPAs)
if ('navigation' in window) {
  window.navigation.addEventListener('navigate', () => {
    setTimeout(() => codeBlockEnhancer.refresh(), 100);
  });
}

// Fallback for older navigation APIs
window.addEventListener('popstate', () => {
  setTimeout(() => codeBlockEnhancer.refresh(), 100);
});