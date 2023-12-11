import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AnySchema } from 'joi';

type Path = 'params' | 'query' | 'body' | 'header';

const validate = (schema: Record<string, AnySchema>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await Promise.all(
        Object.entries(schema).map(([path, schema]) =>
          schema.validateAsync(req[path as Path])
        )
      );
      return next();
    } catch (err) {
      next({ ...(err as Error), statusCode: httpStatus.BAD_REQUEST });
    }
  };
};

export { validate };
