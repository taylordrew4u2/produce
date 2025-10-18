# Google Drive Integration Guide

## Overview

The Producer Tasks app now supports **optional Google Drive storage** for large files. This is completely optional — IndexedDB remains the default and works without any setup.

## Why Use Google Drive?

- **Unlimited storage** (within your Google account quota)
- **Cloud backup** - files aren't just in your browser
- **Cross-device access** - files available on any device where you sign in
- **Sharing** - can make files accessible to collaborators

## Setup (One-time)

### 1. Create Google Cloud OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Drive API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Drive API"
   - Click "Enable"

4. Configure OAuth Consent Screen:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" (unless you have a Google Workspace)
   - Fill in app name: "Producer Tasks" (or your choice)
   - Add your email as developer contact
   - **IMPORTANT: Add Test Users** (on the OAuth consent screen page):
     - Click "ADD USERS" under "Test users"
     - Add your Google email address (the one you'll use to sign in)
     - Add any collaborators' emails
   - Scopes: Click "ADD OR REMOVE SCOPES", search for "Drive API", select:
     - `https://www.googleapis.com/auth/drive.file` (Create and edit Drive files)
   - Save
   - **Optional:** Click "PUBLISH APP" to make it available to anyone (removes 100-user limit)
     - If you don't publish, only test users can sign in
     - Publishing requires verification for sensitive scopes (can skip for personal use)

5. Create OAuth 2.0 Client ID:
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - Application type: **Web application**
   - Name: "Producer Tasks Web Client" (or your choice)
   - **Authorized JavaScript origins**:
     - `http://localhost:8080` (for local testing)
     - `https://taylordrew4u2.github.io` (for GitHub Pages)
   - **Authorized redirect URIs**:
     - `http://localhost:8080` (for local testing)
     - `https://taylordrew4u2.github.io/produce` (for GitHub Pages)
   - Click "CREATE"

6. **Copy the Client ID** - you'll need to paste this into the app

**Note:** Do NOT create a Client Secret. Client-side apps use PKCE and don't need secrets.

### 2. Using Drive in the App

1. Open the app (localhost or GitHub Pages)
2. Scroll to the **"Google Drive (optional)"** panel
3. Paste your **Client ID** into the input field
4. Click **"Sign in"**
5. Authorize the app in the Google popup
6. You'll be redirected back - status should show "Signed in"

### 3. Upload Files to Drive

#### Social Media Calendar

- Select a day and add a post
- Choose an image/video file
- **Check the "Save file to Google Drive" checkbox** before clicking "Add Post"
- File will upload to your Drive and a link will be stored in the post

#### Lineup Files/Audio

- For each comedian position (1-5):
  - Click "📎 Upload File" or "🎵 Upload MP3"
  - Choose your file
  - **Check the "Drive" checkbox** next to the upload button
  - File uploads to Drive automatically

## How It Works

### Storage Priority

1. **Drive checkbox checked + signed in**: Upload to Google Drive
2. **Drive not checked or not signed in**: Use IndexedDB (browser storage)
3. **IndexedDB fail**: Fall back to localStorage (small files only)

### File References

- Files uploaded to Drive store a `driveFileId` in metadata
- Links point to `https://drive.google.com/file/d/{fileId}/view`
- Files open in Google Drive viewer (can download from there)

### P2P Sync Considerations

- Drive file IDs sync across peers via WebRTC
- Other users can see the Drive link
- **But:** They need Drive access to view the file
- **Solution:** Make files "public" or share with specific users (see Advanced section)

## Security & Privacy

### What Gets Stored Where

- **Client ID**: Visible in browser (safe - it's public)
- **Access Token**: sessionStorage (cleared when tab closes)
- **Refresh Token**: Not implemented (requires re-sign-in each session)
- **File Data**: Your Google Drive (not in browser)

### Token Lifetime

- Tokens expire after ~1 hour
- App doesn't implement refresh token handling yet
- If upload fails, sign in again

### Who Can Access Your Files?

- By default: **Only you**
- To share: Use Google Drive's sharing settings or implement public sharing (see Advanced)

## Advanced: Making Files Public

If you want uploaded files to be accessible to anyone with the link (e.g., for P2P collaborators):

### Option 1: Manual (via Drive UI)

1. Open [Google Drive](https://drive.google.com)
2. Find the uploaded file
3. Right-click → "Share"
4. Change to "Anyone with the link"
5. Set permissions (Viewer/Commenter/Editor)

### Option 2: Automatic (requires code modification)

After uploading, call the Drive Permissions API to set `type: 'anyone'`:

```javascript
await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role: 'reader', type: 'anyone' })
});
```

Add this after the `gdriveUploadFile()` call in the upload functions if you want all files public by default.

## Troubleshooting

### Error loading "Storage Intelligence" in Google Cloud Console

If you see an error like:

There was an error while loading /storage/storage-intelligence/configuration?project=...

- You do NOT need Google Cloud Storage or "Storage Intelligence" for this app. Skip that page.
- For Drive integration, only use: APIs & Services → OAuth consent screen and Credentials.
- Quick links for your project (replace project if needed):
  - [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent?project=producer-tasks)
  - [Credentials](https://console.cloud.google.com/apis/credentials?project=producer-tasks)

If you still want to access that page for unrelated reasons, try:

- Switch to the correct project at the top bar (ensure "producer-tasks")
- Ensure you have roles like Project Editor or Owner (or Storage Admin if using Storage features)
- Make sure billing is enabled on the project (some storage features require it)
- Hard refresh (Ctrl+Shift+R), then try Incognito
- Disable extensions (ad blockers, privacy filters), allow third-party cookies for console.cloud.google.com
- Clear site data for console.cloud.google.com and re-login
- Try another browser (Chrome/Edge/Firefox) or different network/VPN

### "Access blocked: Producer Tasks has not completed the Google verification process"

**This is the most common error.** It happens when:

1. **Your OAuth consent screen is in "Testing" mode AND you're not a test user**

- **Fix:** Go to OAuth consent screen → "Test users" → ADD USERS → add your email
- OR: Click "PUBLISH APP" (no verification needed for personal use)

1. **The consent screen configuration is incomplete**

- **Fix:** Make sure you filled in:
  - App name
  - User support email
  - Developer contact email
  - At least one scope (`drive.file`)

1. **Using the wrong Google account**

- **Fix:** Sign in with an account that's listed as a test user
- OR: Publish the app to allow any Google account

**Quick fix:** Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent), add your email under "Test users", and try again.

### "You must sign in to Google Drive first"

- Click "Sign in" in the Drive panel
- Paste your Client ID if not already entered
- Authorize the app

### "Drive upload failed. Falling back to IndexedDB"

- Token might be expired - sign in again
- Check browser console for specific error
- Verify Drive API is enabled in Cloud Console

### "Origin mismatch" or "redirect_uri_mismatch" error

- Your current URL (e.g., `http://localhost:8080`) must be added to "Authorized JavaScript origins" in Cloud Console
- Exact path match required: add both root and `/produce` if needed

### Files upload but don't display for other users

- Files are private to your Drive by default
- Share files manually or implement automatic public sharing (see Advanced)

### Access token expired

- Sign in again (refresh tokens not yet implemented)
- Future enhancement: implement token refresh flow

## Comparison: Drive vs IndexedDB

| Feature | Google Drive | IndexedDB |
|---------|-------------|-----------|
| **Setup Required** | Yes (OAuth Client ID) | None |
| **Storage Limit** | Your Drive quota (~15 GB free) | ~43 GB (browser-dependent) |
| **Persistence** | Cloud (survives browser clear) | Local (can be cleared) |
| **Offline Access** | No (requires internet) | Yes |
| **Cross-device** | Yes (same Google account) | No (per-browser) |
| **Sharing** | Can share/make public | Not shareable |
| **Speed** | Network-dependent | Very fast (local) |

## Recommendations

### Use Google Drive if

- You want cloud backup
- You need to access files from multiple devices
- You want to share files with collaborators
- You have stable internet connection

### Use IndexedDB (default) if

- You want zero setup
- You work offline frequently
- You want fastest performance
- Files are personal/not shared

## Future Enhancements

- Refresh token support (persistent sign-in)
- Automatic file sharing/public links
- Browse and select existing Drive files
- Resumable uploads for files >100MB
- Download from Drive to local storage option
- Drive folder organization

---

**Need help?** Check browser console for detailed error messages.
