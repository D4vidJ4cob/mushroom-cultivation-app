import { INestApplication } from '@nestjs/common';
import { createTestApp } from './helpers/create-app';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { clearSpecies, seedSpecies } from './seeds/species';
import request from 'supertest';
import { clearUsers, seedUsers } from './seeds/users';
import { login, loginAdmin } from './helpers/login';
import testAuthHeader from './helpers/testAuthHeaders';
import {
  clearMotherCultures,
  seedMotherCultures,
} from './seeds/motherCultures';

describe('Mother Cultures', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  const url = '/api/mother-cultures';
  let userAuthToken: string;
  let adminToken: string;

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedSpecies(drizzle);
    await seedUsers(app, drizzle);
    await seedMotherCultures(drizzle);

    userAuthToken = await login(app);
    adminToken = await loginAdmin(app);
  });

  afterAll(async () => {
    await clearMotherCultures(drizzle);
    await clearSpecies(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/mother-cultures', () => {
    it('should 200 and return all mother cultures', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(3);

      const names = response.body.items.map((mc: any) => mc.name);
      expect(names).toEqual(['Lions Mane', 'Blue Oyster', 'Chestnut']);

      expect(response.body.items[0].species).toBeDefined();
      expect(response.body.items[0].species.name).toBe('Lions Mane');
    });
    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/mother-cultures/:id', () => {
    it('should 200 and return mother culture with related species', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Lions Mane');
      expect(response.body.speciesId).toBe(1);
      expect(response.body.species).toBeDefined();
    });

    it('should 404 when requesting not existing mother culture', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/10`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        'Mother Culture with ID 10 not found.',
      );
    });

    it('should 400 when invalid speciesId', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/invalid`)
        .auth(userAuthToken, { type: 'bearer' });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'Validation failed (numeric string is expected)',
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(`${url}/1`));
  });

  describe('POST /api/mother-cultures', () => {
    it('should 201 and return the created mother culture', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Piopinno',
          inoculationDate: '2025-01-27',
          speciesId: 1,
          characteristic: 'Fast growing',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('Piopinno');
      expect(response.body.inoculationDate).toMatch(/2025-01-27/);
      expect(response.body.speciesId).toBe(1);
      expect(response.body.species).toMatchObject({
        id: 1,
        name: 'Lions Mane',
      });
    });

    it('should 400 when missing required fields', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({})
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('name');
      expect(response.body.details.body).toHaveProperty('speciesId');
      expect(response.body.details.body).toHaveProperty('inoculationDate');
    });

    it('should 400 when missing speciesId', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Test Culture',
          inoculationDate: '2025-01-20',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('speciesId');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({
        name: 'New Mother Culture',
        speciesId: 1,
        inoculationDate: '2025-01-20',
      }),
    );
  });

  describe('PUT /api/mother-cultures/:id', () => {
    it('should 200 and return the updated mother culture', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'shitake',
          inoculationDate: '2025-01-27',
          speciesId: 1,
          characteristic: 'Fast growing',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      expect(response.body.name).toBe('shitake');
      expect(response.body.inoculationDate).toMatch(/2025-01-27/);
      expect(response.body.speciesId).toBe(1);
      expect(response.body.species).toMatchObject({
        id: 1,
        name: 'Lions Mane',
      });
    });

    it('should 404 when updating not existing transaction', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/200`)
        .send({
          name: 'shitake',
          inoculationDate: '2025-01-27',
          speciesId: 1,
          characteristic: 'Fast growing',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        'Mother Culture with ID 200 not found.',
      );
    });

    it('should 200 when updating only name', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          name: 'Updated Name',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Updated Name');
    });
  });

  describe('DELETE /api/mother-cultures/:id', () => {
    it('should 204 and return nothing', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 with not existing transaction', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        'Mother Culture with ID 999 not found.',
      );
    });

    it('should 400 with invalid transaction id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/invalid`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'Validation failed (numeric string is expected)',
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).delete(`${url}/1`));
  });
});
