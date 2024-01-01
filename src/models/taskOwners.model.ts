import mongoose, { Schema } from 'mongoose';

const taskOwnersSchema = new Schema<TaskOwner>(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskOwnersSchema.index({ userId: 1 }, { unique: true });
const TaskOwnerModel = mongoose.model<TaskOwner>(
  'TaskOwner',
  taskOwnersSchema
);

export { TaskOwnerModel };
