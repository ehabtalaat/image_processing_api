import supertest from 'supertest';
import app from '../index';
// import { promises as fs } from 'fs';
// import path from 'path';
// import File from './../file';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  it('gets /', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');

    expect(response.status).toBe(500);
  });

  describe('endpoint: /api/processing-image', (): void => {
    it('gets /api/processing-image?filename=loin1 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/processing-image?filename=loin1'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/processing-image (no width or height)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/processing-image'
      );

      expect(response.status).toBe(500);
    });
  });

  describe('endpoint: /hello_news', (): void => {
    it('returns 404 for nout found endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/hello_news');

      expect(response.status).toBe(404);
    });
  });
});
