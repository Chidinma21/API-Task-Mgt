import { ErrorRequestHandler, RequestHandler } from 'express';
import httpStatus from 'http-status';
import { Config } from '../types';

const handleNotFound: RequestHandler = (req, res, next) => {
  res.respond(httpStatus.NOT_FOUND, 'Requested resource not found', false);
  res.end();
};

const handleError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    res.respond(
      err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      'Duplicate record supplied',
      false,
      { errors: {} }
    );
    res.end();
  } else {
    res.respond(
      err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err.message,
      false,
      { errors: err }
    );
    res.end();
  }
};

const handleListenError = (config: Config) => (err: Error) => {
  if (err) {
    console.log(`Error : ${err}`);
    process.exit(-1);
  }
  console.log(`${config.app} is running on ${config.port}`);
};

export default {
  handleError,
  handleNotFound,
  handleListenError
};
