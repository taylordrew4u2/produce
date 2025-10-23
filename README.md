# 🎤 Producer Tasks

**Cloud-first P2P task manager for comedy show producers**

A single-file vanilla JavaScript app for real-time comedy show production management with **100% cloud storage** via Koofr WebDAV. Zero setup, works everywhere, syncs instantly across devices.

**Live Demo:** [https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)

## ☁️ Cloud-First Architecture

All data is stored on **Koofr (WebDAV)** for permanent, reliable, cross-device access:

- ✅ **Files** → Images, videos, audio uploaded to Koofr via WebDAV
- ✅ **App State** → Tasks, lineup, posts stored as JSON on Koofr
- ✅ **Cross-Device** → Access from any device instantly via cloud
- ✅ **No Local Storage** → No browser storage limits or cleanup needed

**localStorage is only used for config** (~300 bytes: API keys, signatures, pointers)

## 🚀 Features

### 🔄 Real-Time Collaboration

- **WebRTC P2P Sync** → Real-time updates via PeerJS (no server needed)
- **Share URL** → Team members see live changes instantly
- **Room Codes** → Share link to sync with team
- **Offline-Ready** → Changes sync automatically when reconnected

### 📋 Production Management

- 📝 **Task Management** → Create, assign, and track tasks by category
- 🎭 **Show Lineup** → Manage comedian positions 1-5 with files/audio
- 👥 **Personal Lists** → Separate task lists for Taylor & Jay
- 👔 **Staff Management** → Track team member assignments (DJ, door, AV, photo)

### 📅 Social Media Calendar

- 📆 **Visual Calendar** → Schedule posts with date picker
- 📸 **Media Uploads** → Images/videos uploaded to Filestack CDN
- 📱 **Instagram Helper** → Pre-populate 11 strategic posts
- ✍️ **Captions** → Write detailed post content

### ☁️ Cloud Storage (Koofr)

- 🌐 **Reliable Storage** → Files stored on Koofr via WebDAV (permanent)
- 📤 **File Uploads** → Images, videos, audio, PDFs
- 🔗 **Permanent URLs** → Files accessible from any device
- 📥 **Export/Import** → Backup all data + file references

## 🎯 How It Works

### Quick Start

1. **Open** → [https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)
2. **Configure** → Click “Koofr Active - Configure” and enter:
    - WebDAV URL: <https://koofr.eu/dav/Koofr> (default)
    - Username: your Koofr email
    - App Password: create an app password in Koofr
    - Base Folder: /produce (default)
3. **Share** → Send URL to team members
4. **Collaborate** → Changes sync in real-time via P2P + cloud

### Storage Flow

