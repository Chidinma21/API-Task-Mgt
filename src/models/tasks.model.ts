import mongoose, { Schema } from 'mongoose';

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
      required: true
    },
    status: {
      type: String,
      required: true
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
