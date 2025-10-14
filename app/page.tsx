import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Produce Task Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time task management for event producers
          </p>
        </header>

        <AddTaskForm />
        <TaskList />
      </div>
    </div>
  );
}
