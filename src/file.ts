import { promises as fs } from 'fs';
import path from 'path';
import resizeingImage from './resizing-image';


// parameters
interface ImageParameter {
  filename?: string;
  width?: string;
  height?: string;
}

class File {

    // paths of full images and thumb
    static imagesFullPath = path.resolve(__dirname, '../assets/images/full');
    static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');


    //getExistedImageNames
    static async getExistedImageNames(): Promise<string[]> {
      try {
        return (await fs.readdir(File.imagesFullPath)).map(
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
    return (await File.getExistedImageNames()).includes(filename);
  }

    // Check if thumb exists
  static async isThumbExist(params: ImageParameter): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false; 
    }

    // set path
    const filePath: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

//get the path
  static async getFilePath(params: ImageParameter): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    // make image path
    let filePath: string;
    if( params.width && params.height){
      filePath =   path.resolve(
        File.imagesThumbPath,
        `${params.filename}-${params.width}x${params.height}.jpg`
      );
    }else{
      filePath = path.resolve(File.imagesFullPath, `${params.filename}.jpg`);
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
      await fs.access(File.imagesThumbPath);
      // Path exists
    } catch {
      fs.mkdir(File.imagesThumbPath);
    }
  }


  static async createThumb(params: ImageParameter): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null; // Nothing to do
    }

    const filePathFull: string = path.resolve(
      File.imagesFullPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      File.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    // resize original image and store  it  as thumb
    return await resizeingImage({
      src: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height)
    });
  }
}

export default File;