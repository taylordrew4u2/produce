# Storage Architecture - Where Everything Lives

## 🌐 PERMANENT CLOUD STORAGE (Filestack CDN)

**ALL application data is stored here permanently:**

### Location

```
https://cdn.filestackcontent.com/{handle}
```

### What's Stored (state.json)

```json
{
  "tasks": [...],              // All producer tasks
  "personalTasks": [...],      // Taylor/Jay personal lists
  "lineup": {...},             // Show lineup (positions 1-5)
  "lineupFiles": {             // Lineup files metadata + Filestack URLs
    "1": {
      "name": "performer-photo.jpg",
      "url": "https://cdn.filestackcontent.com/abc123...",
      "filestackHandle": "abc123",
      "size": 524288
    }
  },
  "lineupAudio": {             // Audio files metadata + Filestack URLs
    "2": {
      "name": "intro-music.mp3",
      "url": "https://cdn.filestackcontent.com/xyz789...",
      "filestackHandle": "xyz789",
      "size": 3145728
    }
  },
  "staff": {...},              // Staff assignments
  "socialPosts": [             // Social calendar with Filestack URLs
    {
      "id": "post-123",
      "date": "2025-11-15",
      "caption": "Show tonight!",
      "url": "https://cdn.filestackcontent.com/def456...",
      "type": "image"
    }
  ],
  "cloudFiles": {              // All uploaded files registry
    "file-abc": {
      "fileName": "promo-video.mp4",
      "url": "https://cdn.filestackcontent.com/ghi789...",
      "filestackHandle": "ghi789",
      "size": 10485760,
      "uploadedAt": "2025-10-19T12:34:56.789Z"
    }
  }
}
```

### File Assets

All actual files (images, audio, video, PDFs) are stored on Filestack CDN:

```
https://cdn.filestackcontent.com/abc123   ← performer-photo.jpg
https://cdn.filestackcontent.com/xyz789   ← intro-music.mp3
https://cdn.filestackcontent.com/def456   ← social-post-image.jpg
https://cdn.filestackcontent.com/ghi789   ← promo-video.mp4
```

### Overwrite Mechanism

With policy/signature configured:

```
POST https://cdn.filestackcontent.com/overwrite/{handle}
?policy=<base64-policy>
&signature=<signature>

Body: <updated-state.json>
```

Result: **Same URL forever**, always latest data

---

## 💾 LOCAL STORAGE (Browser localStorage)

**ONLY configuration and pointers - NO DATA:**

### What's Stored

```javascript
{
  // Filestack credentials (config only)
  "filestackApiKey": "AzKRRFVGmS8CIpDqn6r8Bz",
  "filestackPolicy": "eyJ...",        // Security policy for overwrites
  "filestackSignature": "a1b2c3...",  // Signature for overwrites
  
  // Cloud state pointers (URLs to cloud data)
  "stateHandle": "def456xyz789",      // Permanent handle for state.json
  "stateCloudUrl": "https://cdn.filestackcontent.com/def456xyz789",
  
  // Device identifier (not synced)
  "cloudStorageId": "prod_abc123_1729347600000"
}
```

### What's NOT Stored

- ❌ Tasks
- ❌ Lineup
- ❌ Files
- ❌ Audio
- ❌ Social posts
- ❌ Any application data

### Why Use localStorage at All?

1. **Remember cloud URL** - Don't ask user for URL every time
2. **Store credentials** - Filestack policy/signature for overwrites
3. **Device config** - API keys, device ID (device-specific)

---

## 📊 Storage Flow Diagram

### Save Flow

```
User adds task
      ↓
data.tasks.push({...})
      ↓
saveLocal() called
      ↓
debouncedSaveStateToCloud() (1.5s delay)
      ↓
saveStateToCloud()
      ↓
JSON.stringify(data)
      ↓
If policy + signature + handle exist:
  → POST to overwrite/{handle}
  → Same URL forever: https://cdn.filestackcontent.com/{handle}
  → localStorage.setItem('stateCloudUrl', url)  ← Only pointer stored locally
Else:
  → Upload new file
  → Get new URL + handle
  → localStorage.setItem('stateHandle', handle)  ← Only pointer stored locally
      ↓
✅ Data permanently stored on Filestack CDN
```

### Load Flow

```
App starts
      ↓
loadStateFromCloudIfAvailable()
      ↓
handle = localStorage.getItem('stateHandle')  ← Get pointer
      ↓
url = `https://cdn.filestackcontent.com/${handle}`
      ↓
