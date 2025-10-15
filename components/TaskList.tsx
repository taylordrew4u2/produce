'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, updateDoc, QueryDocumentSnapshot } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet } from '@/lib/localStore'

type Task = {
  id: string
  title: string
  assignedTo?: string
  assignee?: string
  category?: string
  isCompleted?: boolean
  completed?: boolean
}
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    if (!isFirebaseReady) {
      setTasks(lsGet<Task[]>('tasks', []))
      return
    }
    const unsub = onSnapshot(collection(db, 'tasks'), snapshot => {
      const items = snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Task, 'id'>),
      }))
      setTasks(items)
    })
    return () => unsub()
  }, [])

  const toggleDone = async (task: Task) => {
    const id = task.id
    const current = Boolean(task.isCompleted ?? task.completed)
    if (!isFirebaseReady) {
      const list = lsGet<Task[]>('tasks', []).map(t => {
        if (t.id !== id) return t
        const done = !(t.isCompleted ?? t.completed)
        // prefer maintaining whichever key exists
        if (typeof t.isCompleted === 'boolean') return { ...t, isCompleted: done }
        if (typeof t.completed === 'boolean') return { ...t, completed: done }
        return { ...t, isCompleted: done }
      })
      lsSet('tasks', list)
      setTasks(list)
      return
    }
    const doneKey = 'isCompleted' in task ? 'isCompleted' : ('completed' in task ? 'completed' : 'isCompleted')
    await updateDoc(doc(db, 'tasks', id), { [doneKey]: !current } as any)
  }

  return (
    <div>
      {!isFirebaseReady && (
        <p className="text-sm text-gray-600">Add Firebase keys to .env.local to load tasks.</p>
      )}
      {tasks.map(task => (
        <div key={task.id} className="border-b py-2 flex justify-between items-center">
          <div>
            <p className={(task.isCompleted ?? task.completed) ? 'line-through text-gray-500' : ''}>{task.title}</p>
            <small className="text-gray-600">
              {(task.assignedTo ?? task.assignee) || 'Unassigned'}{task.category ? ` • ${task.category}` : ''}
            </small>
          </div>
          <input
            type="checkbox"
            checked={Boolean(task.isCompleted ?? task.completed)}
            onChange={() => toggleDone(task)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
      )}
    </div>
  )
}
