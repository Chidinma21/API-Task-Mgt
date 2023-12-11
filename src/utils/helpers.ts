import { Response } from 'express';
import { v4 } from 'uuid';

export const generateUuid = () => v4().replace(/-/g, '');

export const respond =
  (res: Response) =>
  (status: number, message: string, success = true, data: any = undefined) => {
    res.status(status).json({
      success,
      message,
      ...(data && data)
    });
  };
