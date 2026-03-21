// State
let selectors = [];
let isEnabled = false;

// DOM Elements
const toggleBtn = document.getElementById('toggleAll');
const selectorInput = document.getElementById('selectorInput');
const addBtn = document.getElementById('addSelector');
const selectorsList = document.getElementById('selectorsList');
const clearBtn = document.getElementById('clearAll');
const presetBtns = document.querySelectorAll('.preset-btn');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  const result = await chrome.storage.local.get(['selectors', 'isEnabled']);
  selectors = result.selectors || [];
  isEnabled = result.isEnabled ?? false;

  updateToggleUI();
  renderSelectors();
});

// Toggle blur on/off
toggleBtn.addEventListener('click', async () => {
  isEnabled = !isEnabled;
  await chrome.storage.local.set({ isEnabled });
  updateToggleUI();
  applyBlur();
});

// Add selector
addBtn.addEventListener('click', addSelector);
selectorInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addSelector();
});

// Preset buttons
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selector = btn.dataset.selector;
    if (!selectors.includes(selector)) {
      selectors.push(selector);
      saveAndRender();
    }
  });
});

// Clear all
clearBtn.addEventListener('click', async () => {
  if (confirm('Remove all selectors?')) {
    selectors = [];
    await chrome.storage.local.set({ selectors });
    renderSelectors();
    applyBlur();
  }
});

// Functions
function updateToggleUI() {
  toggleBtn.classList.toggle('active', isEnabled);
  toggleBtn.querySelector('.status-text').textContent = isEnabled ? 'Active' : 'Disabled';
}

function renderSelectors() {
  if (selectors.length === 0) {
    selectorsList.innerHTML = '<div class="empty-state">No selectors added yet</div>';
    return;
  }

  selectorsList.innerHTML = selectors.map((selector, index) => `
    <div class="selector-item">
      <span class="selector-text">${escapeHtml(selector)}</span>
      <button class="remove-btn" data-index="${index}">×</button>
    </div>
  `).join('');

  // Add remove listeners
  selectorsList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      selectors.splice(index, 1);
      saveAndRender();
    });
  });
}

async function addSelector() {
  const selector = selectorInput.value.trim();
  if (!selector) return;

  // Validate selector
  try {
    document.querySelector(selector);
  } catch {
    alert('Invalid CSS selector');
    return;
  }

  if (!selectors.includes(selector)) {
    selectors.push(selector);
    await saveAndRender();
    selectorInput.value = '';
  }
}

async function saveAndRender() {
  await chrome.storage.local.set({ selectors });
  renderSelectors();
  applyBlur();
}

function applyBlur() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'updateBlur',
        selectors,
        isEnabled
      });
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}