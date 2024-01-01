import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { getTask } from '../../repositories/tasks';
import { evaluateUser } from '../../utils/helpers';

export const getSingleTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { taskId } = req.query;
    const user = await evaluateUser(req);

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

    if (task.userId !== user?.userId) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `Task ${taskId} does not belong to ${user!.userId}`,
        false
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
