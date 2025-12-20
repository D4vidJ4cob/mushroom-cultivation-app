import { randomBytes } from 'node:crypto';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import {
  DatabaseProvider,
  DrizzleAsyncProvider,
} from '../src/drizzle/drizzle.provider';
import { createTestApp } from './helpers/create-app';
import { clearUsers, seedUsers } from './seeds/users';
import { login, loginAdmin } from './helpers/login';
import { AuthService } from '../src/auth/auth.service';
import { eq } from 'drizzle-orm';
import { users } from '../src/drizzle/schema';
import testAuthHeader from './helpers/testAuthHeaders';
import { clearSpecies, seedSpecies } from './seeds/species';
import {
  clearLiquidCultures,
  seedLiquidCultures,
} from './seeds/liquidCultures';
import {
  clearMotherCultures,
  seedMotherCultures,
} from './seeds/motherCultures';
import { clearGrainSpawns, seedGrainSpawns } from './seeds/grainSpawns';
import {
  clearBatchAssignments,
  seedBatchAssignments,
} from './seeds/batchAssignments';
import { clearSubstrates, seedSubstrates } from './seeds/substrates';

describe('Users', () => {
  let app: INestApplication;
  let drizzle: DatabaseProvider;
  let userAuthToken: string;
  let adminAuthToken: string;

  const url = '/api/users';

  beforeAll(async () => {
    app = await createTestApp();
    drizzle = app.get(DrizzleAsyncProvider);

    await seedSpecies(drizzle);
    await seedUsers(app, drizzle);
    await seedMotherCultures(drizzle);
    await seedLiquidCultures(drizzle);
    await seedGrainSpawns(drizzle);
    await seedSubstrates(drizzle);
    await seedBatchAssignments(drizzle);

    userAuthToken = await login(app);
    adminAuthToken = await loginAdmin(app);
  });
  afterAll(async () => {
    await clearBatchAssignments(drizzle);
    await clearSubstrates(drizzle);
    await clearGrainSpawns(drizzle);
    await clearLiquidCultures(drizzle);
    await clearMotherCultures(drizzle);
    await clearUsers(drizzle);
    await clearSpecies(drizzle);

    await app.close();
  });

  describe('POST /api/users', () => {
    it('should 201 and return the token for the registered user', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        name: 'Register User',
        email: 'register@example.be',
        password: '123456789101112',
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeTruthy();
    });

    it('should 409 when using duplicate email', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        name: 'Duplicate User',
        email: 'test.user@example.be',
        password: '123456789101112',
      });

      expect(response.statusCode).toBe(409);

      expect(response.body.message).toEqual(
        'There is already a user with this email address',
      );
    });

    it('should 400 when missing name', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        email: 'register@example.be',
        password: '123456789101112',
      });

      expect(response.statusCode).toBe(400);

      expect(response.body.details.body).toHaveProperty('name');
    });

    it('should 400 when missing email', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        name: 'Register User',
        password: '123456789101112',
      });

      expect(response.statusCode).toBe(400);

      expect(response.body.details.body).toHaveProperty('email');
    });

    it('should 400 when missing passsword', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        name: 'Register User',
        email: 'register@example.be',
      });

      expect(response.statusCode).toBe(400);

      expect(response.body.details.body).toHaveProperty('password');
    });

    it('should 400 when passsword too short', async () => {
      const response = await request(app.getHttpServer()).post(url).send({
        name: 'Register User',
        email: 'register@example.be',
        password: 'short',
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('password');
    });

    it('should 400 when password too long', async () => {
      const response = await request(app.getHttpServer())
        .post(url)
        .send({
          name: 'Register User',
          email: 'register@example.be',
          password: randomBytes(65).toString('hex'),
        });

      expect(response.statusCode).toBe(400);

      expect(response.body.details.body).toHaveProperty('password');
    });
  });

  describe('GET /api/users', () => {
    it('should 200 and return all users', async () => {
      const response = await request(app.getHttpServer())
        .get(url)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(4);

      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            name: 'Test User',
            email: 'test.user@example.be',
          },
          {
            id: 2,
            name: 'Admin User',
            email: 'admin.user@example.be',
          },
        ]),
      );
    });

    testAuthHeader(() => request(app.getHttpServer()).get(url));
  });

  describe('GET /api/user/:id', () => {
    it('should 200 and return the requested user', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(response.statusCode).toBe(200);

      expect(response.body).toMatchObject({
        id: 1,
        name: 'Test User',
      });
    });

    it("should 403 when requesting other user's info", async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/2`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No user with this id exists');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should 200 and return the updated user', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          name: 'Changed name',
          email: 'update.user@example.be',
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Changed name',
        email: 'update.user@example.be',
      });
    });

    it('should 409 for duplicate email', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({
          name: 'Changed name',
          email: 'admin.user@example.be',
        });

      expect(response.statusCode).toBe(409);
      expect(response.body.message).toEqual(
        'There is already a user with this email address',
      );
    });

    it('should 400 when missing name', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ email: 'update.user@example.be' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('name');
    });

    it('should 400 when missing email', async () => {
      const response = await request(app.getHttpServer())
        .put(`${url}/1`)
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send({ name: 'Changed name' });

      expect(response.statusCode).toBe(400);
      expect(response.body.details.body).toHaveProperty('email');
    });

    it('should 403 with other than signed in user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/3`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('No user with this id exists');
    });

    it('should 404 with not existing user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/123`)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('No user with this id exists');
    });

    testAuthHeader(() =>
      request(app.getHttpServer()).put(`${url}/1`).send({
        name: 'Changed name',
        email: 'update.user@example.be',
      }),
    );
  });

  describe('DELETE /api/users/:id', () => {
    let deleteAuthToken: string;
    let deleteUserId: number;

    beforeAll(async () => {
      const authService = app.get(AuthService);
      deleteAuthToken = await authService.register({
        name: 'Delete User',
        email: 'delete.user@example.be',
        password: '12345678',
      });

      const deleteUser = await drizzle
        .select()
        .from(users)
        .where(eq(users.email, 'delete.user@example.be'));

      deleteUserId = deleteUser[0].id;
    });

    it('should 404 with other than signed in user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/7`)
        .set('Authorization', `Bearer ${userAuthToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual('No user with this id exists');
    });

    it('should 404 with not existing user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/123`)
        .set('Authorization', `Bearer ${adminAuthToken}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('No user with this id exists');
    });

    it('should 204 and return nothing', async () => {
      const response = await request(app.getHttpServer())
        .delete(`${url}/${deleteUserId}`)
        .set('Authorization', `Bearer ${deleteAuthToken}`);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    testAuthHeader(() => request(app.getHttpServer()).delete(`${url}/1`));
  });

  describe('GET /api/users/:id/substrate-assignments', () => {
    it('should 200 and return all the substrates that a user made', async () => {
      const response = await request(app.getHttpServer())
        .get(`${url}/1/substrate-assignments`)
        .auth(userAuthToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(2);

      expect(response.body.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            role: 'manager',
            substrate: expect.objectContaining({
              id: 1,
            }),
          }),
          expect.objectContaining({
            id: 2,
            role: 'worker',
            substrate: expect.objectContaining({
              id: 2,
            }),
          }),
        ]),
      );

      expect(response.body.items[0].substrate).toBeDefined();
      expect(response.body.items[0].substrate.id).toBeTruthy();
    });
    testAuthHeader(() =>
      request(app.getHttpServer()).get(`${url}/1/substrate-assignments`),
    );
  });
});
