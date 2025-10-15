'use client'
import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet, genId } from '@/lib/localStore'

type PTask = { id: string; title: string; owner: 'Taylor'|'Jay'; done: boolean; createdAt: any }

function Section({ owner, tasks, add, toggle, remove }: {
	owner: 'Taylor'|'Jay';
	tasks: PTask[];
	add: (owner: 'Taylor'|'Jay', title: string) => Promise<void>;
	toggle: (id: string, current: boolean) => Promise<void>;
	remove: (id: string) => Promise<void>;
}) {
	const [title, setTitle] = useState('')
	const items = tasks.filter(t => t.owner === owner)
	return (
		<div className="border rounded p-3">
			<h3 className="font-medium mb-2">{owner}</h3>
			<div className="flex gap-2 mb-3">
				<input className="border rounded px-2 py-1 flex-1" placeholder={`Add task for ${owner}`} value={title} onChange={(e)=>setTitle(e.target.value)} />
				<button className="bg-black text-white px-3 py-1 rounded" onClick={() => { if(title.trim()) add(owner, title.trim()).then(()=>setTitle('')) }}>Add</button>
			</div>
			<div className="space-y-2">
				{items.map(t => (
					<div key={t.id} className="flex items-center justify-between">
						<label className="flex items-center gap-2">
							<input type="checkbox" checked={t.done} onChange={() => toggle(t.id, t.done)} />
							<span className={t.done ? 'line-through text-gray-500' : ''}>{t.title}</span>
						</label>
						<button className="text-sm text-red-600" onClick={() => remove(t.id)}>Delete</button>
					</div>
				))}
				{items.length === 0 && <p className="text-sm text-gray-500">No tasks yet.</p>}
			</div>
		</div>
	)
}

export default function PersonalTasks() {
	const [tasks, setTasks] = useState<PTask[]>([])

	useEffect(() => {
			if (!isFirebaseReady || !db) {
				setTasks(lsGet<PTask[]>('personalTasks', []))
				return
			}
		const q = collection(db, 'personalTasks')
		const unsub = onSnapshot(q, (snap) => {
			const data = snap.docs.map((d: QueryDocumentSnapshot) => ({ id: d.id, ...(d.data() as Omit<PTask,'id'>) }))
			setTasks(data)
		})
		return () => unsub()
	}, [])

	const add = async (owner: 'Taylor'|'Jay', title: string) => {
			if (!isFirebaseReady || !db) {
				const next: PTask = { id: genId('pt'), owner, title, done: false, createdAt: Date.now() }
				const list = [...lsGet<PTask[]>('personalTasks', []), next]
				lsSet('personalTasks', list)
				setTasks(list)
				return
			}
			await addDoc(collection(db, 'personalTasks'), { owner, title, done: false, createdAt: Timestamp.now() })
	}
	const toggle = async (id: string, current: boolean) => {
			if (!isFirebaseReady || !db) {
				const list = lsGet<PTask[]>('personalTasks', []).map(t => t.id === id ? { ...t, done: !current } : t)
				lsSet('personalTasks', list)
				setTasks(list)
				return
			}
			await updateDoc(doc(db, 'personalTasks', id), { done: !current })
	}
	const remove = async (id: string) => {
			if (!isFirebaseReady || !db) {
				const list = lsGet<PTask[]>('personalTasks', []).filter(t => t.id !== id)
				lsSet('personalTasks', list)
				setTasks(list)
				return
			}
			await deleteDoc(doc(db, 'personalTasks', id))
	}

	return (
		<section className="border rounded p-4">
			<h2 className="font-semibold mb-3">Personal Tasks</h2>
			{!isFirebaseReady && <p className="text-sm text-gray-600 mb-3">Add Firebase keys to enable syncing.</p>}
			<div className="grid grid-cols-1 gap-3">
				<Section owner="Taylor" tasks={tasks} add={add} toggle={toggle} remove={remove} />
				<Section owner="Jay" tasks={tasks} add={add} toggle={toggle} remove={remove} />
			</div>
		</section>
	)
}

