import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { getTaskOwner, getTaskOwnerByEmail } from '../repositories/taskOwners';

export const generateId = () => v4();

export const generateShortId = () => 'TSK' + v4().split('-')[0];

export const respond =
  (res: Response) =>
  (status: number, message: string, success = true, data: any = undefined) => {
    res.status(status).json({
      success,
      message,
      ...(data && data)
    });
  };

export const evaluateUser = async (req: Request) => {
  try {
    const userId = req.store.user.userId;
    const email = req.store.user.email;

    const user = userId
      ? await getTaskOwner(userId)
      : await getTaskOwnerByEmail(email);

    return user;
  } catch (error) {
    throw new Error('Could not evaluate user');
  }
};
