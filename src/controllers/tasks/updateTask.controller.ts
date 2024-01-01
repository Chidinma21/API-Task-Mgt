import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { getTask, updateUserTask } from '../../repositories/tasks';
import { evaluateUser } from '../../utils/helpers';

export const updateTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.body;
    const user = await evaluateUser(req);

    const task = await getTask(taskId);

    if (!task) {
      return res.respond(httpStatus.NOT_FOUND, 'Task ID does not exist', false);
    }

    if (task.userId !== user?.userId) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `Task ${taskId} does not belong to ${user!.userId}`
      );
    }

    const taskUpdate: Record<string, any> = {};

    for (const field of [
      'title',
      'priority',
      'status',
      'tags',
      'description',
      'dueDate'
    ]) {
      if (req.body[field] !== undefined) {
        taskUpdate[field] = req.body[field];
      }
    }

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
      `Update task request errored errored - ${error.message}`,
      false
    );
  }
};
