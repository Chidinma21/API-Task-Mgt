import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { getTask } from '../repositories/tasks';

export const getSingleTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.query;

    const task = await getTask(taskId as string);

    // Cater for if task does not belong to user

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

    return res.respond(httpStatus.OK, 'Successfully retrieved task', true, {
      task
    });
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Get task request errored - ${error.message}`,
      false
    );
  }
};