fetch(url) → Get state.json from Filestack CDN
      ↓
data = JSON.parse(response)
      ↓
✅ All data loaded from cloud
```

### File Upload Flow

```
User uploads lineup MP3
      ↓
filestackClient.upload(file)
      ↓
Filestack CDN stores file
      ↓
Returns: { url: "https://cdn.filestackcontent.com/xyz789", handle: "xyz789" }
      ↓
data.lineupAudio[position] = { url, handle, name, size }
      ↓
saveLocal() → Triggers cloud state save
      ↓
✅ File on Filestack CDN
✅ Metadata in state.json on Filestack CDN
```

---

## 🔄 Multi-Device Sync

### Device A

```
1. Open https://taylordrew4u2.github.io/produce/
2. localStorage.getItem('stateHandle') → "abc123"
3. Load from https://cdn.filestackcontent.com/abc123
4. Add task
5. Upload to https://cdn.filestackcontent.com/abc123 (overwrite)
```

### Device B

```
1. Open https://taylordrew4u2.github.io/produce/
2. localStorage.getItem('stateHandle') → "abc123"
3. Load from https://cdn.filestackcontent.com/abc123
4. ✅ Sees same data as Device A
```

### First-Time Device C

```
1. Open https://taylordrew4u2.github.io/produce/?state=https://cdn.filestackcontent.com/abc123
2. No local handle, uses URL param
3. Load from https://cdn.filestackcontent.com/abc123
4. localStorage.setItem('stateHandle', 'abc123')
5. ✅ Now synced with all other devices
```

---

## 🔒 Security & Persistence

### Filestack Policy

Stored in localStorage, used for overwrites:

```json
{
  "expiry": 1735689600,
  "call": ["read", "store", "pick", "overwrite"],
  "handle": "*"
}
```

### Why This Matters

- **Without policy/signature**: Each save creates NEW file (new URL)
- **With policy/signature**: Each save OVERWRITES same file (permanent URL)

### Data Persistence

- ✅ **Filestack CDN**: Permanent, globally distributed, backed up
- ❌ **localStorage**: Can be cleared by browser, device-specific only

---

## 📈 Storage Size Comparison

### Typical Usage

| Data Type | Size | Location |
|-----------|------|----------|
| state.json | ~500 KB | Filestack CDN |
| Lineup photos (5) | ~2 MB | Filestack CDN |
| Audio files (3) | ~9 MB | Filestack CDN |
| Social post images (15) | ~15 MB | Filestack CDN |
| **Total cloud** | **~26.5 MB** | **Filestack CDN** |
| **Total local** | **~2 KB** | **localStorage (pointers only)** |

### What This Means

- 📦 **99.99%** of data on Filestack CDN (permanent cloud)
- 💾 **0.01%** config/pointers in localStorage (device-specific)

---

## ✅ Verification

### Check Where Data Lives

1. **Open browser DevTools** (F12)
2. **Console**:

```javascript
// Check local storage (should be ONLY config)
console.log('LOCAL STORAGE:');
Object.keys(localStorage).forEach(key => {
  const size = localStorage.getItem(key).length;
  console.log(`${key}: ${size} bytes`);
});

// Check cloud state size
console.log('\nCLOUD STATE:');
const stateSize = new Blob([JSON.stringify(data)]).size;
console.log(`data object: ${stateSize} bytes (${(stateSize/1024/1024).toFixed(2)} MB)`);
console.log(`Stored at: ${localStorage.getItem('stateCloudUrl')}`);
```

3. **Network tab**:
   - Reload page
   - Look for: `cdn.filestackcontent.com/{handle}` request
   - This is loading your permanent cloud state

---

## 🎯 Summary

### Permanent Cloud Storage (Filestack CDN)

✅ All tasks, lineup, files, audio, posts  
✅ Globally accessible  
✅ Permanent URLs  
✅ Backed up and distributed  
✅ No device-specific limitations  

### Local Storage (localStorage)

✅ Only config and pointers  
✅ Remembers cloud URL  
✅ Stores credentials  
✅ Device-specific only  
❌ NO application data  

### The Key Insight

```
localStorage.getItem('stateHandle') 
  → Returns: "abc123"
  → This is a POINTER to cloud data
  → NOT the data itself

Actual data lives at:
  → https://cdn.filestackcontent.com/abc123
  → Permanent cloud storage on Filestack CDN
```

**Everything is in the cloud. localStorage just remembers where to find it.**
