import express from 'express';
import processingimage from './api/processing-image';

const routes: express.Router = express.Router();

routes.use('/api/processing-image', processingimage);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.render('main');
  }
);

export default routes;