\`\`\`
User Action (upload file, create task, etc.)
    ↓
File → Koofr (WebDAV) permanent URL
State → Koofr state.json (entire app state)
    ↓
P2P Broadcast → Other connected devices get real-time update
    ↓
All devices load from Filestack on refresh
\`\`\`

### Real-Time Sync

- **PeerJS WebRTC** → Direct peer-to-peer connections
- **Room Codes** → Shared URL = shared room
- **Metadata Sync** → Task updates, lineup changes broadcast instantly
- **Cloud Fallback** → All data persists on Filestack, even when offline

## 🛠️ Technical Stack

### Core Technologies

- **Vanilla JavaScript** → No frameworks, zero build process
- **PeerJS** → WebRTC for real-time P2P sync
- **Koofr WebDAV** → Cloud file storage and state persistence
- **Tailwind CSS** → Utility-first styling (CDN)
- **GitHub Pages** → Free static hosting

### Storage Architecture

| Type | Storage Location | Purpose |
|------|-----------------|---------|
| **Files** | Koofr (WebDAV) | Images, videos, audio, PDFs |
| **App State** | Koofr (state.json) | Tasks, lineup, posts, metadata |
| **Config** | localStorage | API keys, signatures, pointers (~300 bytes) |

### Browser APIs

- **File API** → Reading uploaded files
- **Fetch API** → Uploading to Filestack
- **WebRTC** → Real-time peer connections
- **Drag & Drop** → Native file drop handling

## 📱 Platform Support

### Desktop Browsers

- ✅ **Chrome 60+** → Full support
- ✅ **Firefox 55+** → Full support
- ✅ **Safari 11+** → Full support
- ✅ **Edge 79+** → Full support

### Mobile Browsers

- ✅ **iOS Safari** → Full support
- ✅ **Chrome Mobile** → Full support
- ✅ **Samsung Internet** → Full support

## 🚀 Getting Started

### Option 1: Use Live Version (Recommended)

1. Go to [https://taylordrew4u2.github.io/produce/](https://taylordrew4u2.github.io/produce/)
2. Click “Koofr Active - Configure” and enter your Koofr credentials
3. Start creating tasks and uploading files!
4. Start creating tasks and uploading files!

### Option 2: Run Locally

\`\`\`bash

# Clone repository

git clone <https://github.com/taylordrew4u2/produce.git>
cd produce

# Serve the single HTML file

python3 -m http.server 8080

# Open in browser

open <http://localhost:8080>
\`\`\`

### Option 3: Deploy Your Own

The app is a single \`index.html\` file — works with any static hosting:

- **GitHub Pages** → Enable in repo settings
- **Netlify** → Drag & drop \`index.html\`
- **Vercel** → Connect repo and deploy
- **Any web server** → nginx, Apache, Caddy, etc.

## 🔐 Setup: Koofr App Password

### Create an App Password

1. Go to [Koofr](https://koofr.eu) and sign in
2. Create an App Password in account settings
3. Use your Koofr email + App Password in the app’s Configure prompt

## 🎯 Usage Examples

### Setting Up a New Show

1. **Share URL** → Send app link to team members
2. **Create Lineup** → Add comedians to positions 1-5
3. **Upload Materials** → Bios, headshots, demo audio (stored on Koofr)
4. **Plan Social Media** → Use calendar to schedule posts
5. **Track Tasks** → Assign production tasks to team members

### Social Media Campaign

1. **Load Instagram Schedule** → Pre-populates 11 strategic posts
2. **Customize Dates** → Adjust schedule for your show date
3. **Upload Media** → Images/videos uploaded to Koofr
4. **Write Captions** → Detailed copy for each post
5. **Track Progress** → Use tasks to monitor posting schedule

### Team Collaboration

1. **Real-Time Updates** → See changes as team works
2. **File Sharing** → Upload files to Koofr, team sees links instantly
3. **Task Assignment** → Assign tasks to team members
4. **Status Tracking** → Monitor completion across all categories

## 💾 Data Management

### Export Data

Click **"Download Backup File"** to export:

- All tasks, lineup, social posts as JSON
- File references (Koofr URLs)
- Complete app state snapshot

### Import Data

Click **"Load Backup File"** to restore:

- Restores all data from JSON export
- Files remain on Koofr (imports URLs)
- Overwrites current state (prompts for confirmation)

### View Cloud Files

Click **"📁 View Cloud Files"** to see:

- All files uploaded to Koofr
- File names, sizes, timestamps
- Direct links to open files

## 🔒 Privacy & Security

### Data Storage

- **Cloud Storage** → All files and state on Koofr (WebDAV)
- **P2P Networking** → WebRTC connections encrypted
- **No Backend** → No central server collecting data
- **Access Control** → Room codes provide basic sharing

### What's Stored Where

| Data | Koofr (WebDAV) | localStorage |
|------|---------------|-------------|
| Files (images, video, audio) | ✅ | ❌ |
| App state (tasks, lineup, posts) | ✅ | ❌ |
| Credentials (email + app password) | ❌ | ✅ |
| State URL pointers | ❌ | ✅ |

**localStorage holds only ~300 bytes of config — zero application data**

## 🔧 Development

### File Structure

\`\`\`
produce/
├── index.html          # Complete single-file application
├── README.md           # This documentation
├── package.json        # Optional: icon generation only
└── scripts/
    └── generate-icons.mjs  # PWA icon generator (optional)
\`\`\`

### Local Development

\`\`\`bash

# Serve locally

python3 -m http.server 8080

# Test in browser

open <http://localhost:8080>

# Test with multiple devices

# Open same URL on phone (use computer's IP address)

\`\`\`

### Deployment

Push to GitHub and enable GitHub Pages:

\`\`\`bash
git add -A
git commit -m "Update producer tasks"
git push origin main
\`\`\`

GitHub Actions automatically deploys \`index.html\` to:
\`<https://yourusername.github.io/produce/\`>

## 🤝 Contributing

### Bug Reports

- Use GitHub Issues for bug reports
- Include browser console errors
- Provide steps to reproduce

### Feature Requests

- Keep single-file constraint (no build process)
- Cloud-first design (Koofr WebDAV storage)
- Maintain zero-config simplicity

### Pull Requests

\`\`\`bash

# Fork and clone

git clone <https://github.com/yourusername/produce.git>
cd produce

# Make changes to index.html

# Test locally

python3 -m http.server 8080

# Commit and push

git commit -am "Description of changes"
git push origin main

# Create PR on GitHub

\`\`\`

## 📄 License

**MIT License** - Use freely for personal or commercial projects.

## 🎭 Built For Comedy Producers

Created by comedy producers, for comedy producers. Designed to handle:

- **Multi-comedian lineups** with files and audio
- **Social media campaigns** with strategic scheduling
- **Team collaboration** across different locations
- **File-heavy workflows** with media assets
- **Fast iteration** during show promotion

**Happy producing! 🎤✨**

---

## 📚 Additional Documentation

- **[CLOUD-ONLY-MODE.md](CLOUD-ONLY-MODE.md)** → Cloud architecture details
- **[STORAGE-ARCHITECTURE.md](STORAGE-ARCHITECTURE.md)** → Technical storage breakdown
- **[UNIVERSAL-STORAGE.md](UNIVERSAL-STORAGE.md)** → Developer guide
- **[ZERO-LOCAL-STORAGE.md](ZERO-LOCAL-STORAGE.md)** → Local storage removal verification
- **[QUICK-START.md](QUICK-START.md)** → User setup guide
- **[GOOGLE-DRIVE-SETUP.md](GOOGLE-DRIVE-SETUP.md)** → Optional Google Drive integration

---

**Note:** This app uses **100% cloud storage via Koofr (WebDAV)**. Any references to "IndexedDB", "persistent storage", or "local file storage" in older documentation refer to deprecated designs and can be ignored. See [DOCS-CLOUD-NOTE.md](DOCS-CLOUD-NOTE.md) for details.
