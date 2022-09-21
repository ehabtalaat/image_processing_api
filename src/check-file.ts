import { promises as fs } from 'fs';
import path from 'path';
import { ImageParameter } from './image_parameters';


class CheckFile {

    // paths of full images and thumb
    static imageFullPath = path.resolve(__dirname, '../assets/images/full');
    static resizeThumbPath = path.resolve(__dirname, '../assets/images/thumb');


    //getExistedImageNames
    static async getExistedImageNames(): Promise<string[]> {
      try {
        return (await fs.readdir(CheckFile.imageFullPath)).map(
          (filename: string): string => filename.split('.')[0]
        ); 
      } catch {
        return [];
      }
    } 

    // Check if image exists
  static async isFileExists(filename: string = ''): Promise<boolean> {
    if (!filename) {
      return false; 
    }
    return (await CheckFile.getExistedImageNames()).includes(filename);
  }

    // Check if thumb exists
  static async isThumbExist(params: ImageParameter): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; 
    }

    // set path
    const filePath: string = path.resolve(
      CheckFile.resizeThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

}

export default CheckFile;