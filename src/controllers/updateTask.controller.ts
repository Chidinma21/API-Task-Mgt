import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { updateUserTask } from '../repositories/tasks';

export const updateTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.body;

    const taskUpdate: Record<string, any> = {};

    for (const field of ['title', 'priority', 'status', 'tags', 'description', 'dueDate']) {
      if (req.body[field] !== undefined) {
        taskUpdate[field] = req.body[field];
      }
    }
    //Make the provided tags push to the existing one and not completely update it

    const updatedTask = await updateUserTask(taskId, taskUpdate);

    return res.respond(
      httpStatus.OK,
      `Successfully updated task [${taskId}]`,
      true,
      {
        data: { ...updatedTask }
      }
    );
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Create task errored - ${error.message}`,
      false
    );
  }
};
