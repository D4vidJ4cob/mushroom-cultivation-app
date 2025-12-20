import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/create-app';

describe('health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/health/ping', () => {
    const url = '/api/health/ping';
    it('should 200 and return pong', async () => {
      const response = await request(app.getHttpServer()).get(url);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ pong: true });
    });
  });
});
