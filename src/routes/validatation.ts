// import express from 'express';
import CheckFile from '../checkfile';
import { ImageParameter } from '../image_parameters';

const validatation = async (query: ImageParameter): Promise<null | string> => {
  // check if file exists
  if (!(await CheckFile.isFileExists(query.filename))) {
    const availableImageNames: string = (
      await CheckFile.getExistedImageNames()
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
    return 'enter positive width number';
  }

  // Check  if height equal number
  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'enter positive height number';
  }

  return null;
};

export default validatation;
