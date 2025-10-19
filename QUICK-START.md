# Producer Tasks - Quick Start Guide

## Universal Cloud Storage

**One URL, one state, everywhere:**

```
https://taylordrew4u2.github.io/produce/
```

## First-Time Setup (One Person Does This)

1. **Open the app**

   ```
   https://taylordrew4u2.github.io/produce/
   ```

2. **Configure Filestack security** (for permanent state)
   - Click "✅ Cloud Active - Configure Security"
   - Get credentials from Filestack dashboard:
     - Go to <https://dev.filestack.com/>
     - Security → Policies
     - Create policy with: `["read", "store", "pick", "overwrite"]`
     - Copy Policy + Signature
   - Paste when prompted

3. **Make your first change**
   - Add a task, upload a file, anything
   - This creates the permanent universal cloud state
   - State is saved to Filestack with a permanent handle

4. **Share with team**
   - Click "📋 Share Link"
   - Send: `https://taylordrew4u2.github.io/produce/`
   - That's it!

## Team Member Access (Everyone Else)

1. **Open the link**

   ```
   https://taylordrew4u2.github.io/produce/
   ```

2. **That's it!**
   - App automatically loads universal cloud state
   - You see same tasks, files, lineup as everyone
   - Make changes → Saved to cloud instantly
   - Refresh to see updates from others

## How It Works

### Universal Storage Architecture

```
Everyone opens: https://taylordrew4u2.github.io/produce/
                                ↓
                    App checks for permanent state handle
                                ↓
               Loads: https://cdn.filestackcontent.com/{handle}
                                ↓
                        Gets state.json:
                        {
                          tasks: [...],
                          lineup: {...},
                          lineupFiles: {...},
                          lineupAudio: {...},
                          socialPosts: [...],
                          cloudFiles: {...}
                        }
                                ↓
                        Renders everything
```

### Making Changes

```
User adds task/file → data object updated → saveLocal() called
                                ↓
                    debouncedSaveStateToCloud (1.5s delay)
                                ↓
                If policy+signature exist: OVERWRITE permanent state
                Else: Upload new state, store new handle
                                ↓
                    Everyone has same state next refresh
```

## Key Features

### ✅ One URL

- Always share: `https://taylordrew4u2.github.io/produce/`
- No query params, no hashes
- Simple and memorable

### ✅ Permanent State

- First setup creates permanent Filestack handle
- All future saves overwrite same file
- URL never changes: `https://cdn.filestackcontent.com/{handle}`

### ✅ Universal Storage

- Tasks, lineup, files, audio, posts - all in one state
- No separate systems or storage locations
- One save, one load, one sync

### ✅ Instant Global Sync

- Change on phone → Saved to Filestack
- Open on computer → See latest state
- All devices load from same cloud state

## Common Workflows

### Adding a Task

1. Click "+ Producer Task"
2. Enter details
3. Click "Add"
4. ✅ Saved to cloud automatically

### Uploading Lineup File

1. Go to lineup position
2. Click "📎 Upload File"
3. Select file
4. ✅ Uploaded to Filestack, state updated

### Creating Social Post

1. Click "+ Social Post"
2. Select date
3. Add caption
4. Upload image (optional)
5. Click "Add"
6. ✅ Saved to cloud automatically

### Viewing on Another Device

1. Open: `https://taylordrew4u2.github.io/produce/`
2. ✅ Loads latest state automatically
3. See all tasks, files, posts

## Troubleshooting

### "No universal cloud state found"

**First time using app:**

- Expected! Click "Configure Security" and add policy/signature
- Make any change to create state

**After setup:**

- Check browser console for errors
- Verify policy/signature are still valid
- Try clearing browser cache and reloading

### Changes not syncing between devices

**Solution:**

- Refresh the page to load latest state
- Check that all devices are using same URL
- Verify network connection

### "Overwrite failed, falling back to new upload"

**Cause:** Policy/signature missing or expired

**Fix:**

1. Click "Configure Security"
2. Enter valid policy + signature
3. Make a change to create new permanent state

### Files not loading

**Check:**

- Are file URLs Filestack CDN links? (Should be `https://cdn.filestackcontent.com/...`)
- Is network connected?
- Are Filestack CDN links accessible?

## Best Practices

### ✅ DO

- Configure policy/signature on first setup
- Share the simple URL: `https://taylordrew4u2.github.io/produce/`
- Refresh page to see updates from others
- Wait 1-2 seconds after making changes (debounced save)

### ❌ DON'T

- Share URLs with query params or hashes
- Expect real-time sync (need to refresh for updates)
- Make rapid changes without waiting for saves
- Use multiple Filestack accounts (everyone uses same state)

## Data Storage Locations

### Cloud (Filestack CDN)

**Everything stored here:**

- Tasks
- Personal lists
- Lineup
- Lineup files (images/PDFs)
- Lineup audio (MP3s)
- Social posts (with image URLs)
- Staff assignments
- File registry

### Local (Browser localStorage)

**Config only - NOT synced:**

- Filestack API key
- Filestack policy
- Filestack signature
- State handle (for permanent URL)
- Storage ID (device identifier)

## Technical Details

### State File

- **Location**: `https://cdn.filestackcontent.com/{handle}`
- **Format**: JSON
- **Size**: Typically < 1 MB
- **Updates**: Overwritten on every change (with policy/signature)

### File Assets

- **Storage**: Filestack CDN
- **URLs**: Stored in state.json
- **Access**: Direct CDN links (globally cached)

### Save Timing

- **Debounce**: 1.5 seconds
- **Purpose**: Prevent excessive uploads
- **Behavior**: Last change in 1.5s window is saved

## Support

### Check Console

```javascript
// Open browser DevTools (F12) → Console
// Look for messages:
"✅ Loaded universal cloud state from Filestack"
"☁️ Universal state overwritten at permanent URL"
```

### View Current State

```javascript
// In browser console:
console.log(JSON.stringify(data, null, 2))
```

### Check Storage Config

```javascript
// In browser console:
console.log({
  handle: localStorage.getItem('stateHandle'),
  policy: localStorage.getItem('filestackPolicy')?.substring(0, 20) + '...',
  signature: localStorage.getItem('filestackSignature')?.substring(0, 20) + '...'
})
```

## Advanced

### Manual State URL Override

If you need to load a specific state (migration, testing):

```
https://taylordrew4u2.github.io/produce/?state=<url>
```

App will load from URL param if no permanent handle exists.

### Force New State

To start fresh:

1. Open browser DevTools (F12) → Console
2. Run: `localStorage.clear()`
3. Reload page
4. Configure security and create new state

### Export State

```javascript
// In browser console:
const json = JSON.stringify(data, null, 2)
const blob = new Blob([json], {type: 'application/json'})
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'producer-state.json'
a.click()
```

## Summary

**One URL to rule them all:**

```
https://taylordrew4u2.github.io/produce/
```

- ✅ Universal cloud storage
- ✅ Permanent state handle
- ✅ Instant global sync
- ✅ One save, one load, one system

Share the link, everyone sees the same data. Simple! 🎉
