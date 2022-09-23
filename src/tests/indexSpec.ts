import supertest from 'supertest';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  it('gets /api ', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api ');

    expect(response.status).toBe(404);
  });
});

describe('endpoint: /hello_news', (): void => {
  it('returns 404 for nout found endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/hello_news');

    expect(response.status).toBe(404);
  });
});
