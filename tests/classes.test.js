import { describe, it, expect } from 'vitest';
import request from 'supertest';

import { createApp } from '#app';
import { createRepos } from '#repos/index';

async function registerAndGetToken(app) {
    const res = await request(app).post('/auth/register').send({
        email:`bob+${Date.now()}@example.com`,
        password: 'Password123',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data.token');

    return res.body.data.token;
}

describe('Classes', () => {
    it('create class requires auth', async () => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const res = await request(app).post('/classes').send({ className: 'a'});
        expect(res.status).toBe(401);
    })


it('creates and lists classes with pagination meta', async () => {
         const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
    });
    const token = await registerAndGetToken(app);

    await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${token}`)
    .send({ className: 'A'})
    .expect(201);

    await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${token}`)
    .send({ className: 'B'})
    .expect(201);

    await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${token}`)
    .send({ className: 'C'})
    .expect(201);

    const res = await request(app).get('/classes?limit=2&page=1').expect(200);

    expect(res.body.data).toHaveLength(2);
    expect(res.body.meta.pagination.limit).toBe(2);
    expect(res.body.meta.pagination.page).toBe(1);
    expect(res.body.meta.pagination.total).toBeGreaterThanOrEqual(3);
});

it('wrong owner cannot update, returns 403', async () => {
    const app = createApp({
        repos: await createRepos(),
        config: {
            JWT_SECRET: 'test-secret',
        },
    });
    const tokenA = await registerAndGetToken(app, { email: 'usera@test.com'});
    const tokenB = await registerAndGetToken(app, { email: 'userb@test.com'});

    const createdClass = await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${tokenA}`)
    .send({ className: 'A'})
    .expect(201);

    const classId = createdClass.body.data.id;

    const updatedClass = await request(app)
    .put(`/classes/${classId}`)
    .set('Authorization', `Bearer ${tokenB}`)
    .send({ className: 'edited class'})
    .expect(403);

    expect(updatedClass.body.error.code).toBe('forbidden');
    });

    it('owner can delete a class with success, returns 204', async () => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

        const createdClass = await request(app)
            .post('/classes')
            .set('Authorization', `Bearer ${token}`)
            .send({ className: 'A'})
            .expect(201);

            const classId = createdClass.body.data.id;

    await request(app).delete(`/classes/${classId}`).set('Authorization', `Bearer ${token}`).expect(204);
  });

it('returns a 404 when a user tries to delete a class not found', async () => {
    const app = createApp({
        repos: await createRepos(),
        config: {
            JWT_SECRET: 'test-secret',
        },
    });
    const token = await registerAndGetToken(app);


    const deleteClass = await request(app)
    .delete(`/classes/5`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404);

    expect(deleteClass.body.error.code).toBe('not_found');
});
it('returns a 400 when a user updates a class but does not fill out the field', async () => {
    const app = createApp({
        repos: await createRepos(),
        config: {
            JWT_SECRET: 'test-secret',
        },
    });
    const token = await registerAndGetToken(app);

    const createdClass = await request(app)
    .post('/classes')
    .set('Authorization', `Bearer ${token}`)
    .send({ className: 'A'})
    .expect(201);

    const classId = createdClass.body.data.id;

    const updatedClass = await request(app)
    .put(`/classes/${classId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect(400);

    expect(updatedClass.body.error.code).toBe('bad_request');
});

})
