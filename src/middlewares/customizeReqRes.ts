import { RequestHandler } from 'express';
import { respond } from '../utils/helpers';

const customizeReqRes: RequestHandler = (req, res, next) => {
  res.respond = respond(res);
  req.store = req.store || {};
  next();
};

export default customizeReqRes;
