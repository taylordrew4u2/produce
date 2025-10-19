# Universal Cloud Storage Architecture

## Overview

The Producer Tasks app uses a **single unified storage system** where **everything** is stored in one place:

```
☁️ Filestack CDN
  └── state.json (single source of truth)
      ├── tasks[]
      ├── personalTasks[]
      ├── lineup{}
      ├── lineupFiles{}      ← Filestack URLs
      ├── lineupAudio{}      ← Filestack URLs
      ├── staff{}
      ├── socialPosts[]      ← Filestack URLs
      └── cloudFiles{}       ← Filestack URLs registry
```

## The Universal `data` Object

**One object, one storage location, one sync mechanism:**

```javascript
let data = {
    tasks: [],              // Producer tasks
    personalTasks: [],      // Taylor/Jay personal lists
    lineup: {},             // Show lineup (positions 1-5)
    lineupFiles: {},        // Lineup files (images/PDFs) - Filestack URLs
    lineupAudio: {},        // Lineup audio (MP3s) - Filestack URLs
    staff: {},              // Staff assignments
    socialPosts: [],        // Social media calendar - Filestack URLs
    cloudFiles: {}          // All uploaded files registry - Filestack URLs
}
```

### How It Works

1. **Upload a file** (drag-drop, lineup file, audio, social post):
   - File uploaded to Filestack CDN
   - Filestack returns `{url, handle}`
   - URL stored in appropriate `data` property
   - Handle stored for future overwrites
   - Entire `data` object saved to cloud

2. **Make any change** (add task, edit lineup, upload file):
   - Change made to `data` object in memory
   - `saveLocal()` called
   - `debouncedSaveStateToCloud()` triggered
   - Entire `data` object uploaded to Filestack as JSON
   - If policy/signature exist, overwrites permanent URL

3. **Load on any device**:
   - Open app with `?state=<url>` or stored handle
   - Fetch `state.json` from Filestack
   - Parse JSON → populate `data` object
   - Render all UI from `data`
   - All file URLs are Filestack CDN links

