import supertest from 'supertest';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoint', (): void => {
  it('returns 404 for not found endpoint', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/hello_news');

    expect(response.status).toBe(404);
  });
});
