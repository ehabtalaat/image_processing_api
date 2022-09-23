import { ImageParameter } from '../image_parameters';

const validatation = async (query: ImageParameter): Promise<null | string> => {
  if (query.width == null && query.height == null) {
    return null;
  }

  const width: number = parseInt(query.width as string);
  if (Number.isNaN(width) || width <= 0) {
    return 'enter positive width number';
  }

  const height: number = parseInt(query.height as string);
  if (Number.isNaN(height) || height <= 0) {
    return 'enter positive height number';
  }

  return null;
};

export default validatation;
