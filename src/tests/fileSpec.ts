// import { promises as fs } from 'fs';
// import path from 'path';
import File from './../file';

describe('Test image resizing (sharp)', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'loin1',
      width: '-100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (invalid height value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'loin1',
      width: '100',
      height: 'sdsd',
    });
    expect(error).not.toBeNull();
  });
});
