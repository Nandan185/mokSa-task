import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import type { Task } from "../types/task"
import { api } from "../services/api"
import KanbanBoard from "./KanbanBoard"
import NewTaskForm from "./NewTaskForm"

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const fetchedTasks = await api.getTasks()
    setTasks(fetchedTasks)
  }

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    const createdTask = await api.createTask(newTask)
    setTasks([...tasks, createdTask])
    setIsNewTaskFormOpen(false)
  }

  const handleUpdateTaskStatus = async (taskId: number, newStatus: Task["status"]) => {
    await api.updateTaskStatus(taskId, newStatus)
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-gray-800">Task Management Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setIsNewTaskFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <DndProvider backend={HTML5Backend}>
            <KanbanBoard tasks={tasks} onUpdateTaskStatus={handleUpdateTaskStatus} />
          </DndProvider>
        </div>
      </main>

      {isNewTaskFormOpen && <NewTaskForm onAddTask={handleAddTask} onClose={() => setIsNewTaskFormOpen(false)} />}
    </div>
  )
}

