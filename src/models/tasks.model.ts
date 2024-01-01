import mongoose, { Schema } from 'mongoose';
import { TaskPriority, TaskStatus } from '../types/enums';

const taskSchema = new Schema<Task>(
  {
    userId: {
      type: String,
      required: true
    },
    taskId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    dueDate: {
      type: Date
    },
    priority: {
      type: String,
      required: true,
      enum: TaskPriority
    },
    status: {
      type: String,
      required: true,
      enum: TaskStatus
    },
    tags: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskSchema.index({taskId: 1}, {unique: true})
const TaskModel = mongoose.model<Task>('Task', taskSchema)

export { TaskModel }
