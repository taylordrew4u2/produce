# 🎤 Producer Tasks - Instant Collaboration# 🎤 Producer Tasks - Instant Collaboration# 🎤 Producer Tasks

A **single-file vanilla JavaScript app** for real-time comedy show production management with **offline change tracking**. Zero setup, works offline, syncs when reconnected.A **single-file vanilla JavaScript app** for real-time comedy show production management. Zero setup, works offline, syncs instantly across devices.**Zero-config P2P task manager for comedy show producers**

**Live Demo:** [https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)**Live Demo:** [https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)Live at: **<https://taylordrew4u2.github.io/produce/>**

## ✨ New: Offline Change Tracking## ✨ Features## 🚀 Features

### 🔄 How Offline Sync Works### 🔄 Real-Time Collaboration- 🔄 **Real-time P2P Sync**: Collaborate instantly via WebRTC - no server needed

- **Work offline** → All changes tracked automatically

- **Come back online** → Pending changes sync instantly with team  - **WebRTC P2P sync** via PeerJS - no servers needed- 💾 **Offline First**: Works completely offline with localStorage

- **Visual indicators** → See exactly what needs to sync

- **Smart merging** → Newest changes win, no conflicts- Share URL with team → changes sync instantly- 🔗 **Room Codes**: Share a room code to sync with team members

### 📊 Sync Status Indicators- Works completely offline when solo- � **Task Management**: Create, assign, and track tasks by category

- **📝 X pending syncs** → Changes waiting to sync with team

- **✅ Synced X changes** → Confirmation when offline changes are sent- 📅 **Social Media Calendar**: Schedule posts with Instagram helper

- **Solo/Connected** → Current collaboration status

### 📋 Production Management- 🎭 **Show Lineup**: Manage comedian positions 1-5

### 💾 What Gets Tracked Offline

- ✅ **Task changes** → New tasks, completions, deletions- **Task tracking** with categories and assignments- � **Personal Lists**: Separate task lists for Taylor & Jay

- ✅ **Lineup updates** → Comedian positions and details  

- ✅ **Social media posts** → New posts, scheduling changes- **Comedy lineup** management (5 positions with files/audio)- 👥 **Staff Management**: Track team member assignments

- ✅ **Personal task lists** → Taylor & Jay individual tasks

- **Social media calendar** with post scheduling- 📱 **Mobile-Friendly**: Works on all devices, no installation required

## 🚀 Features

- **Personal task lists** for Taylor & Jay

### 🔄 Real-Time Collaboration

- **WebRTC P2P sync** via PeerJS - no servers needed## 🎯 How It Works

- **Offline change tracking** - see what syncs when reconnected

- Share URL with team → changes sync instantly### 💾 Local File Management

- Works completely offline when solo

- **1GB+ storage** via IndexedDB (no quotas!)1. Open <https://taylordrew4u2.github.io/produce/>

### 📋 Production Management

- **Task tracking** with categories and assignments- **Large file support** - videos up to 100MB, images up to 20MB2. Share your room code with team members

- **Comedy lineup** management (5 positions with files/audio)

- **Social media calendar** with post scheduling- **Drag & drop uploads** - just drop files to save them3. Everyone with the same room code sees live updates

- **Personal task lists** for Taylor & Jay

- **Complete offline backup** - export all data + files4. Everything saves to localStorage automatically

### 💾 Local File Management

- **1GB+ storage** via IndexedDB (no quotas!)- **Individual file downloads** - access any stored file5. No login, no backend, no configuration needed

- **Large file support** - videos up to 100MB, images up to 20MB

- **Drag & drop uploads** - just drop files to save them### 📅 Social Media Tools## �️ Tech Stack

- **Complete offline backup** - export all data + files

- **Individual file downloads** - access any stored file- **Visual calendar** with post counts and scheduling

### 📅 Social Media Tools- **File attachments** for images and videos- **Vanilla JavaScript** - No framework bloat

- **Visual calendar** with post counts and scheduling

- **File attachments** for images and videos- **Instagram schedule helper** - pre-populates 11 strategic posts- **PeerJS** - WebRTC for P2P real-time sync

