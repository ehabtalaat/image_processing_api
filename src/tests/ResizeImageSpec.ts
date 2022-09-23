import CreateFile from '../create-file';

describe('test if  image resizing with invalid number ', (): void => {
  it('expect an error (invalid numbers in width and height)', async (): Promise<void> => {
    const error: null | string = await CreateFile.create({
      filename: 'loin1',
      width: '-100', // not positive number
      height: '-500', // not positive number
    });
    expect(error).not.toBeNull();
  });
});
