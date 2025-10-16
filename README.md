# 🎤 Producer Tasks

**Zero-config P2P task manager for comedy show producers**

Live at: **<https://taylordrew4u2.github.io/produce/>**

## 🚀 Features

- 🔄 **Real-time P2P Sync**: Collaborate instantly via WebRTC - no server needed
- 💾 **Offline First**: Works completely offline with localStorage
- 🔗 **Room Codes**: Share a room code to sync with team members
- � **Task Management**: Create, assign, and track tasks by category
- 📅 **Social Media Calendar**: Schedule posts with Instagram helper
- 🎭 **Show Lineup**: Manage comedian positions 1-5
- � **Personal Lists**: Separate task lists for Taylor & Jay
- 👥 **Staff Management**: Track team member assignments
- 📱 **Mobile-Friendly**: Works on all devices, no installation required

## 🎯 How It Works

1. Open <https://taylordrew4u2.github.io/produce/>
2. Share your room code with team members
3. Everyone with the same room code sees live updates
4. Everything saves to localStorage automatically
5. No login, no backend, no configuration needed

## �️ Tech Stack

- **Vanilla JavaScript** - No framework bloat
- **PeerJS** - WebRTC for P2P real-time sync
- **localStorage** - Offline persistence
- **GitHub Pages** - Free static hosting
- **Tailwind CSS** - Utility-first styling

## � Development

```bash
# Generate PWA icons (optional)
npm install
npm run icons

# Deploy - just push to main branch
git push origin main
```

GitHub Actions automatically deploys `index.html` to GitHub Pages.

## 🔒 Privacy

All data stays in your browser's localStorage. P2P sync uses WebRTC relay servers only for connection establishment - no data is stored on servers.

## 📄 License

MIT