- **Instagram schedule helper** - pre-populates 11 strategic posts

- **Separate captions** - write detailed post content- **Separate captions** - write detailed post content- **localStorage** - Offline persistence

## 🎯 Offline Workflow Example- **GitHub Pages** - Free static hosting

### Working Offline## 🚀 Quick Start- **Tailwind CSS** - Utility-first styling

1. **Lose internet connection** → App continues working normally

2. **Make changes** → Tasks, lineup updates, new social posts### Option 1: Use Live Version## � Development

3. **See pending indicator** → "📝 3 pending syncs" appears in header

4. **Click "View"** → See exactly what changed while offline1. Go to **[https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)**

### Coming Back Online2. Share the URL with your team```bash

1. **Reconnect to internet** → App detects connection

2. **Join team room** → Other contributors connect3. Start collaborating instantly!# Generate PWA icons (optional)

3. **Auto-sync** → All offline changes broadcast automatically  

4. **Success notification** → "✅ Synced 3 offline changes with team"npm install

5. **Clean state** → Pending indicator disappears

### Option 2: Run Locallynpm run icons

### Team Member Perspective

1. **See live updates** → Offline changes appear in real-time```bash

2. **No conflicts** → Smart merging handles simultaneous edits

3. **Full context** → All changes include timestamps and descriptions# Clone the repository# Deploy - just push to main branch

## 📖 How It Worksgit clone <https://github.com/taylordrew4u2/produce.gitgit> push origin main

### Real-Time Sync + Offline Detectioncd produce```

- **PeerJS WebRTC** handles peer-to-peer connections

- **Automatic offline detection** using `navigator.onLine` + connection count

- **Change tracking** stores what changed while disconnected

- **Smart sync** broadcasts pending changes when reconnected# Serve the single HTML fileGitHub Actions automatically deploys `index.html` to GitHub Pages.

### Offline Change Detectionpython3 -m http.server 8080

```javascript

// Track changes when offline or no peers connected# OR use any web server (nginx, Apache, etc.)## 🔒 Privacy

function trackOfflineChange(type, itemId) {

  if (!isOnline || connections.length === 0) {

    offlineChanges[changeKey] = {

      type: 'tasks',# Open in browserAll data stays in your browser's localStorage. P2P sync uses WebRTC relay servers only for connection establishment - no data is stored on servers.

      itemId: '123', 

      timestamp: Date.now(),open http://localhost:8080

      description: 'Updated task 123'

    }```## 📄 License

  }

}



// Auto-sync when reconnected## 📖 How It WorksMIT

peer.on('connection', () => {

  if (Object.keys(offlineChanges).length > 0) {

    broadcast(null, 'offline-sync')### Real-Time Sync

    showSyncNotification()- **PeerJS WebRTC** handles peer-to-peer connections

  }- **Room codes** stored in localStorage for persistence

})- **Metadata sync** - task updates broadcast to all peers

```- **File references** shared, not the files themselves



### Storage Architecture### Storage Architecture

``````

┌─ localStorage ─────────────────┐    ┌─ IndexedDB ──────────────┐

│ • Tasks & assignments          │    │ • Large files (>50KB)   │┌─ localStorage ─────────────────┐    ┌─ IndexedDB ──────────────┐

│ • Lineup text & metadata       │    │ • Images, videos, audio  ││ • Tasks & assignments          │    │ • Large files (>50KB)   │

│ • Social media post refs       │    │ • File ID references     ││ • Lineup text & metadata       │    │ • Images, videos, audio  │

│ • Room ID & peer info          │    │ • Up to 1GB+ capacity   ││ • Social media post refs       │    │ • File ID references     │

│ • Offline change tracking      │    │ • Offline file changes   ││ • Room ID & peer info          │    │ • Up to 1GB+ capacity   │

└────────────────────────────────┘    └──────────────────────────┘└────────────────────────────────┘    └──────────────────────────┘

```

