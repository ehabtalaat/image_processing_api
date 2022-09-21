import express from 'express';
 import File from '../../file';

// image vaidations 
interface ImageParameter {
    filename?: string;
    width?: string;
    height?: string;
  }


  const validate = async (query: ImageParameter): Promise<null | string > => {
    // check if file exists
    if (!(await File.isImageAvailable(query.filename))) {
      const availableImageNames: string = (
        
        await File.getAvailableImageNames()
      ).join(', ');
      return `this file name is not exist the file names are :_ ${availableImageNames}.`;
    }
  
    // if there are not with and height
    if (!query.width && !query.height) {
     return null;
    }
  
    // Check  if width equal number

    const width: number = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
      return "enter positive width number";
    }
  
 // Check  if height equal number
     const height: number = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
      return "enter positive height number";
    }
  
    return null;
  };

  const processingImage: express.Router = express.Router();

  processingImage.get(
    '/',
    async (
      request: express.Request,
      response: express.Response
    ): Promise<void> => {

      let validationMessage: null | string = await validate(request.query);
      if (validationMessage) {
        response.send(validationMessage);
        return;
      }
  
      let error: null | string = '';
  
      // Create thumb if not yet available
      if (!(await File.isThumbAvailable(request.query))) {
        error = await File.createThumb(request.query);
      }
  
      // Handle image processing error
      if (error) {
        response.send(error);
        return;
      }
  
      // get image path and show the image
      const path: null | string = await File.getImagePath(request.query);
      if (path) {
        response.sendFile(path);
      } else {
        response.send('unexpected error');
      }
    }
  );
  
  export default processingImage;
  