import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

import {
  getTaskOwner,
  getTaskOwnerByEmail
} from '../../repositories/taskOwners';
import { signJwt } from '../../middlewares/signJwt';

export const login = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { userId, email, password } = req.body;

    const taskOwner = userId
      ? await getTaskOwner(userId)
      : await getTaskOwnerByEmail(email);

    if (!taskOwner) {
      return res.respond(
        httpStatus.NOT_FOUND,
        `No task owner found with these details`,
        false
      );
    }
    const verifiedPassword = bcrypt.compareSync(password, taskOwner.password);

    if (!verifiedPassword) {
      return res.respond(
        httpStatus.BAD_REQUEST,
        `Incorrect password, try again`,
        false
      );
    }

    const token = await signJwt(taskOwner.userId, taskOwner.email);

    return res.respond(
      httpStatus.OK,
      `Successfully logged in task owner - [${userId}]`,
      true,
      {
        taskOwner,
        token
      }
    );
  } catch (error: any) {
    res.respond(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Login request errored - ${error.message}`,
      false
    );
  }
};
