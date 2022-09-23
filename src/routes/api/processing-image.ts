import express from 'express';
// import { ImageParameter } from '../../image_parameters';
import FilePath from '../../file-path';
import CheckFile from '../../checkfile';
import CreateFile from '../../create-file';
import validatation from '../validatation';

const processingImage: express.Router = express.Router();

processingImage.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage: null | string = await validatation(request.query);
    if (validationMessage) {
      return response.render('error', { message: validationMessage });

      /// return;
    }

    let error: null | string = '';

    // Create thumb if not yet available
    if (!(await CheckFile.isThumbExist(request.query))) {
      error = await CreateFile.create(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // get image path and show the image
    const path: null | string = await FilePath.get(request.query);

    if (path) {
      response.sendFile(path);
    } else {
      return response.render('error', { message: 'unexpected error' });
    }
  }
);

export default processingImage;
