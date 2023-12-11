import http from 'http';
import config from './config';
import app from './setup/express';
import mongo from './setup/mongo';
import errorHandlers from './middlewares/errorHandlers';
import router from './routes';

(async () => {
  await mongo.connect(config);
  const expressApp = app.start(router, errorHandlers);
  const httpServer = http.createServer(expressApp);
  httpServer.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
})();
