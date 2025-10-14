export interface Task {
  id: string;
  title: string;
  assignee: string;
  category: string;
  completed: boolean;
  createdAt: number;
}

export type NewTask = Omit<Task, 'id' | 'createdAt'>;
