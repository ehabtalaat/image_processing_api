import { promises as fs } from 'fs';
import path from 'path';
import { ImageParameter } from './image_parameters';
import CheckFile from './checkfile';

class FilePath {
  //get the path
  static async get(params: ImageParameter): Promise<null | string> {
    if (!params.filename) {
      return null;
    }

    let filePath: string;
    if (params.width != null && params.height != null) {
      filePath = path.resolve(
        CheckFile.resizeThumbPath,
        `${params.filename}-${params.width}x${params.height}.jpg`
      );
    } else {
      filePath = path.resolve(CheckFile.FullPath, `${params.filename}.jpg`);
    }

    // Check if image exists
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }
}

export default FilePath;
