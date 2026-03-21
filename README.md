# Zeniqle Redactor

A minimal Chrome extension to blur sensitive information on webpages for screen recording.

## Features

- Blur any CSS selector on any webpage
- Preserved selectors (stored locally)
- Quick presets for common elements (passwords, emails, X usernames)
- Toggle blur on/off globally
- Dark minimalistic UI

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select this folder

## Usage

1. Click the extension icon to open the popup
2. Toggle the blur on/off with the main button
3. Enter CSS selectors to blur specific elements
4. Use quick presets for common elements
5. Remove individual selectors or clear all

## Example Selectors

- `input[type='password']` - Password fields
- `input[type='email']` - Email fields
- `[data-testid='User-Name']` - Twitter/X usernames
- `.sensitive-class` - Any custom class
- `#element-id` - Any element by ID