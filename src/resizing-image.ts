import sharp from 'sharp';

// params to resize
interface resizeParams {
  src: string;
  target: string;
  width: number;
  height: number;
}


const resizeingImage = async (
  params: resizeParams
): Promise<null | string> => {
  try {
    await sharp(params.src)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch {
    return "we can't resize the image";
  }
};

export default resizeingImage;
