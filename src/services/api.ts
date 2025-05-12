import axios from "axios"
import type { Task, TaskStatus } from "../types/task"

const API_URL = "https://jsonplaceholder.typicode.com"

export const api = {
  
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/todos`)
    return response.data.slice(0, 10).map((task: any) => ({
      id: task.id,
      title: task.title,
      description: "Description",
      status: task.completed ? "Done" : "To Do",
    }))
  },

  createTask: async (task: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post(`${API_URL}/todos`, task)
    return {
      ...task,
      id: response.data.id,
    }
  },

  updateTaskStatus: async (taskId: number, status: TaskStatus): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/todos/${taskId}`, { status })
    return response.data
  },
}