```

## 🚀 Quick Start

### File Upload Flow

### Option 1: Use Live Version1. **Select file** → Read as Data URL

1. Go to **[https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)**2. **Size check** → >50KB goes to IndexedDB, smaller stays in localStorage  

2. Share the URL with your team3. **Generate ID** → Unique reference for the file

3. Start collaborating instantly!4. **Store & sync** → File saved locally, ID broadcasted to peers

4. **Offline changes sync automatically when reconnected**5. **Display** → Load file data when needed for preview

### Option 2: Run Locally## 💾 Local File Management Guide

```bash

# Clone the repository### 🗂️ Storage Options

git clone https://github.com/taylordrew4u2/produce.git| Method | Capacity | Persistence | Use Case |

cd produce|--------|----------|-------------|----------|

| **IndexedDB** | ~1GB+ | High* | Large files, videos, bulk storage |

# Serve the single HTML file  | **localStorage** | ~10MB | Medium | Task data, small images, metadata |

python3 -m http.server 8080| **Export/Import** | Unlimited | Perfect | Backups, device transfers |



# Open in browser*\* Click "Request Persistent Storage" for maximum reliability*

open http://localhost:8080

```### 📤 Export & Backup

1. **Download Backup File** → All tasks, lineup, social posts as JSON

## 💾 Local File Management + Offline Sync2. **Download All Files as Zip** → Individual downloads of all stored media

3. **Show File Inventory** → Browse and download specific files

### 🗂️ Storage Options

| Method | Capacity | Persistence | Offline Sync |### 📥 Import & Restore

|--------|----------|-------------|--------------|1. **Load Backup File** → Restore from exported JSON

| **IndexedDB** | ~1GB+ | High* | ✅ Tracked |2. **Drag & Drop** → Add individual files to storage

| **localStorage** | ~10MB | Medium | ✅ Tracked |3. **File uploads** → Via lineup or social media forms

| **Export/Import** | Unlimited | Perfect | N/A |

### 🔄 File Sync Behavior

### 🔄 Offline Sync Behavior- **File metadata** syncs between peers (names, IDs, captions)

- **File metadata** syncs between peers (names, IDs, captions)- **Actual files** stay local to each device

- **Actual files** stay local to each device- **Access model** → Each user manages their own file storage

- **Offline changes** tracked and synced when reconnected- **Sharing tip** → Use export tools to share files between team members

- **Change indicators** show pending sync status

- **Smart merging** prevents conflicts on reconnection## 🎯 Usage Workflows



## 🛠️ Technical Architecture### Setting Up a New Show

1. **Share room code** → Send app URL to team members

### Core Technologies2. **Create lineup** → Add comedians to positions 1-5

- **Vanilla JavaScript** - No frameworks, maximum compatibility3. **Upload materials** → Add bios, headshots, demo audio

- **PeerJS** - WebRTC peer-to-peer networking4. **Plan social media** → Use calendar to schedule posts

- **IndexedDB** - Client-side large file storage5. **Track tasks** → Assign production tasks to team members

- **localStorage** - Metadata and offline change persistence

- **Tailwind CSS** - Utility-first styling via CDN### Social Media Campaign

1. **Click "📅 Load Instagram Schedule"** → Pre-loads 11 strategic posts

### Browser APIs Used2. **Customize dates** → Adjust posting schedule for your show date

- **File API** - Reading uploaded files3. **Add media** → Upload images/videos for each post

- **Storage Manager** - Persistent storage requests4. **Write captions** → Detailed copy for each social post

- **WebRTC** - Real-time peer connections5. **Track engagement** → Use tasks to monitor performance

- **IndexedDB** - Structured client-side database

- **Navigator.onLine** - Online/offline status detection### File Management Best Practices

- **addEventListener('online/offline')** - Connection monitoring1. **Request persistent storage** → Click button in Storage panel

2. **Regular backups** → Export data weekly

### Offline Change Architecture3. **Compress videos** → Keep under 100MB for best performance

```javascript4. **Use drag & drop** → Fastest way to add multiple files

// Change tracking structure in localStorage5. **Clean up regularly** → Use "🧹 Cleanup" to remove unused files

