'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, doc, updateDoc, QueryDocumentSnapshot } from 'firebase/firestore'
import { db, isFirebaseReady } from '@/lib/firebase'
import { lsGet, lsSet } from '@/lib/localStore'

interface Task {
  id: string
  title: string
  assignedTo: string
  category: string
  isCompleted: boolean
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

  const toggleDone = async (id: string, current: boolean) => {
    if (!isFirebaseReady) {
      const list = lsGet<Task[]>('tasks', []).map(t => t.id === id ? { ...t, isCompleted: !current } : t)
      lsSet('tasks', list)
      setTasks(list)
      return
    }
    await updateDoc(doc(db, 'tasks', id), { isCompleted: !current })
  }

  return (
    <div>
      {tasks.map((task: Task) => (
        <div key={task.id} className="border-b py-2 flex justify-between items-center">
          <div>
            <p className={task.isCompleted ? 'line-through text-gray-500' : ''}>{task.title}</p>
            <small className="text-gray-600">
              {task.assignedTo} • {task.category}
            </small>
          </div>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleDone(task.id, task.isCompleted)}
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
