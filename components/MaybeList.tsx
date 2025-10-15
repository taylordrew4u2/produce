'use client'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc, deleteDoc, QueryDocumentSnapshot } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet } from '@/lib/localStore'

type Maybe = { id: string; name: string; position: number }

export default function MaybeList() {
	const [items, setItems] = useState<Maybe[]>([])
	const [input, setInput] = useState('')

		useEffect(() => {
			if (!isFirebaseReady) {
				const data = lsGet<Maybe[]>('maybeList', [])
				setItems(data.sort((a,b)=>a.position-b.position))
				return
			}
			const unsub = onSnapshot(collection(db, 'maybeList'), (snap) => {
				const data = snap.docs.map((d: QueryDocumentSnapshot) => ({ id: d.id, ...(d.data() as Omit<Maybe,'id'>) }))
				setItems(data.sort((a,b) => a.position - b.position))
			})
			return () => unsub()
		}, [])

		const save = async (position: number) => {
			const id = `maybe-${position}`
			const payload = { id, name: input || `Maybe ${position}`, position }
			if (!isFirebaseReady) {
				const data = lsGet<Maybe[]>('maybeList', [])
				const next = data.filter(d => d.id !== id).concat(payload).sort((a,b)=>a.position-b.position)
				lsSet('maybeList', next)
				setItems(next)
				setInput('')
				return
			}
			await setDoc(doc(db, 'maybeList', id), { name: payload.name, position: payload.position })
			setInput('')
		}

		const clear = async (position: number) => {
			const id = `maybe-${position}`
			if (!isFirebaseReady) {
				const data = lsGet<Maybe[]>('maybeList', [])
				const next = data.filter(d => d.id !== id)
				lsSet('maybeList', next)
				setItems(next)
				return
			}
			await deleteDoc(doc(db, 'maybeList', id))
		}

	const getName = (position: number) => items.find(i => i.position === position)?.name || ''

	const Row = ({ position }: { position: number }) => (
		<div className="flex items-center gap-2 mb-2">
			<span className="w-10 text-sm text-gray-600">#{position}</span>
			<input className="border rounded px-2 py-1 flex-1" placeholder={`Maybe ${position}`} value={getName(position) || input} onChange={(e)=>setInput(e.target.value)} />
			<button className="bg-black text-white px-3 py-1 rounded" onClick={() => save(position)}>Save</button>
			<button className="px-3 py-1 rounded border" onClick={() => clear(position)}>Clear</button>
		</div>
	)

	return (
		<section className="border rounded p-4">
			<h2 className="font-semibold mb-2">Maybe List</h2>
			{!isFirebaseReady && (
				<p className="text-sm text-gray-600">Add Firebase keys to enable syncing.</p>
			)}
			{[1,2,3,4,5].map(i => <Row key={i} position={i} />)}
		</section>
	)
}

