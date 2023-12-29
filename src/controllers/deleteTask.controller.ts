import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { deleteTask, getTask } from '../repositories/tasks';

export const deleteUserTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.body;

    const task = await getTask(taskId as string);

    // Cater for if task does not belong to user (after auth)

    if (!task) {
      return res.respond(
        httpStatus.NOT_FOUND,
        `Could not find task with id - ${taskId}`,
        true,
        {
          task
        }
      );
    }

    await deleteTask(taskId as string);

    return res.respond(httpStatus.OK, 'Successfully deleted task', true);
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Delete task request errored - ${error.message}`,
      false
    );
  }
};
