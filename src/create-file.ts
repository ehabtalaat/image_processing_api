import { promises as fs } from 'fs';
import path from 'path';
import resizeingImage from './resizing-image';
import { ImageParameter } from './image_parameters';
import CheckFile from './checkfile';

class CreateFile {
  //set

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(CheckFile.resizeThumbPath);
      // Path exists
    } catch {
      fs.mkdir(CheckFile.resizeThumbPath);
    }
  }

  static async create(parameters: ImageParameter): Promise<null | string> {
    if (!parameters.filename || !parameters.width || !parameters.height) {
      return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
      CheckFile.FullPath,
      `${parameters.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      CheckFile.resizeThumbPath,
      `${parameters.filename}-${parameters.width}x${parameters.height}.jpg`
    );

    // resize original image and store  it  as thumb
    return await resizeingImage({
      src: filePathFull,
      target: filePathThumb,
      width: parseInt(parameters.width),
      height: parseInt(parameters.height),
    });
  }
}

export default CreateFile;
