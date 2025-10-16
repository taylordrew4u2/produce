# Producer Tasks - AI Coding Agent Instructions

## Architecture Overview

This is a **single-file vanilla JavaScript application** deployed to GitHub Pages with **zero configuration needed**.

**Live URL:** https://taylordrew4u2.github.io/produce/

### Core Technology Stack

- **Vanilla JavaScript** - No frameworks, no build process
- **PeerJS** - WebRTC peer-to-peer real-time collaboration
- **localStorage** - Offline data persistence
- **Tailwind CSS (CDN)** - Utility-first styling
- **GitHub Pages** - Free static hosting with automatic deployment

### P2P Sync Pattern

The app uses **WebRTC via PeerJS** for zero-config real-time collaboration:

```javascript
// Connect to PeerJS cloud server with room code
const peer = new Peer({ /* auto-generated ID */ })
const roomId = localStorage.getItem('roomId') || prompt('Room code?')

// Broadcast changes to all peers in room
function broadcast(type, data) {
  connections.forEach(conn => {
    if (conn.open) conn.send({ type, data })
  })
}

// On data change, update localStorage + broadcast
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
  broadcast('tasks', tasks)
}
```

**Key insight:** NO server dependency - works entirely in browser with localStorage + WebRTC relay.

## Key Files

### Main Application
- **`index.html`**: Single-file application (942 lines) containing all HTML, CSS, and JavaScript
  - PeerJS WebRTC integration for P2P sync
  - localStorage for offline persistence
  - Instagram schedule helper (pre-populates 11 posts)
  - Operations notes sidebar
  - Task management with categories
  - Show lineup (positions 1-5)
  - Personal task lists (Taylor/Jay)
  - Social media calendar

### Scripts
- **`scripts/generate-icons.mjs`**: Generate PWA icons from source image (optional)

### Configuration
- **`package.json`**: Minimal - only contains `sharp` for icon generation
- **`.github/workflows/`**: GitHub Actions for automatic deployment to Pages

## Data Storage

All data is stored in browser's **localStorage** with these keys:

| Key | Data Structure | Purpose |
|-----|----------------|---------|
| `tasks` | Array of `{id, title, category, assignedTo, completed, createdAt}` | Main producer tasks |
| `personalTasks` | Array of `{id, owner, text, completed}` | Taylor/Jay personal lists |
| `lineup` | Array of `{id, position, performerName, notes}` | Comedy show lineup (1-5) |
| `socialMediaPosts` | Array of `{id, scheduledDate, platform, caption, imageUrl, status}` | Scheduled social posts |
| `roomId` | String | PeerJS room code for P2P sync |
| `peerStatus` | Object | Connection status info |

## Development Workflow

```bash
# Optional: Generate PWA icons from source image
npm install
npm run icons

# Deploy - just push to main branch
git push origin main
```

GitHub Actions automatically deploys `index.html` to GitHub Pages on every push to `main`.

**No authentication** - this is an intentionally public/shared task tracker.

## Code Structure (within index.html)

The single HTML file contains:

1. **HTML Structure** (~200 lines)
   - Header with peer status indicator
   - Main content sections (tasks, lineup, personal lists, social calendar)
   - Operations notes sidebar
   - Modal dialogs for editing

2. **CSS Styling** (~100 lines)
   - Tailwind CSS via CDN
   - Custom styles for peer status, modals, cards
   - Responsive grid layouts

3. **JavaScript Logic** (~640 lines)
   - PeerJS initialization and room management
   - localStorage CRUD operations
   - P2P broadcast functions
   - Event handlers for all UI interactions
   - Instagram schedule helper
   - Date formatting utilities

## Key JavaScript Patterns

### P2P Broadcast on Change
```javascript
// After any localStorage update, broadcast to peers
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
  broadcast('tasks', tasks)
}

// All peers receive updates via WebRTC
peer.on('connection', (conn) => {
  conn.on('data', (data) => {
    if (data.type === 'tasks') {
      localStorage.setItem('tasks', JSON.stringify(data.data))
      renderTasks()
    }
  })
})
```

### localStorage Helper Pattern
```javascript
// Get with default fallback
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

// Save with broadcast
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
  broadcast('tasks', tasks)
}
```

### Room Code Sharing
```javascript
// On first load, prompt for room code or generate
const roomId = localStorage.getItem('roomId') || prompt('Enter room code to join:')
localStorage.setItem('roomId', roomId)

// Connect to room
const peer = new Peer(roomId)
```

## Deployment

**GitHub Pages** - Automatically deploys on push to `main` branch via GitHub Actions.

Live URL: https://taylordrew4u2.github.io/produce/

## Privacy & Security

- All data stays in browser's localStorage
- P2P sync uses WebRTC relay servers only for connection establishment
- No data stored on servers
- Room codes provide basic access control (share code = share data)
- No authentication system (intentional design for quick collaboration)

## Development Tips

- **Local testing**: Open `index.html` in browser directly (no server needed)
- **P2P testing**: Open multiple browser tabs/windows with same room code
- **Debug localStorage**: Use browser DevTools → Application → Local Storage
- **Debug P2P**: Check PeerJS status indicator in header (green = connected)
- **Clear data**: Delete localStorage keys to reset app state
