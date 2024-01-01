import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { getAllTasks } from '../../repositories/tasks';
import { evaluateUser } from '../../utils/helpers';

export const getUserTasks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const user = await evaluateUser(req);

    const tasks = await getAllTasks(user!.userId as string);

    return res.respond(
      httpStatus.OK,
      'Successfully retrieved user tasks',
      true,
      {
        tasks
      }
    );
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Get user tasks request errored - ${error.message}`,
      false
    );
  }
};
