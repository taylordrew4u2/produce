# Producer Tasks - AI Coding Agent Instructions

## Architecture Overview

This is a **Next.js 14 (App Router)** task management app for comedy show producers with a **dual-mode data layer**:
- **Firebase mode**: Real-time sync via Firestore + Firebase Storage when `.env.local` credentials are configured
- **Offline mode**: Falls back to localStorage automatically when Firebase keys are missing

### Critical Pattern: Dual-Mode Data Layer

Every component that stores data implements **both Firebase and localStorage** branches using this pattern:

```typescript
// In lib/firebase.ts: export isFirebaseReady boolean
// In components: check isFirebaseReady to branch logic

useEffect(() => {
  if (!isFirebaseReady) {
    setData(lsGet<T[]>('key', []))
    return
  }
  const unsub = onSnapshot(collection(db, 'collectionName'), (snap) => {
    setData(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
  return () => unsub()
}, [])
```

See `components/PersonalTasks.tsx`, `components/SocialMediaCalendar.tsx`, and `components/LineupManager.tsx` for reference implementations.

## Key Files & Responsibilities

- **`lib/firebase.ts`**: Exports `db`, `storage`, and `isFirebaseReady` flag. Gracefully handles missing env vars.
- **`lib/localStore.ts`**: Typed localStorage helpers (`lsGet`, `lsSet`, `lsRemove`) + `genId()` for offline IDs.
- **`types/task.ts`**: Core `Task` interface and `NewTask` type.
- **`components/`**: All client components (`'use client'` directive required) with dual-mode CRUD logic.

## Data Collections

| Firestore Collection | localStorage Key | Purpose |
|---------------------|------------------|---------|
| `tasks` | `'tasks'` | Main producer tasks with category, assignee, completion |
| `personalTasks` | `'personalTasks'` | Taylor/Jay personal task lists |
| `lineup` | `'lineup'` | Comedy show performer lineup (positions 1-5) |
| `socialMediaPosts` | `'socialMediaPosts'` | Date-scheduled posts with image/video uploads |

## Development Workflow

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run icons        # Generate PWA icons (scripts/generate-icons.mjs)
```

**No authentication** - this is an intentionally public/shared task tracker.

## Component Conventions

1. **All data components are client components** - use `'use client'` directive
2. **Always implement dual-mode pattern** - check `isFirebaseReady` before every data operation
3. **Use TypeScript strictly** - `tsconfig.json` has `strict: true`
4. **Import aliases** - Use `@/` for root imports (configured in `tsconfig.json`)
5. **Styling** - Tailwind utility classes with dark mode support (`dark:` prefix)

## Firebase Storage Pattern

When uploading files (e.g., `SocialMediaCalendar.tsx`):
- **Online**: Use `uploadBytesResumable()` with progress tracking, store download URL
- **Offline**: Convert to base64 data URL and store inline in localStorage (suitable for small files only)

## Data Inconsistencies to Handle

Tasks use inconsistent field names across the codebase:
- `assignedTo` vs `assignee` (both exist)
- `isCompleted` vs `completed` (both exist)

When reading, use `task.assignedTo ?? task.assignee` and `task.isCompleted ?? task.completed`. When writing, preserve the existing key or default to `assignee`/`completed`.

## Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

All are optional - app works offline without them. Use `.env.local` (gitignored).

## Deployment

Vercel is the primary deployment target (see `vercel.json`). Set all Firebase env vars in Vercel dashboard for production.
