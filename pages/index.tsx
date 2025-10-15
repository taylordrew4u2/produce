import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function Home() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎤 Producer Tasks</h1>
      <TaskForm />
      <TaskList />
    </main>
  )
}
