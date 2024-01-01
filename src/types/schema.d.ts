type Doc = import('mongoose').Document;

type TaskStatus = import('./enums').TaskStatus;
type TaskPriority = import('./enums').TaskPriority;

interface Task {
  userId: string;
  taskId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[];
}

interface TaskOwner {
  userId: string;
  email: string;
  password: string;
}
