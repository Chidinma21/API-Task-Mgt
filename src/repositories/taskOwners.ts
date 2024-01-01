import { TaskOwnerModel } from '../models/taskOwners.model';

async function createNewTaskOwner(taskOwnerDetail: TaskOwner) {
  return await TaskOwnerModel.create(taskOwnerDetail);
}

async function getTaskOwner(userId: string) {
  return await TaskOwnerModel.findOne({ userId });
}

async function getTaskOwnerByEmail(email: string) {
  return await TaskOwnerModel.findOne({ email });
}

async function deleteTaskOwner(userId: string) {
  return await TaskOwnerModel.deleteOne({ userId });
}

export {
  createNewTaskOwner,
  getTaskOwner,
  getTaskOwnerByEmail,
  deleteTaskOwner
};
