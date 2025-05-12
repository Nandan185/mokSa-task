import { useDrag } from "react-dnd"
import type { Task } from "../types/task"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow p-4 cursor-move transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "hover:shadow-md hover:bg-gray-50"
      }`}
    >
      <h3 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h3>
      <p className="text-xs text-gray-600">{task.description}</p>
    </div>
  )
}

