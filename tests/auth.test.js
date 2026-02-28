import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { createApp } from '#app';
import { createRepos } from '#repos/index';
import { prisma } from '#db/prisma';

describe('Authentication', () => {
  it('register a new user and log in successfully', async () => {
    const app = createApp({
      repos: await createRepos(prisma),
      config: {
        JWT_SECRET: 'test-secret',
      },
    });

    const email = `bob+${Date.now()}@example.com`;

    const registerRes = await request(app).post('/auth/register').send({
      email,
      password: 'Password123',
    });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body).toHaveProperty('data.token');

    const loginRes = await request(app).post('/auth/login').send({
      email,
      password: 'Password123',
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('data.token');
  });
});
