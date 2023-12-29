interface Task {
    userId: string;
    taskId: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority: string;
    status: string;
    tags: string[];
}