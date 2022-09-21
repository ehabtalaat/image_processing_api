
import express from 'express';
import processingimage from './api/processing-image';

const routes: express.Router = express.Router();

routes.use('/api/processing-image', processingimage);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    
    response.send(
      `<div class="page"><h3>Welcome to udacity first project  image processing api</h3>
<p>Examples Of Image exists:<ul>
        <li><a href="/api/processing-image?filename=loin1">
        /api/processing-image?filename=loin1</a>
        </li><li><a href="/api/processing-image?filename=loin1&width=250&height=250">
        /api/processing-image?filename=loin1&width=250&height=250</a></li></ul></p></div>`
    );
  }
);

export default routes;
