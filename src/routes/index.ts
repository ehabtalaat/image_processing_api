
import express from 'express';
import processingimage from './api/processing-image';
import CheckFile from './../check-file'
import File from './../file'

const routes: express.Router = express.Router();

routes.use('/api/processing-image', processingimage);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    
    response.render('index');

  }
);

export default routes;
