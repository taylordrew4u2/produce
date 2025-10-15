'use client'
import { useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function TaskForm() {
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [category, setCategory] = useState('Venue')

  const handleAdd = async () => {
    if (!title || !assignedTo) return
    await addDoc(collection(db, 'tasks'), {
      title,
      assignedTo,
      category,
      isCompleted: false,
      createdAt: Timestamp.now(),
    })
    setTitle('')
    setAssignedTo('')
  }

  return (
    <div className="mb-6">
      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        placeholder="Assigned to"
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        {['Venue', 'Comedians', 'Marketing', 'Equipment', 'Misc'].map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Add Task
      </button>
    </div>
  )
}
