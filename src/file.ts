import { promises as fs } from 'fs';
import path from 'path';
import resizeingImage from './resizing-image';
import { ImageParameter } from './image_parameters';

class File {
  // paths of full images and thumb
  static imageFullPath = path.resolve(__dirname, '../assets/images/full');
  static resizeThumbPath = path.resolve(__dirname, '../assets/images/thumb');

  //get the path
  static async getFilePath(params: ImageParameter): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    // make image path
    let filePath: string;
    if (params.width && params.height) {
      filePath = path.resolve(
        File.resizeThumbPath,
        `${params.filename}-${params.width}x${params.height}.jpg`
      );
    } else {
      filePath = path.resolve(File.imageFullPath, `${params.filename}.jpg`);
    }

    // Check if image exists
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  //set thumb path.

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(File.resizeThumbPath);
      // Path exists
    } catch {
      fs.mkdir(File.resizeThumbPath);
    }
  }

  static async createThumb(params: ImageParameter): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
      File.imageFullPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      File.resizeThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    // resize original image and store  it  as thumb
    return await resizeingImage({
      src: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }
}

export default File;
