import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.headers?.['authorization']) {
    return res.respond(
      httpStatus.UNAUTHORIZED,
      'Provide authorization token',
      false
    );
  }

  const [, token] = req.headers['authorization'].split(' ');

  const verifyToken = jwt.verify(token, config.jwtSecKey);

  if (!verifyToken) {
    return res.respond(
      httpStatus.FORBIDDEN,
      'Invalid authorization token',
      false
    );
  }

  req.store['user'] = verifyToken;

  return next();
};
