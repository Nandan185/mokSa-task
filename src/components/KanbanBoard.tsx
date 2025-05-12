import type { Task, TaskStatus } from "../types/task"
import TaskColumn from "./TaskColumn"

interface KanbanBoardProps {
  tasks: Task[]
  onUpdateTaskStatus: (taskId: number, newStatus: TaskStatus) => void
}

const columns: TaskStatus[] = ["To Do", "In Progress", "Done"]

export default function KanbanBoard({ tasks, onUpdateTaskStatus }: KanbanBoardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {columns.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          onUpdateTaskStatus={onUpdateTaskStatus}
        />
      ))}
    </div>
  )
}

