import { INestApplication } from '@nestjs/common';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { clearGrainSpawns, seedGrainSpawns } from './seeds/grainSpawns';
import { createTestApp } from './helpers/create-app';
import { login, loginAdmin } from './helpers/login';
import {
  seedLiquidCultures,
  clearLiquidCultures,
} from './seeds/liquidCultures';
import {
  seedMotherCultures,
  clearMotherCultures,
} from './seeds/motherCultures';
import { seedSpecies, clearSpecies } from './seeds/species';
import { seedUsers, clearUsers } from './seeds/users';
import request from 'supertest';
import testAuthHeader from './helpers/testAuthHeaders';

describe('Grain Spawns', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  const url = '/api/grain-spawns';
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

    userAuthToken = await login(app);
    adminToken = await loginAdmin(app);
  });

  afterAll(async () => {
    await clearGrainSpawns(drizzle);
    await clearLiquidCultures(drizzle);
    await clearMotherCultures(drizzle);
    await clearSpecies(drizzle);
    await clearUsers(drizzle);
    await app.close();
  });

  describe('GET /api/grain-spawn', () => {
    it('should 200 and return all grain spawns', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(3);

      expect(response.body.items[0].species).toBeDefined();
      expect(response.body.items[0].species.name).toBe('Lions Mane');

      expect(response.body.items[0].shaken).toBe(true);
      expect(response.body.items[1].shaken).toBe(false);

      expect(response.body.items[0].contaminationStatus).toBe(false);
      expect(response.body.items[2].contaminationStatus).toBeNull();
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/grain-spawn/:id', () => {
    it('should 200 and return grain spawn with related species and mother culture', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.speciesId).toBe(1);
      expect(response.body.motherCultureId).toBe(1);
      expect(response.body.liquidCultureId).toBeNull();
      expect(response.body.shaken).toBe(true);
      expect(response.body.contaminationStatus).toBe(false);
      expect(response.body.characteristic).toBe('This grain has been soaked');

      // Test relations
      expect(response.body.species).toBeDefined();
      expect(response.body.species.name).toBe('Lions Mane');
      expect(response.body.motherCulture).toBeDefined();
      expect(response.body.motherCulture.name).toBe('Lions Mane');
    });

    it('should 200 and return grain spawn with liquid culture relation', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/2`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(2);
      expect(response.body.motherCultureId).toBeNull();
      expect(response.body.liquidCultureId).toBe(1);
      expect(response.body.shaken).toBe(false);

      expect(response.body.liquidCulture).toBeDefined();
      expect(response.body.liquidCulture.name).toBe('Lions Mane');
    });

    it('should 404 when requesting not existing grain spawn', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/999`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Grain Spawn with ID 999 not found.');
    });

    it('should 400 when invalid grain spawn id', async () => {
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

  describe('POST /api/grain-spawn', () => {
    it('should 201 and return the created grain spawn with mother culture', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          inoculationDate: '2025-01-28',
          speciesId: 1,
          motherCultureId: 1,
          characteristic: 'Test grain spawn',
          contaminationStatus: false,
          shaken: true,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.inoculationDate).toMatch(/2025-01-28/);
      expect(response.body.speciesId).toBe(1);
      expect(response.body.motherCultureId).toBe(1);
      expect(response.body.liquidCultureId).toBeNull();
      expect(response.body.contaminationStatus).toBe(false);
      expect(response.body.shaken).toBe(true);
      expect(response.body.species).toMatchObject({
        id: 1,
        name: 'Lions Mane',
      });
    });

    it('should 201 and return the created grain spawn with liquid culture', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          inoculationDate: '2025-01-28',
          speciesId: 2,
          liquidCultureId: 2,
          shaken: false,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.motherCultureId).toBeNull();
      expect(response.body.liquidCultureId).toBe(2);
      expect(response.body.shaken).toBe(false);
    });

    it('should 400 when missing required fields', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({})
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('inoculationDate');
      expect(response.body.details.body).toHaveProperty('speciesId');
    });

    it('should 400 when missing speciesId', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          inoculationDate: '2025-01-28',
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('speciesId');
    });

    it('should 400 when missing inoculationDate', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          speciesId: 1,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('inoculationDate');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).post(url).send({
        inoculationDate: '2025-01-28',
        speciesId: 1,
      }),
    );
  });
  describe('PUT /api/grain-spawn/:id', () => {
    it('should 200 and return the updated grain spawn', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .send({
          inoculationDate: '2025-02-01',
          speciesId: 2,
          motherCultureId: 2,
          characteristic: 'Updated grain spawn',
          contaminationStatus: true,
          shaken: false,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      expect(response.body.inoculationDate).toMatch(/2025-02-01/);
      expect(response.body.speciesId).toBe(2);
      expect(response.body.motherCultureId).toBe(2);
      expect(response.body.contaminationStatus).toBe(true);
      expect(response.body.shaken).toBe(false);
      expect(response.body.species).toMatchObject({
        id: 2,
        name: 'Blue Oyster',
      });
    });

    it('should 404 when updating not existing grain spawn', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/999`)
        .send({
          inoculationDate: '2025-02-01',
          speciesId: 1,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Grain Spawn with ID 999 not found.');
    });

    it('should 200 when updating only shaken status', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/2`)
        .send({
          shaken: true,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(2);
      expect(response.body.shaken).toBe(true);
    });

    it('should 200 when updating contamination status', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/3`)
        .send({
          contaminationStatus: true,
        })
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(3);
      expect(response.body.contaminationStatus).toBe(true);
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({
        shaken: true,
      }),
    );
  });

  describe('DELETE /api/grain-spawn/:id', () => {
    it('should 204 and return nothing', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/1`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 with not existing grain spawn', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/999`)
        .auth(adminToken, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Grain Spawn with ID 999 not found.');
    });

    it('should 400 with invalid grain spawn id', async () => {
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
