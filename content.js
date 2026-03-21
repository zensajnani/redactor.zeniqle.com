// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Redactor] Received message:', message);
  if (message.action === 'updateBlur') {
    applyBlur(message.selectors, message.isEnabled);
    sendResponse({ success: true });
  }
  return true; // Keep message channel open for async response
});

// Apply blur effect
function applyBlur(selectors, isEnabled) {
  console.log('[Redactor] Applying blur:', { selectors, isEnabled });

  // Remove existing blur styles
  const existingStyle = document.getElementById('redactor-blur-styles');
  if (existingStyle) {
    existingStyle.remove();
  }

  if (!isEnabled || selectors.length === 0) {
    console.log('[Redactor] Blur disabled or no selectors');
    return;
  }

  // Create style element
  const style = document.createElement('style');
  style.id = 'redactor-blur-styles';

  // Generate CSS rules
  const cssRules = selectors.map(selector => {
    return `${selector} {
      filter: blur(8px) !important;
      -webkit-filter: blur(8px) !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      transition: filter 0.2s ease !important;
    }`;
  }).join('\n');

  style.textContent = cssRules;
  document.head.appendChild(style);
  console.log('[Redactor] Blur applied to selectors:', selectors);
}

// Initialize on page load
(async () => {
  console.log('[Redactor] Content script loaded');
  try {
    const result = await chrome.storage.local.get(['selectors', 'isEnabled']);
    console.log('[Redactor] Storage result:', result);
    if (result.selectors && result.isEnabled) {
      applyBlur(result.selectors, true);
    }
  } catch (error) {
    console.error('[Redactor] Error reading storage:', error);
  }
})();