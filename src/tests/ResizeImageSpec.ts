import resizeingImage from '../resizing-image';
import path from 'path';
import sharp from 'sharp';

describe('test if resize function will work  ', (): void => {
  it('expect  it will work with right parameters  and except width and height', async (): Promise<void> => {
    const width = 50;

    const height = 50;

    const filename = 'loin1';

    const filePathThumb: string = path.resolve(
      `assets/images/thumb/${filename}-${width}x${height}.jpg`
    );

    const filePathFull: string = path.resolve(
      `assets/images/full/${filename}.jpg`
    );
    expect(
      await resizeingImage({
        src: filePathFull,
        target: filePathThumb,
        width: width,
        height: height,
      })
    ).toBe(null);

    const data = await sharp(filePathThumb).metadata();
    expect(data.width).toBe(50);
    expect(data.height).not.toBe(500);
  });
});
