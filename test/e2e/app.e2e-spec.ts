import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

jest.setTimeout(10000);

describe('App E2E Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) - debe retornar una lista de usuarios con paginación', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .query({ page: 1, per_page: 10 });

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.next).toBeDefined();
  });


  it('/users/search-users (GET) - debe buscar un usuario por nombre de usuario', async () => {
    const term = 'juanicarramal';
    const res = await request(app.getHttpServer())
      .get('/users/search-users')
      .query({ term });

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('/users/:username (GET) - debe retornar el detalle de un usuario con is_favorite en true', async () => {
    const username = 'juanicarramal';
    const resFavorite = await request(app.getHttpServer())
      .post(`/favorites/${username}`);
    expect(resFavorite.status).toBe(201);
    expect(resFavorite.body.message).toBe(`Usuario ${username} agregado a favoritos`);

    const res = await request(app.getHttpServer())
      .get(`/users/${username}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.login).toBe(username);
    expect(res.body.is_favorite).toBeDefined();
    expect(res.body.is_favorite).toBe(true);
  });

  it('/favorites (GET) - debe retornar la lista de favoritos', async () => {
    const username = 'mojombo';
    const resFavorite = await request(app.getHttpServer())
      .post(`/favorites/${username}`);
    expect(resFavorite.status).toBe(201);

    const res = await request(app.getHttpServer())
      .get('/favorites');

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('/favorites/:username (POST) - debe agregar un usuario a favoritos', async () => {
    const username = 'mojombo';
    const res = await request(app.getHttpServer())
      .post(`/favorites/${username}`);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe(`Usuario ${username} agregado a favoritos`);
  });

});