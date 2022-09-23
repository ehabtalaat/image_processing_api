import express from 'express';
import validatation from '../validatation';
import path from 'path';
import resizeingImage from '../../resizing-image';
import fs from 'fs';

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

    //pathes
    const filePathThumb = path.resolve(
      `assets/images/thumb/${request.query.filename}-${request.query.width}x${request.query.height}.jpg`
    );
    const filePathFull = path.resolve(
      `assets/images/full/${request.query.filename}.jpg`
    );

    //names pf existed images 
    const imagesFilenames: string[] = fs
      .readdirSync(path.resolve('assets/images/full'))
      .map((filename) => filename.split('.')[0]);

    if (imagesFilenames.indexOf(request.query.filename as string) < 0) {
      return response.render('error', { message: 'sorry file was not found' });
    }

    //check width and height and file name
    if (
      !request.query.width ||
      !request.query.height ||
      !request.query.filename
    ) {
      error = null;
    } else {

      error = await resizeingImage({
        src: filePathFull,
        target: filePathThumb,
        width: parseInt(request.query.width as string),
        height: parseInt(request.query.height as string),
      });
    }
    //}

    // Handle image processing error
    if (error) {
      response.send(error);
    }

    let new_path: null | string;

    if (request.query.width != null && request.query.height != null) {
      new_path = path.resolve(
        `assets/images/thumb/${request.query.filename}-${request.query.width}x${request.query.height}.jpg`
      );
    } else {
      new_path = path.resolve(
        `assets/images/full/${request.query.filename}.jpg`
      );
    }
    // get image path and show the image

    if (new_path) {
      response.sendFile(new_path);
    } else {
      return response.render('error', { message: 'sorry unexpected error happened' });
    }
  }
);

export default processingImage;
