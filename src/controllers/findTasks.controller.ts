import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { getAllTasks, getTask } from '../repositories/tasks';

export const getUserTasks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { userId } = req.query; //Remove this from query and get user from store after auth is implemented

    const tasks = await getAllTasks(userId as string);

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