offlineChanges = {

  'tasks_123': {## 🛠️ Technical Architecture

    type: 'tasks',

    itemId: '123',### Core Technologies

    timestamp: 1634567890123,- **Vanilla JavaScript** - No frameworks, maximum compatibility

    description: 'Updated task 123'- **PeerJS** - WebRTC peer-to-peer networking

  },- **IndexedDB** - Client-side large file storage

  'lineup': {- **localStorage** - Metadata and small data persistence

    type: 'lineup', - **Tailwind CSS** - Utility-first styling via CDN

    timestamp: 1634567891000,

    description: 'Modified lineup'### Browser APIs Used

  }- **File API** - Reading uploaded files

}- **Storage Manager** - Persistent storage requests and quota info

- **WebRTC** - Real-time peer connections

// Enhanced broadcast function- **IndexedDB** - Structured client-side database

function broadcast(update, changeType, itemId) {- **Drag & Drop** - Native file drop handling

  if (connections.length === 0 || !isOnline) {

    // Track for offline sync### Storage Limits by Browser

    trackOfflineChange(changeType, itemId)| Browser | IndexedDB Limit | localStorage Limit |

  } else {|---------|----------------|-------------------|

    // Send to peers + clear offline changes| **Chrome** | ~60% of disk space | 10MB |

    connections.forEach(conn => conn.send(update))| **Firefox** | ~50% of disk space | 10MB |

    clearOfflineChanges()| **Safari** | ~1GB (mobile: 50MB) | 5-10MB |

  }| **Edge** | ~60% of disk space | 10MB |

}

```## 📱 Platform Support



## 🎯 Usage Workflows### Desktop Browsers

- ✅ **Chrome 60+** - Full support

### Offline-First Production Workflow- ✅ **Firefox 55+** - Full support  

1. **Start offline** → Create tasks, lineup, social posts without internet- ✅ **Safari 11+** - Full support

2. **See progress** → "📝 X pending syncs" tracks what needs to sync- ✅ **Edge 79+** - Full support

3. **Connect with team** → Share URL when internet available

4. **Auto-sync** → All offline work appears instantly for collaborators### Mobile Browsers

5. **Live collaboration** → Real-time updates with full change history- ✅ **iOS Safari** - Works (limited storage on mobile)

- ✅ **Chrome Mobile** - Full support

### Remote Team Coordination- ⚠️ **Mobile limitations** - Smaller storage quotas, some file type restrictions

1. **Work independently** → Team members work offline as needed

2. **Track contributions** → Offline changes show who did what when### PWA Features

3. **Merge seamlessly** → No conflicts when reconnecting- 📱 **Add to Home Screen** - Works as installed app

4. **Stay synchronized** → Live updates when everyone's online- 🔄 **Offline-first** - Full functionality without internet

- 💾 **Persistent storage** - Request durable storage on mobile

## 🔐 Privacy & Security

## 🔧 Development

### Data Storage

- **All data stays local** - tasks, files, offline changes in browser### Local Development

- **P2P networking only** - no central servers collecting data```bash

- **Offline changes encrypted** in localStorage# Clone and serve

- **No authentication** - designed for trusted team collaborationgit clone https://github.com/taylordrew4u2/produce.git

cd produce

### Network Traffic  python3 -m http.server 8080

- **WebRTC connections** - direct peer-to-peer, not via servers

- **PeerJS relay servers** - only for initial connection setup# Test with multiple tabs

- **Offline change sync** - broadcasts only when reconnected# Open http://localhost:8080 in 2+ browser tabs

- **No file uploads** - files never leave your device# Changes should sync in real-time

```

## 📱 Platform Support

### File Structure

### Desktop Browsers

- ✅ **Chrome 60+** - Full support with offline detection```

- ✅ **Firefox 55+** - Full support with offline detectionproduce/

- ✅ **Safari 11+** - Full support with offline detection├── index.html          # Complete single-file application

- ✅ **Edge 79+** - Full support with offline detection├── README.md           # This documentation

├── package.json        # Optional icon generation

### Mobile Browsers└── scripts/

- ✅ **iOS Safari** - Works with offline tracking    └── generate-icons.mjs  # PWA icon generator

