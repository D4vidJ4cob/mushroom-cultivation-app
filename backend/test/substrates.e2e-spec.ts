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
  clearLiquidCultures,
  seedLiquidCultures,
} from './seeds/liquidCultures';
import {
  clearMotherCultures,
  seedMotherCultures,
} from './seeds/motherCultures';
import { clearGrainSpawns, seedGrainSpawns } from './seeds/grainSpawns';
import { clearSubstrates, seedSubstrates } from './seeds/substrates';

describe('Substrates', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  const url = '/api/substrates';
  let userAuthToken: string;
  let adminToken: string;

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedSpecies(drizzle);
    await seedUsers(app, drizzle);
    await seedMotherCultures(drizzle);
    await seedLiquidCultures(drizzle);
    await seedGrainSpawns(drizzle);
    await seedSubstrates(drizzle);

    userAuthToken = await login(app);
    adminToken = await loginAdmin(app);
  });

  afterAll(async () => {
    await clearSubstrates(drizzle);
    await clearGrainSpawns(drizzle);
    await clearLiquidCultures(drizzle);
    await clearMotherCultures(drizzle);
    await clearSpecies(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/substrates', () => {
    it('should 200 and return all substrates', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(4);

      expect(response.body.items[0].grainSpawn).toBeDefined();

      expect(response.body.items[0].contaminationStatus).toBe(false);
      expect(response.body.items[2].contaminationStatus).toBeNull();
      expect(response.body.items[3].contaminationStatus).toBe(true);
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/substrates/:id', () => {
    it('should 200 and return substrate with related grain spawn', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.grainSpawnId).toBe(1);
      expect(response.body.inoculationDate).toMatch(/2025-02-01/);
      expect(response.body.incubationDate).toMatch(/2025-02-15/);
      expect(response.body.contaminationStatus).toBe(false);

      expect(response.body.grainSpawn).toBeDefined();
      expect(response.body.grainSpawn.id).toBe(1);
    });

    it('should 404 when requesting not existing substrate', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/999`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Substrate with ID 999 not found.');
    });

    it('should 400 when invalid substrate id', async () => {
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

  describe('POST /api/substrates', () => {
    it('should 201 and return the created substrate', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          grainSpawnId: 1,
          inoculationDate: '2025-02-10',
          incubationDate: '2025-02-24',
          contaminationStatus: false,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.grainSpawnId).toBe(1);
      expect(response.body.inoculationDate).toMatch(/2025-02-10/);
      expect(response.body.incubationDate).toMatch(/2025-02-24/);
      expect(response.body.contaminationStatus).toBe(false);
      expect(response.body.grainSpawn).toBeDefined();
    });

    it('should 201 with null contamination status', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          grainSpawnId: 2,
          inoculationDate: '2025-02-11',
          incubationDate: '2025-02-25',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.contaminationStatus).toBeNull();
    });

    it('should 400 when missing required fields', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({})
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('grainSpawnId');
      expect(response.body.details.body).toHaveProperty('inoculationDate');
    });

    it('should 400 when missing grainSpawnId', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          inoculationDate: '2025-02-10',
          incubationDate: '2025-02-24',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('grainSpawnId');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({
        grainSpawnId: 1,
        inoculationDate: '2025-02-10',
        incubationDate: '2025-02-24',
      }),
    );
  });

  describe('PUT /api/substrates/:id', () => {
    it('should 200 and return the updated substrate', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          grainSpawnId: 2,
          inoculationDate: '2025-02-05',
          incubationDate: '2025-02-20',
          contaminationStatus: true,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      expect(response.body.grainSpawnId).toBe(2);
      expect(response.body.inoculationDate).toMatch(/2025-02-05/);
      expect(response.body.incubationDate).toMatch(/2025-02-20/);
      expect(response.body.contaminationStatus).toBe(true);
    });

    it('should 404 when updating not existing substrate', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/999`)
        .send({
          grainSpawnId: 1,
          inoculationDate: '2025-02-05',
          incubationDate: '2025-02-20',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Substrate with ID 999 not found.');
    });

    it('should 200 when updating only contamination status', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/2`)
        .send({
          contaminationStatus: true,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(2);
      expect(response.body.contaminationStatus).toBe(true);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({
        contaminationStatus: false,
      }),
    );
  });

  describe('DELETE /api/substrates/:id', () => {
    it('should 204 and return nothing', async () => {
      const createResponse = await request(app.getHttpServer())
        .post(url)
        .send({
          grainSpawnId: 1,
          inoculationDate: '2025-02-12',
          incubationDate: '2025-02-26',
        })
        .auth(adminToken, { type: 'bearer' });

      const id = createResponse.body.id;

      const response = await request(app.getHttpServer())
        .delete(`${url}/${id}`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 with not existing substrate', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Substrate with ID 999 not found.');
    });

    it('should 400 with invalid substrate id', async () => {
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