## Storage Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   User Action                            │
│  (Upload file, add task, edit lineup, create post)      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Update `data` Object                        │
│  data.tasks.push(...) / data.lineupFiles[1] = {...}     │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              saveLocal() Called                          │
│         (no localStorage, cloud only)                    │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│      debouncedSaveStateToCloud() (1.5s delay)           │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│         saveStateToCloud()                               │
│  1. JSON.stringify(data)                                 │
│  2. If policy+signature+handle exist: OVERWRITE          │
│  3. Else: Upload new file, store new handle             │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│            Filestack CDN Storage                         │
│  https://cdn.filestackcontent.com/{handle}              │
│  {                                                       │
│    tasks: [...],                                         │
│    lineupFiles: { 1: {url, handle, name, size} },       │
│    lineupAudio: { 2: {url, handle, name, size} },       │
│    socialPosts: [{url, caption, date}],                 │
│    cloudFiles: { file123: {url, handle, name} }         │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
```

## Key Benefits

### 1. Single Source of Truth

- **No conflicts** between multiple storage systems
- **No sync issues** between localStorage and cloud
- **No orphaned files** - everything in one JSON state

### 2. Instant Global Sync

- Change on phone → Saved to Filestack → Load on computer
- All devices read from same `state.json` URL
- File URLs are permanent Filestack CDN links

### 3. Simple Architecture

```javascript
// OLD (before universal storage):
localStorage.setItem('tasks', JSON.stringify(tasks))
localStorage.setItem('lineup', JSON.stringify(lineup))
localStorage.setItem('cloudFiles', JSON.stringify(cloudFiles))
IndexedDB.put('lineupFiles', file)
IndexedDB.put('socialPosts', file)
// Result: 5+ storage locations, complex sync logic

// NEW (universal storage):
data.tasks.push(newTask)
saveLocal() // → uploads entire `data` to Filestack
// Result: 1 storage location, instant global sync
```

### 4. File + Metadata Together

```javascript
// Upload lineup audio
const res = await filestackClient.upload(file)
data.lineupAudio[position] = {
    name: file.name,
    url: res.url,           // Filestack CDN link
    filestackHandle: res.handle,
    size: file.size
}
saveLocal() // Entire state saved to cloud

// Later, on any device:
const audio = data.lineupAudio[1]
audioEl.src = audio.url  // Load from Filestack CDN
```

## Storage Locations

### Config Only (localStorage)

These are NOT synced, device-specific:

- `filestackApiKey` - User's Filestack key
- `filestackPolicy` - Security policy for overwrites
- `filestackSignature` - Security signature
- `stateHandle` - Permanent state file handle
- `stateCloudUrl` - Last known state URL
- `cloudStorageId` - Device identifier

### Universal State (Filestack CDN)

Everything else stored in `data` object:

- All tasks, lineup, posts, staff
- All file URLs (lineup files, audio, social media)
- All file metadata (names, sizes, handles)

## Code Patterns

### Adding a Task

```javascript
data.tasks.push({
    id: Date.now(),
    title: 'New task',
    category: 'Production',
    completed: false
})
saveLocal() // → Cloud upload triggered
```

### Uploading Lineup File

```javascript
const res = await filestackClient.upload(file)
data.lineupFiles[position] = {
    name: file.name,
    type: file.type,
    url: res.url,
    filestackHandle: res.handle
}
saveLocal() // → Cloud upload triggered
```

### Creating Social Post with Image

```javascript
const res = await filestackClient.upload(imageFile)
data.socialPosts.push({
    id: `post-${Date.now()}`,
    date: selectedDate,
    caption: caption,
    url: res.url,           // Filestack CDN
    type: 'image'
})
saveLocal() // → Cloud upload triggered
```

### Viewing All Files

```javascript
// All files tracked in data.cloudFiles
const files = Object.values(data.cloudFiles || {})
files.forEach(file => {
    console.log(file.fileName, file.url, file.size)
})
```

## Migration from Multiple Storage Systems

**Before (fragmented):**

- Tasks → localStorage
- Lineup metadata → localStorage
- Lineup files → IndexedDB
- Social posts → localStorage + IndexedDB
- Cloud files → separate `cloudFiles` object in localStorage

**After (unified):**

- **Everything** → `data` object → Filestack `state.json`
- File assets → Filestack CDN (URLs in state)
- No IndexedDB, no fragmented localStorage

## Performance

### Upload Sizes

- **State JSON**: Typically < 1 MB (metadata + URLs)
- **File assets**: Stored separately on Filestack CDN
- **Debounced saves**: 1.5s delay prevents excessive uploads

### Load Times

- **Initial load**: One fetch for `state.json` (~100-500 KB)
- **File display**: Direct Filestack CDN links (globally cached)
- **No IndexedDB queries**: Instant rendering from memory

## Troubleshooting

### "No cloud state URL found"

**Cause**: First time opening app, no state created yet  
**Fix**: Make any change (add task, upload file) to create state

### "Overwrite failed, falling back to new upload"

**Cause**: Policy/signature missing or expired  
**Fix**: Click "Cloud Active - Configure Security", enter valid policy/signature

### Files not syncing between devices

**Cause**: Different state URLs on each device  
**Fix**: Use "Share link" to copy URL with `?state=...`, open on all devices

### State size too large

**Cause**: Embedding large files in state (should never happen now)  
**Fix**: Verify files are uploaded to Filestack CDN, not embedded as data URLs

## API Reference

### `data` (global object)

Universal state object containing all app data

### `saveLocal()`

Triggers debounced cloud save (no local storage)

### `saveStateToCloud()`

Uploads `data` to Filestack as JSON, overwrites if policy/signature exist

### `loadStateFromCloudIfAvailable()`

Loads `data` from Filestack on app startup

### `uploadFileToCloud(fileId, fileData, fileName, fileType)`

Uploads file to Filestack, stores reference in `data.cloudFiles[fileId]`

### `viewCloudFiles()`

Shows all files tracked in `data.cloudFiles`

## Best Practices

1. **Always use `saveLocal()` after changing `data`**

   ```javascript
   data.tasks.push(newTask)
   saveLocal() // ✅ Cloud save triggered
   ```

2. **Store file URLs, not data URLs**

   ```javascript
   // ❌ BAD
   data.lineupFiles[1] = { url: 'data:image/jpeg;base64,...' }
   
   // ✅ GOOD
   const res = await filestackClient.upload(file)
   data.lineupFiles[1] = { url: res.url }
   ```

3. **Use permanent state URLs**
   - Configure policy/signature once
   - Same URL forever
   - Share link always points to latest state

4. **Check `data` structure on load**

   ```javascript
   if (!data.cloudFiles) data.cloudFiles = {}
   if (!data.tasks) data.tasks = []
   ```

## Future Enhancements

- [ ] Real-time sync via WebSocket (push updates without refresh)
- [ ] Conflict resolution (if multiple users edit simultaneously)
- [ ] Version history (track state changes over time)
- [ ] Selective sync (only download changed sections)
- [ ] Offline queue (store changes when offline, sync when online)
