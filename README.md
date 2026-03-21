# Zeniqle Redactor

A Chrome extension to blur sensitive information on webpages during screen recording.

## Features

- Blur any CSS selector on any webpage
- Persistent selectors (stored locally via chrome.storage)
- Quick presets for common elements
- Global on/off toggle
- Dark minimalistic UI
- Automatic content script injection

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `redactor` folder

## Usage

1. Click the extension icon to open the popup
2. Toggle blur **Active/Disabled** with the main button
3. Enter CSS selectors or use quick presets
4. Selectors persist across sessions

## Quick Presets

| Preset | Selector | Description |
|--------|----------|-------------|
| Passwords | `input[type='password']` | All password input fields |
| Emails | `input[type='email']` | All email input fields |
| X Usernames | `[data-testid='User-Name']` | Twitter/X display names |

## Common Selectors

```
input[type='password']     Password fields
input[type='email']        Email fields
[data-testid='User-Name']  X/Twitter usernames
[data-testid='tweet']      X/Twitter entire tweets
.username                  Elements with class "username"
#profile-name              Element with ID "profile-name"
[aria-label='Password']    Elements with aria-label
```

## Debugging

Open DevTools (F12) → Console. You should see:
```
[Redactor] Content script loaded
[Redactor] Applying blur: { selectors: [...], isEnabled: true }
```

## File Structure

```
redactor/
├── manifest.json    # Extension config (Manifest V3)
├── popup.html       # Popup UI
├── popup.css        # Dark theme styles
├── popup.js         # Popup logic & messaging
├── content.js       # Blur injection script
├── blur.css         # Base blur transitions
├── icons/           # Extension icons
└── README.md        # This file
```

## Permissions

- `storage` - Persist selectors and settings
- `activeTab` - Access current tab
- `scripting` - Inject content script dynamically
- `host_permissions: <all_urls>` - Run on any website

## License

MIT