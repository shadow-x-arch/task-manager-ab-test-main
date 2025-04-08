import { create } from "zustand";

export type TaskStatusType = "completed" | "in-progress" | "todo" | "sideTasks";
interface TaskStore {
  tasks: TaskType[];
  setTasks: (todo: TaskType[]) => void;
  completedTodos: number[];
  setCompletedTodos: (todo: number[]) => void;
  show: "all" | TaskStatusType;
  setShow: (show: "all" | TaskStatusType) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (todo) => set({ tasks: todo }),
  completedTodos: [],
  setCompletedTodos: (todos) => set({ completedTodos: todos }),
  show: "all",
  setShow: (showing) => set({ show: showing }),
}));

export interface TaskType {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "todo" | "sideTasks";
  userId: number[];
}
[];
