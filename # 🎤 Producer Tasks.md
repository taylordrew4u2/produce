# 🎤 Producer Tasks

A real-time task tracker for comedy show producers built with Next.js and Firebase.

## 🚀 Features

- ✅ Real-time task synchronization
- 👥 Multi-user collaboration
- 📋 Task categorization (Venue, Comedians, Marketing, Equipment, Misc)
- ✔️ Task completion tracking
- 🔥 Firebase Firestore backend
- 📱 Responsive web interface

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings → General → Your apps
5. Create a Web app and copy the config

### 3. Environment Variables

Create `.env.local` in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials in `.env.local`.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

## 🔒 Firestore Security Rules

Add these rules in Firebase Console → Firestore Database → Rules:

