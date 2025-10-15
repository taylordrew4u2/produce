'use client'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc, deleteDoc, QueryDocumentSnapshot } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet } from '@/lib/localStore'

type Slot = {
	id: string
	name: string
	position: number
}

export default function LineupManager() {
	const [items, setItems] = useState<Slot[]>([])
	const [input, setInput] = useState('')

		useEffect(() => {
			if (!isFirebaseReady) {
				const data = lsGet<Slot[]>('lineup', [])
				setItems(data.sort((a,b)=>a.position-b.position))
				return
			}
			const unsub = onSnapshot(collection(db, 'lineup'), (snap) => {
				const data = snap.docs.map((d: QueryDocumentSnapshot) => ({ id: d.id, ...(d.data() as Omit<Slot,'id'>) }))
				setItems(data.sort((a,b) => a.position - b.position))
			})
			return () => unsub()
		}, [])

		const addOrUpdate = async (position: number) => {
			const id = `slot-${position}`
			const payload = { id, name: input || `Comic ${position}`, position }
			if (!isFirebaseReady) {
				const data = lsGet<Slot[]>('lineup', [])
				const next = data.filter(d => d.id !== id).concat(payload).sort((a,b)=>a.position-b.position)
				lsSet('lineup', next)
				setItems(next)
				setInput('')
				return
			}
			await setDoc(doc(db, 'lineup', id), { name: payload.name, position: payload.position })
			setInput('')
		}

		const clear = async (position: number) => {
			const id = `slot-${position}`
			if (!isFirebaseReady) {
				const data = lsGet<Slot[]>('lineup', [])
				const next = data.filter(d => d.id !== id)
				lsSet('lineup', next)
				setItems(next)
				return
			}
			await deleteDoc(doc(db, 'lineup', id))
		}

	const getName = (position: number) => items.find(i => i.position === position)?.name || ''

	const SlotRow = ({ label, position }: { label: string; position: number }) => (
		<div className="flex items-center gap-2 mb-2">
			<span className="w-28 text-sm text-gray-600">{label}</span>
			<input
				className="border rounded px-2 py-1 flex-1"
				placeholder={`Enter ${label}`}
				value={position === -1 ? input : getName(position) || input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button className="bg-black text-white px-3 py-1 rounded" onClick={() => addOrUpdate(position)}>Save</button>
			<button className="px-3 py-1 rounded border" onClick={() => clear(position)}>Clear</button>
		</div>
	)

	const disabledMsg = !isFirebaseReady ? (
		<p className="text-sm text-gray-600">Add your Firebase keys to .env.local to enable Lineup syncing.</p>
	) : null

	return (
		<section className="border rounded p-4">
			<h2 className="font-semibold mb-2">Lineup</h2>
			{disabledMsg}
			<SlotRow label="Headliner" position={1} />
			<SlotRow label="Comic 2" position={2} />
			<SlotRow label="Comic 3" position={3} />
			<SlotRow label="Comic 4" position={4} />
			<SlotRow label="Comic 5" position={5} />
		</section>
	)
}

 

