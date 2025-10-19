# Cloud-Only Storage Mode

## Overview

The Producer Tasks app now operates in **100% cloud-only mode** with **zero local storage** for data. All files, tasks, lineup info, and app state are stored exclusively on Filestack CDN.

## Key Changes

### ❌ What's Removed

- ~~localStorage data persistence~~ (only used for config now)
- ~~IndexedDB file storage~~
- ~~Local fallback mode~~
- ~~"Enable Cloud Storage" button~~ (now "Configure Security")

### ✅ What's New

- **Auto-enabled cloud storage** - Filestack initialized on app load
- **Permanent state URLs** - Single URL stays consistent across all saves (with policy/signature)
- **Cloud-first loading** - App loads state from `?state=<url>` or stored handle
- **Immediate cloud sync** - Every change saves to cloud within 1.5s (debounced)
- **No local caching** - Everything fetched fresh from Filestack CDN

## How It Works

### First Time Setup

1. **App loads** → Auto-initializes Filestack client
2. **Click "Cloud Active - Configure Security"**
3. **Enter Filestack policy + signature** (for permanent URLs)
4. **Make a change** → State uploaded to cloud
5. **Share the link** → Contains `?state=<permanent-url>`

### On Every Device

1. Open shared link: `https://taylordrew4u2.github.io/produce/?state=<url>`
2. App fetches state from Filestack CDN
3. All files (MP3s, images, lineup files) load from cloud URLs
4. Any change immediately overwrites the permanent cloud state
5. All connected devices see updates via:
   - Cloud state URL (loads on refresh)
   - PeerJS live sync (real-time updates)

## Storage Architecture

### Config Only (localStorage)

- `filestackApiKey` - Your API key
- `filestackPolicy` - Security policy for overwrites
- `filestackSignature` - Security signature
- `stateHandle` - Permanent state file handle
- `cloudStorageId` - Unique instance ID
- `cloudFiles` - File metadata index

### Everything Else (Filestack CDN)

- **App State** → `state.json` (permanent URL via overwrite)
- **Lineup Files** → Individual files with handles
- **Lineup Audio** → MP3s with handles
- **Social Posts** → Images/videos with handles
- **Dropped Files** → Any drag-and-drop uploads

## Filestack Configuration

### Get Security Credentials

1. Log in to [Filestack Dashboard](https://dev.filestack.com/)
2. Navigate to **Security** → **Policies**
3. Create new policy with permissions:

   ```json
   {
     "expiry": 2147483647,
     "call": ["read", "store", "pick", "overwrite"]
   }
   ```

4. Copy the generated **Policy** and **Signature**
5. Paste them when prompted in the app

### Without Policy/Signature

- App still works but creates a **new URL on every save**
- Share link will rotate
- Not recommended for production use

## File Upload Flow

### Before (Local + Cloud Hybrid)

```
User uploads file
  ↓
Save to IndexedDB
  ↓
Upload to Filestack (if enabled)
  ↓
Store reference in localStorage
```

### Now (Cloud-Only)

```
User uploads file
  ↓
Upload directly to Filestack
  ↓
Store handle + URL in app state
  ↓
Save state to cloud (permanent overwrite)
  ↓
Broadcast to peers
```

## API Endpoints Used

### Filestack CDN

- **Upload**: `POST` via Filestack JS SDK
- **Overwrite**: `POST https://cdn.filestackcontent.com/overwrite/{handle}?policy=...&signature=...`
- **Read**: `GET https://cdn.filestackcontent.com/{handle}`

### State Sync

- **Save**: Overwrite `state.json` at permanent handle (or upload new if no credentials)
- **Load**: Fetch from `?state=` param or stored `stateHandle`
- **Share**: URL includes `?state=` for instant global access

## Troubleshooting

### "Changes will not be saved" warning

- **Cause**: Filestack client not initialized
- **Fix**: Click "Cloud Active - Configure Security" button

### New URL on every save

- **Cause**: Missing policy/signature
- **Fix**: Add Filestack security credentials via button

### Files not appearing on other devices

- **Cause**: Not using shared `?state=` URL
- **Fix**: Copy and share the link from "Share link" button

### State not loading

- **Cause**: Invalid or expired state URL
- **Fix**: Clear localStorage, refresh, reconfigure security

## Migration from Old Version

If you have existing data in localStorage:

1. **Export current state**:

   ```javascript
   // In browser console
   const old = JSON.parse(localStorage.getItem('producerTasks'));
   console.log(JSON.stringify(old, null, 2));
   ```

2. **Click "Cloud Active - Configure Security"**

3. **Import manually**: Copy old tasks/lineup/posts into new cloud state

4. **Clear old data** (optional):

   ```javascript
   localStorage.removeItem('producerTasks');
   ```

## Performance

- ✅ **First load**: ~1-2s (fetches state from Filestack CDN)
- ✅ **Saves**: Debounced 1.5s (prevents excessive uploads)
- ✅ **File uploads**: Direct to Filestack with progress tracking
- ✅ **File downloads**: CDN-cached URLs (instant)

## Benefits

1. **No sync conflicts** - Single source of truth in cloud
2. **Instant global access** - Share one URL, everyone sees same state
3. **No storage limits** - Filestack handles unlimited files
4. **Device-agnostic** - Works on phone, tablet, computer
5. **No data loss** - Permanent cloud backup
6. **Fast CDN delivery** - Files served from nearest edge location

## Limitations

- Requires Filestack account (free tier available)
- Requires internet connection (no offline mode)
- Requires security credentials for permanent URLs

## Live URL

**Production**: <https://taylordrew4u2.github.io/produce/>

Share links include state: `https://taylordrew4u2.github.io/produce/?state=https://cdn.filestackcontent.com/{handle}`
