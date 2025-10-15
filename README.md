# Produce Task Tracker

A real-time web application for event producers to track and manage shared tasks. Built with Next.js, Firebase Firestore, and Tailwind CSS.

## Features

- 📝 **Add Tasks**: Simple form to create tasks with title, assignee, and category
- 🔄 **Real-time Sync**: Tasks update instantly across all connected users
- 📂 **Category Grouping**: Tasks are automatically organized by category
- ✅ **Completion Tracking**: Check off tasks as they're completed
- 📱 **Mobile-Friendly**: Responsive design that works on all devices
- 🔗 **No Login Required**: Share a public link to collaborate instantly

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project with Firestore enabled

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in your project
3. Get your Firebase configuration from Project Settings
4. Update Firestore rules to allow public read/write:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/taylordrew4u2/produce.git
cd produce
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Firebase credentials:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Firebase configuration values

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your Firebase environment variables in Vercel project settings
4. Deploy!

Alternatively, click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/taylordrew4u2/produce)

## Usage

1. Open the app in your browser
2. Add tasks using the form at the top
3. Tasks will appear grouped by category
4. Check the checkbox to mark tasks as complete
5. Share the URL with your team - all changes sync in real-time!

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## License

MIT
