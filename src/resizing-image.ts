import sharp from 'sharp';

import { resizeParams } from './image_parameters'

const resizeingImage = async (
  params: resizeParams
): Promise<null | string> => {
  try {
    await sharp(params.src)
      .resize({
        width: params.width,
        height: params.height,
        fit: sharp.fit.cover
      })
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return "we can't resize the image";
  }
};

export default resizeingImage;
