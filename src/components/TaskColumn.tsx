import { useDrop } from "react-dnd"
import type { Task, TaskStatus } from "../types/task"
import TaskCard from "./TaskCard"

interface TaskColumnProps {
  status: TaskStatus
  tasks: Task[]
  onUpdateTaskStatus: (taskId: number, newStatus: TaskStatus) => void
}

export default function TaskColumn({ status, tasks, onUpdateTaskStatus }: TaskColumnProps) {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => {
      onUpdateTaskStatus(item.id, status)
    },
  })

  return (
    <div ref={drop} className="flex-1 min-w-[250px]">
      <h2 className="font-semibold text-lg text-gray-700 mb-3">
        {status} ({tasks.length})
      </h2>
      <div className="bg-gray-200 p-3 rounded-lg min-h-[500px]">
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

