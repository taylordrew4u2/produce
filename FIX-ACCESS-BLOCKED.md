# 🚨 FIX: "Access blocked: Producer Tasks" Error

## The Problem

When you try to sign in with Google Drive, you see:

```
Access blocked: Producer Tasks has not completed the Google verification process
```

## The Solution (2 minutes)

### Option 1: Add Yourself as a Test User (Quickest)

1. Go to [Google Cloud Console - OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)

2. Look for the **"Test users"** section (scroll down if needed)

3. Click **"+ ADD USERS"**

4. Enter your Google email address (the one you're trying to sign in with)

5. Click **"SAVE"**

6. **Try signing in again** - it should work now!

### Option 2: Publish the App (For Multiple Users)

If you want anyone to be able to sign in (not just test users):

1. Go to [Google Cloud Console - OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)

2. Look for the **Publishing status** section at the top

3. Click **"PUBLISH APP"**

4. Confirm the dialog

5. **Note:** For personal use with the `drive.file` scope (only access to files created by the app), Google doesn't require verification. Your app can go live immediately.

## Why This Happens

- By default, OAuth apps are in "Testing" mode
- In Testing mode, **only test users** can sign in
- You forgot to add yourself as a test user during setup
- Solution: Add yourself, or publish the app

## Verify Your Setup

After adding yourself as a test user, check these settings:

### OAuth Consent Screen Checklist

- ✅ App name: "Producer Tasks" (or similar)
- ✅ User support email: your email
- ✅ Developer contact email: your email  
- ✅ Scopes: `https://www.googleapis.com/auth/drive.file` added
- ✅ **Test users: YOUR EMAIL ADDED** ← Most important!
- ✅ Save changes

### OAuth Client ID Checklist

- ✅ Application type: Web application
- ✅ Authorized JavaScript origins:
  - `http://localhost:8080`
  - `https://taylordrew4u2.github.io`
- ✅ Authorized redirect URIs:
  - `http://localhost:8080`
  - `https://taylordrew4u2.github.io/produce`

## Test It

1. Copy your **Client ID** from the Credentials page
2. Go back to the app at <http://localhost:8080>
3. Paste the Client ID into the Drive panel
4. Click **"Sign in"**
5. You should see the Google authorization screen (NOT the blocked error)
6. Click **"Allow"**
7. You'll be redirected back with "Signed in" status

## Still Not Working?

### Clear Browser State

```bash
# In browser console (F12)
sessionStorage.clear()
localStorage.clear()
location.reload()
```

### Double-Check the URL

- Make sure you're testing on exactly `http://localhost:8080` (no trailing slash)
- If you're on a different URL, add it to "Authorized JavaScript origins"

### Use Incognito/Private Window

- Sometimes cached auth state causes issues
- Open <http://localhost:8080> in an incognito window
- Try signing in fresh

### 🚨 REDIRECT_URI_MISMATCH (Error 400) - Most Common Issue

**You're seeing:** "Error 400: redirect_uri_mismatch"

**The problem:** Your current URL doesn't match the configured redirect URIs in Google Cloud Console.

**Quick fix:**

1. **Check your current URL** - You're probably at `http://localhost:8080` (note: NO trailing slash)

2. **Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)**

3. **Edit your Web OAuth client** - Click the pencil icon next to your OAuth 2.0 Client ID

4. **Fix the redirect URIs** - Make sure these EXACT URLs are listed:
   - `http://localhost:8080` (for local testing - NO trailing slash)
   - `https://taylordrew4u2.github.io/produce` (for GitHub Pages)

5. **Also check JavaScript origins** - Should include:
   - `http://localhost:8080` (NO trailing slash)
   - `https://taylordrew4u2.github.io`

6. **Save** and try signing in again

**Common mistakes:**

- Having `http://localhost:8080/` (with trailing slash) instead of `http://localhost:8080`
- Having `https://` when you need `http://` for localhost
- Typos in the URLs

### Check the Specific Error

Open browser console (F12) and look for detailed error messages. Common ones:

- `"redirect_uri_mismatch"` → Your current URL isn't in "Authorized redirect URIs" (see fix above)
- `"access_denied"` → You clicked "Cancel" instead of "Allow"
- `"invalid_client"` → Client ID is wrong or doesn't match the project

---

**TL;DR:** Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) → scroll to "Test users" → ADD USERS → enter your email → SAVE → try again. Done! ✅
