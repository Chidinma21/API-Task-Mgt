import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createUserTask, getTask } from '../repositories/tasks';
import { generateShortId } from '../utils/helpers';

export const createTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const task: Partial<Task> = {};

    const userId = 'appUser'; // Add userId when auth is done
    const taskId = generateShortId();

    for (const field of [
      'title',
      'priority',
      'status',
      'tags',
      'description',
      'dueDate'
    ]) {
      if (req.body[field] !== undefined) {
        task[field as keyof Task] = req.body[field];
      }
    }

    task['userId'] = userId; // Add userId when auth is done
    task['taskId'] = taskId;

    const existingTask = await getTask(taskId);

    if (existingTask) {
      return res.respond(httpStatus.BAD_REQUEST, 'Duplicate task ID', false);
    }

    await createUserTask(task as Task);

    return res.respond(httpStatus.OK, 'Successfully created task', true, {
      task
    });
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Create task request errored - ${error.message}`,
      false
    );
  }
};
