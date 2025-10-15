# 🎤 Producer Tasks - Real-Time Collaboration Setup

This app now supports **real-time collaboration** where anyone with the URL can view and edit tasks, and all changes sync instantly!

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Firebase Project

1. Go to <https://console.firebase.google.com>
2. Click "Add project"
3. Name it "producer-tasks" (or anything you want)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Firestore

1. In your new project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in **production mode**" (we'll set rules next)
4. Choose a location close to you
5. Click "Enable"

### Step 3: Set Firestore Rules (Make it Public)

1. Click the "Rules" tab in Firestore
2. Replace the rules with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

> ⚠️ **Note:** These rules allow anyone to read/write. Perfect for a team tool, but don't store sensitive data!

### Step 4: Get Your Firebase Config

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the `</>` (Web) icon
5. Register your app (name it "Producer Tasks Web")
6. Copy the `firebaseConfig` object

### Step 5: Add Config to Your HTML File

1. Open `index-simple.html` (or `index.html`)
2. Find line ~66 with the Firebase config
3. Replace `YOUR_API_KEY`, etc. with your actual values from Step 4:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",  // Your actual API key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

4. Save the file
5. Commit and push:

```bash
git add index-simple.html
git commit -m "Add Firebase config for real-time sync"
git push
```

### Step 6: Share the URL

Your app will be live at:

```
https://taylordrew4u2.github.io/produce/index-simple.html
```

Share this URL with your team - everyone who visits will see the same data in real-time!

## 🎉 Features

✅ **Real-time sync** - Changes appear instantly for all users
✅ **No login required** - Just share the URL
✅ **Works offline** - Falls back to localStorage if Firebase isn't configured
✅ **Mobile friendly** - Use on phones, tablets, laptops
✅ **Free hosting** - GitHub Pages + Firebase free tier

## 🔧 Alternative: Use Without Firebase

If you don't want to set up Firebase, the app works in "Offline Mode" using localStorage. Each person's changes are only saved on their own device.

## 💰 Cost

- **GitHub Pages**: Free
- **Firebase**: Free up to 50,000 reads + 20,000 writes per day (plenty for a small team)

## 🔐 Security Note

The current setup allows anyone with the URL to edit. To restrict access:

1. Use Firebase Authentication
2. Update Firestore rules to require auth
3. Add a simple login screen

Let me know if you need help with this!
