import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import {
  createNewTaskOwner,
  getTaskOwner,
  getTaskOwnerByEmail
} from '../../repositories/taskOwners';
import { signJwt } from '../../middlewares/signJwt';

export const signUp = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { userId, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTaskOwner = {
      userId,
      email,
      password: hashedPassword
    };

    const existingTaskId = await getTaskOwner(userId);
    const existingEmail = await getTaskOwnerByEmail(email);

    if (existingTaskId) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `User with userId already exists`,
        false
      );
    }

    if (existingEmail) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `User with email already exists`,
        false
      );
    }

    const taskOwner = await createNewTaskOwner(newTaskOwner);

    const token = await signJwt(userId, email);

    return res.respond(
      httpStatus.OK,
      `Successfully created task owner - [${userId}]`,
      true,
      {
        taskOwner,
        token
      }
    );
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Sign up request errored - ${error.message}`,
      false
    );
  }
};