- ✅ **Chrome Mobile** - Full support with offline sync```

- ⚠️ **Mobile limitations** - Smaller storage quotas

### Adding Features

### PWA Features

- 📱 **Add to Home Screen** - Works as installed appThe app is designed as a **single-file application** for maximum portability:

- 🔄 **Offline-first** - Full functionality + sync tracking

- 💾 **Persistent storage** - Request durable storage- All JavaScript is inline in `index.html`

- 📡 **Background sync** - Changes sync when app reopens- No build process or dependencies required

- Easy to modify and customize

## 🔧 Development

## 🚀 Deployment

### Testing Offline Functionality

```bash### GitHub Pages (Recommended)

# Test offline sync behavior

python3 -m http.server 80801. **Fork this repository**

2. **Enable GitHub Pages** in repository settings

# Open http://localhost:8080 in multiple tabs3. **Select source** → Deploy from `main` branch

# In DevTools → Network tab → Enable "Offline"4. **Access at** → `https://yourusername.github.io/produce/`

# Make changes → should see "📝 pending syncs"

# Disable "Offline" → changes should sync automatically### Any Web Server

```

```bash

### Expected Offline Behavior# The app is just a static HTML file - works anywhere

1. **Changes tracked** with timestamps and descriptionsnginx, Apache, Caddy, Firebase Hosting, Netlify, Vercel, etc.

2. **Pending sync indicator** appears in header```

3. **Auto-sync** when reconnected to peers

4. **Success notification** confirms sync completion### Local Network Sharing

5. **Clean state** after successful sync

```bash

## 🚀 Deployment# Find your local IP

ip addr show | grep inet

### GitHub Pages (Recommended)

1. **Fork this repository** # Serve on all interfaces  

2. **Enable GitHub Pages** in settingspython3 -m http.server 8080 --bind 0.0.0.0

3. **Deploy from main branch**

4. **Offline sync works automatically** - no server config needed# Team accesses via http://YOUR_IP:8080

```

## 📄 License

## 🔐 Privacy & Security

**MIT License** - Use freely for personal or commercial projects.

### Data Storage

## 🎭 Built For Comedy Producers

- **All data stays local** - tasks, files stored in your browser

Perfect for production teams who need:- **P2P networking only** - no central servers collecting data  

- **Reliable offline work** when internet is spotty- **Room codes** provide basic access control

- **Seamless collaboration** across different locations- **No authentication** - designed for trusted team collaboration

- **Change tracking** to see who contributed what  

- **File management** that works offline### Network Traffic

- **Smart sync** that prevents conflicts

- **WebRTC connections** - direct peer-to-peer, not via servers

**Happy producing - online or offline! 🎤✨**- **PeerJS relay servers** - only for initial connection setup

- **No file uploads** - files never leave your device

### Backup Recommendations

- **Regular exports** - Use "Download Backup File" weekly
- **Version control** - Keep multiple backup versions
- **File exports** - Download all files periodically for safekeeping

## 🤝 Contributing

### Bug Reports

- **GitHub Issues** - Report bugs or request features
- **Browser console** - Include any error messages
- **Steps to reproduce** - Detailed reproduction steps

### Feature Requests  

- **Single-file constraint** - New features should maintain zero-build approach
- **Offline-first** - Features should work without internet
- **Performance** - Keep the app fast and lightweight

### Pull Requests

```bash
# Fork, modify index.html, test locally, submit PR
git clone https://github.com/yourusername/produce.git
cd produce
# Make changes to index.html
python3 -m http.server 8080  # Test
git commit -am "Description of changes"
git push origin main
# Create PR on GitHub
```

## 📄 License

**MIT License** - Use freely for personal or commercial projects.

## 🎭 Built For Comedy Producers

Created by comedy producers, for comedy producers. Designed to handle the unique workflow of:

- **Multi-comedian lineups** with individual assets
- **Social media rollouts** with strategic timing
- **Team collaboration** across different locations  
- **File-heavy workflows** with media assets
- **Fast iteration** during show promotion cycles

**Happy producing! 🎤✨**
