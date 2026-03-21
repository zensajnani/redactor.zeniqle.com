// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateBlur') {
    applyBlur(message.selectors, message.isEnabled);
  }
});

// Apply blur effect
function applyBlur(selectors, isEnabled) {
  // Remove existing blur styles
  const existingStyle = document.getElementById('redactor-blur-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  if (!isEnabled || selectors.length === 0) return;

  // Create style element
  const style = document.createElement('style');
  style.id = 'redactor-blur-styles';

  // Generate CSS rules
  const cssRules = selectors.map(selector => {
    // Escape special characters for CSS
    const escapedSelector = selector.replace(/'/g, "\\'");
    return `${escapedSelector} {
      filter: blur(8px) !important;
      -webkit-filter: blur(8px) !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      transition: filter 0.2s ease !important;
    }`;
  }).join('\n');

  style.textContent = cssRules;
  document.head.appendChild(style);
}

// Initialize on page load
(async () => {
  const result = await chrome.storage.local.get(['selectors', 'isEnabled']);
  if (result.selectors && result.isEnabled) {
    applyBlur(result.selectors, true);
  }
})();