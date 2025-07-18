import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { deleteTask, getTask } from '../../repositories/tasks';
import { evaluateUser } from '../../utils/helpers';

export const deleteUserTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.query;

    const task = await getTask(taskId as string);

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

    const user = await evaluateUser(req);

    if (task.userId !== user?.userId) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `Task ${taskId} does not belong to ${user!.userId}`,
        false
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
