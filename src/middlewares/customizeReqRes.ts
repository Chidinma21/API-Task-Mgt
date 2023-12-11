import { RequestHandler } from 'express';
import { respond } from '../utils/helpers';

const customizeReqRes: RequestHandler = (req, res, next) => {
  req.store = {};
  res.respond = respond(res);
  next();
};

export default customizeReqRes;
