# PWA App Installer - Quote & Client Manager

## Overview

This app has a dedicated PWA (Progressive Web App) installer specifically for the **Quote Builder** and **Client Management** features. The app can be installed on mobile devices and desktops for offline access and quick launch.

## What's Included

The PWA installer includes access to:
- ✅ **Quote Builder** (`/quote-builder`) - Create and manage quotes
- ✅ **Quotes Page** (`/quotes`) - View all quotes with analytics
- ✅ **Clients Page** (`/clients`) - Manage client information

## Installation

### Desktop (Chrome/Edge)

1. Visit any of the app pages (`/quote-builder`, `/quotes`, or `/clients`)
2. Log in with your admin password
3. After 3 seconds, an install prompt will appear at the bottom-right
4. Click **"Install"** button
5. The app will be installed and can be launched from your desktop

**Alternative method:**
- Look for the install icon (⊕) in the browser address bar
- Click it to install the app

### Mobile (iOS Safari)

1. Visit any of the app pages on Safari
2. Log in with your admin password
3. Tap the **Share** button (square with arrow)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **"Add"** to confirm
6. The app icon will appear on your home screen

### Mobile (Android Chrome)

1. Visit any of the app pages on Chrome
2. Log in with your admin password
3. An install prompt will appear automatically
4. Tap **"Install"** or **"Add to Home Screen"**
5. The app will be installed

## App Features

### App Shortcuts

When installed, the app provides quick shortcuts:
- **New Quote** - Jump directly to quote builder
- **View Quotes** - View all quotes
- **Clients** - Manage clients

### Standalone Mode

When installed, the app runs in standalone mode:
- No browser UI (address bar, tabs, etc.)
- App-like experience
- Quick access from home screen/desktop

## Technical Details

### Manifest File

The app uses `/app-manifest.json` which includes:
- App name: "AK Home Renovation - Quote & Client Manager"
- Short name: "Quote Manager"
- Start URL: `/quote-builder`
- Scope: `/` (allows navigation to quotes and clients pages)
- Icons: 192x192 and 512x512 PNG icons
- Theme color: `#202845`

### Installation Hooks

The app uses two custom hooks:

1. **`useAppManifest()`** - Loads the app manifest dynamically
   - Used in: `/quote-builder`, `/quotes`, `/clients`
   - Ensures the correct manifest is loaded

2. **`usePWAInstall(isAuthenticated)`** - Handles installation prompts
   - Only shows prompt when user is authenticated
   - Detects if app is already installed
   - Remembers if user dismissed the prompt

### Files

- `/public/app-manifest.json` - PWA manifest configuration
- `/hooks/useAppManifest.ts` - Hook to load manifest
- `/hooks/usePWAInstall.ts` - Hook for installation prompts

## Installation Prompt

The install prompt:
- Appears automatically after 3 seconds (if not dismissed before)
- Only shows when user is authenticated
- Won't show if app is already installed
- Can be dismissed (remembers preference)

## Troubleshooting

### Install prompt not showing?

1. **Check authentication:**
   - Make sure you're logged in
   - The prompt only shows for authenticated users

2. **Check if already installed:**
   - The prompt won't show if the app is already installed
   - Look for the app icon on your home screen/desktop

3. **Check browser support:**
   - Chrome/Edge: Full support
   - Safari (iOS): Manual install via Share menu
   - Firefox: Limited support

4. **Clear dismissed preference:**
   - Open browser console
   - Run: `localStorage.removeItem("installPromptDismissed")`
   - Refresh the page

### App not working offline?

- The app requires internet connection for:
  - Firebase database access
  - Authentication
  - Email sending
- Offline functionality is limited to viewing cached data

### Manifest not loading?

1. Check browser console for errors
2. Verify `/public/app-manifest.json` exists
3. Clear browser cache and reload

## Development

### Testing Installation

1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000/quote-builder`
3. Log in
4. Wait for install prompt (or use browser's install button)

### Updating Manifest

Edit `/public/app-manifest.json`:
- Change app name, description, icons, etc.
- Restart dev server to see changes

### Customizing Install Prompt

Edit `/hooks/usePWAInstall.ts`:
- Change delay time (currently 3000ms)
- Modify prompt behavior
- Customize dismissal logic

## Production Deployment

When deploying to production:

1. **Verify manifest is accessible:**
   - Check: `https://yourdomain.com/app-manifest.json`
   - Should return valid JSON

2. **Test installation:**
   - Visit production URL
   - Test install on different devices/browsers

3. **Verify icons:**
   - Ensure `/logo.png` exists and is accessible
   - Icons should be 192x192 and 512x512 pixels

## Notes

- The app manifest is separate from the main website manifest
- Main website uses `/manifest.json` (for SEO)
- App uses `/app-manifest.json` (for PWA installation)
- Both can coexist without conflicts

