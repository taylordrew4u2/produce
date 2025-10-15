'use client'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, setDoc, QueryDocumentSnapshot } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet } from '@/lib/localStore'

type StaffRoles = {
	dj?: string
	door?: string
	av?: string
	photo?: string
}

export default function StaffAssignments() {
	const [roles, setRoles] = useState<StaffRoles>({})

	useEffect(() => {
		if (!isFirebaseReady || !db) {
			setRoles(lsGet<StaffRoles>('staffAssignments', {}))
			return
		}
		const unsub = onSnapshot(collection(db, 'staffAssignments'), (snap) => {
			// single doc pattern: use id = 'current'
			const d = snap.docs.find((x: QueryDocumentSnapshot) => x.id === 'current')
			setRoles((d?.data() as StaffRoles) || {})
		})
		return () => unsub()
	}, [])

	const save = async (patch: Partial<StaffRoles>) => {
		if (!isFirebaseReady || !db) {
			const merged = { ...roles, ...patch }
			lsSet('staffAssignments', merged)
			setRoles(merged)
			return
		}
		await setDoc(doc(db, 'staffAssignments', 'current'), { ...roles, ...patch }, { merge: true })
	}

	const Field = ({ label, keyName }: { label: string; keyName: keyof StaffRoles }) => (
		<div className="mb-2">
			<label className="text-sm text-gray-600 block mb-1">{label}</label>
			<input className="border rounded px-2 py-1 w-full" value={roles[keyName] || ''} onChange={(e) => setRoles({ ...roles, [keyName]: e.target.value })} onBlur={() => save({ [keyName]: roles[keyName] } as Partial<StaffRoles>)} />
		</div>
	)

	return (
		<section className="border rounded p-4">
			<h2 className="font-semibold mb-2">Staff Assignments</h2>
			{!isFirebaseReady && <p className="text-sm text-gray-600">Add Firebase keys to enable syncing.</p>}
			<Field label="DJ" keyName="dj" />
			<Field label="Door Person" keyName="door" />
			<Field label="A/V" keyName="av" />
			<Field label="Photography" keyName="photo" />
		</section>
	)
}

