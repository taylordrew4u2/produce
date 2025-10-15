<<<<<<< HEAD
# Produce Task Tracker

A real-time web application for event producers to track and manage shared tasks. Built with Next.js, Firebase Firestore, and Tailwind CSS.

## Features

- 📝 **Add Tasks**: Simple form to create tasks with title, assignee, and category
- 🔄 **Real-time Sync**: Tasks update instantly across all connected users
- 📂 **Category Grouping**: Tasks are automatically organized by category
- ✅ **Completion Tracking**: Check off tasks as they're completed
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- 🔗 **No Login Required**: Share a public link to collaborate instantly
# 🎤 Producer Tasks

A real-time task tracker for comedy show producers built with Next.js and Firebase.

## 🚀 Features

- Real-time task synchronization (when Firebase configured)
- Offline local mode (no config needed)
- Task categorization (Venue, Comedians, Marketing, Equipment, Misc)
- Completion tracking
- Responsive web interface

## 🛠️ Setup

```bash
npm install
cp .env.local.example .env.local
```

Fill `.env.local` with Firebase Web app credentials.

## 🔥 Firebase

1. Visit https://console.firebase.google.com
2. Create a project and enable Firestore + Storage
3. Register a Web app and copy credentials into `.env.local`
4. (Optional) Adjust Firestore security rules before production

## 🧪 Development

```bash
npm run dev
```

Open http://localhost:3000.

## 🚀 Deploy

1. Push to GitHub
2. Import the repo on https://vercel.com
3. Add environment variables
4. Deploy

## 📄 License

MIT
5. Run the development server:
