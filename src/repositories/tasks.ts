import { TaskModel } from '../models/tasks.model';

async function createUserTask(taskDetail: Task) {
  return await TaskModel.create(taskDetail);
}

async function updateUserTask(taskId: string, taskDetail: Partial<Task>) {
  return await TaskModel.updateOne({ taskId }, taskDetail);
}

async function getTask(taskId: string) {
  return await TaskModel.findOne({ taskId });
}

async function getAllTasks(userId: string) {
  return await TaskModel.find({ userId });
}

async function deleteTask(taskId: string) {
  return await TaskModel.deleteOne({ taskId });
}

export { createUserTask, updateUserTask, getTask, getAllTasks, deleteTask };
