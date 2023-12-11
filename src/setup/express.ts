import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import customizeReqRes from '../middlewares/customizeReqRes';

const app = express();
app.use(customizeReqRes);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

export default {
  start: (routes: Router, errorHandlers: any) => {
    app.use(routes);
    app.use(errorHandlers.handleNotFound);
    app.use(errorHandlers.handleError);
    return app;
  }
};
