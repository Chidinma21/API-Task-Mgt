import { Response } from 'express';
import { v4 } from 'uuid';

export const generateId = () => v4()

export const generateShortId = () => v4().split('-')[0]

export const respond =
  (res: Response) =>
  (status: number, message: string, success = true, data: any = undefined) => {
    res.status(status).json({
      success,
      message,
      ...(data && data)
    });
  };
