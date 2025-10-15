'use client'
import { useEffect, useMemo, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet, genId } from '@/lib/localStore'

type Post = {
	id: string
	date: string // YYYY-MM-DD
	caption: string
	url: string
	type: 'image'|'video'
	createdAt: any
}

function formatYMD(d: Date) {
	const y = d.getFullYear()
	const m = String(d.getMonth()+1).padStart(2,'0')
	const day = String(d.getDate()).padStart(2,'0')
	return `${y}-${m}-${day}`
}

export default function SocialMediaCalendar() {
	const [date, setDate] = useState<string>(formatYMD(new Date()))
	const [caption, setCaption] = useState('')
	const [file, setFile] = useState<File|null>(null)
	const [progress, setProgress] = useState<number>(0)
	const [posts, setPosts] = useState<Post[]>([])

		useEffect(() => {
			if (!isFirebaseReady) {
				const all = lsGet<Post[]>('socialMediaPosts', [])
				setPosts(all.filter(p => p.date === date))
				return
			}
			const q = query(collection(db, 'socialMediaPosts'), where('date', '==', date))
			const unsub = onSnapshot(q, (snap) => {
				const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Post,'id'>) }))
				setPosts(list)
			})
			return () => unsub()
		}, [date])

		const canUpload = !!file

		const onUpload = async () => {
			if (!file) return
		const type = file.type.startsWith('video') ? 'video' : 'image'
			let url = ''
			if (!isFirebaseReady) {
				// Fallback: store as data URL in localStorage (suitable for small files)
				const buf = await file.arrayBuffer()
				const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
				const mime = file.type
				url = `data:${mime};base64,${base64}`
				const entry: Post = { id: genId('sm'), date, caption, url, type, createdAt: Date.now() }
				const all = lsGet<Post[]>('socialMediaPosts', [])
				const next = [...all, entry]
				lsSet('socialMediaPosts', next)
				setPosts(next.filter(p => p.date === date))
			} else {
				const storagePath = `social/${date}/${Date.now()}-${file.name}`
				const storageRef = ref(storage, storagePath)
				const task = uploadBytesResumable(storageRef, file)
				task.on('state_changed', (snap) => {
					const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
					setProgress(pct)
				})
				await task
				url = await getDownloadURL(storageRef)
				await addDoc(collection(db, 'socialMediaPosts'), {
					date,
					caption,
					url,
					type,
					createdAt: Timestamp.now(),
				})
			}
		setCaption('')
		setFile(null)
		setProgress(0)
	}

		const del = async (p: Post) => {
			if (!isFirebaseReady) {
				const all = lsGet<Post[]>('socialMediaPosts', [])
				const next = all.filter(x => x.id !== p.id)
				lsSet('socialMediaPosts', next)
				setPosts(next.filter(x => x.date === date))
				return
			}
		try {
			const u = new URL(p.url)
			// best-effort delete (path decoding for Firebase Storage URLs can vary)
			const pathname = decodeURIComponent(u.pathname)
			const idx = pathname.indexOf('/o/')
			if (idx >= 0) {
				const full = pathname.substring(idx + 3)
				const end = full.indexOf('?')
				const objectPath = end >= 0 ? full.substring(0, end) : full
				const storageKey = objectPath.replace(/%2F/g, '/')
				await deleteObject(ref(storage, storageKey))
			}
		} catch {}
		await deleteDoc(doc(db, 'socialMediaPosts', p.id))
	}

	const preview = useMemo(() => {
		if (!file) return null
		const url = URL.createObjectURL(file)
		const isVid = file.type.startsWith('video')
		return isVid ? (
			<video src={url} controls className="max-h-40 rounded border" />
		) : (
			<img src={url} className="max-h-40 rounded border" />
		)
	}, [file])

	return (
		<section className="border rounded p-4">
			<h2 className="font-semibold mb-2">Social Media Calendar</h2>
			{!isFirebaseReady && (
				<p className="text-sm text-gray-600 mb-2">Add Firebase keys to enable uploads and saving.</p>
			)}
			<div className="flex flex-col md:flex-row gap-3 items-start mb-3">
				<div>
					<label className="text-sm text-gray-600 block mb-1">Date</label>
					<input type="date" className="border rounded px-2 py-1" value={date} onChange={(e)=>setDate(e.target.value)} />
				</div>
				<div className="flex-1 w-full">
					<label className="text-sm text-gray-600 block mb-1">Caption</label>
					<input className="border rounded px-2 py-1 w-full" value={caption} onChange={(e)=>setCaption(e.target.value)} />
				</div>
				<div>
					<label className="text-sm text-gray-600 block mb-1">File</label>
					<input type="file" accept="image/*,video/*" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
				</div>
				<button disabled={!canUpload} className={`px-3 py-1 rounded ${canUpload ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} onClick={onUpload}>Upload</button>
			</div>
			{progress > 0 && (
				<div className="mb-3 w-full h-2 bg-gray-200 rounded"><div className="h-2 bg-black rounded" style={{ width: `${progress}%` }} /></div>
			)}
			{preview}

			<div className="mt-4">
				<h3 className="font-medium mb-2">Scheduled for {date}</h3>
				<div className="space-y-3">
					{posts.map((p) => (
						<div key={p.id} className="border rounded p-2 flex items-start gap-3">
							{p.type === 'video' ? (
								<video src={p.url} className="w-32 h-32 object-cover rounded" controls />
							) : (
								<img src={p.url} className="w-32 h-32 object-cover rounded" />
							)}
							<div className="flex-1">
								<p className="text-sm mb-2">{p.caption || <span className="text-gray-500">(no caption)</span>}</p>
								<button className="text-sm text-red-600" onClick={() => del(p)}>Delete</button>
							</div>
						</div>
					))}
					{posts.length === 0 && (
						<p className="text-sm text-gray-600">No posts yet for this date.</p>
					)}
				</div>
			</div>
		</section>
	)
}

