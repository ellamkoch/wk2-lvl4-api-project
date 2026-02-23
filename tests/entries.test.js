import { describe, it, expect } from 'vitest';
import request  from 'supertest';

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

describe('entries (nested)', () => {
    it('create an entry and lists entries for a class, returns 200', async() => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

        const classRes = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${token}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classRes.body.data.id;

        const createEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(201);

        expect(createEntry.body.data.classId).toBe(classId);

        const list = await request(app)
        .get(`/classes/${classId}/entries`)
        .expect(200);

        expect(list.body.data).toHaveLength(1);
    });
    it('update an entry with auth, return 200', async() => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

         const classCreated = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${token}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classCreated.body.data.id;

       const newEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(201);

    const entryId = newEntry.body.data.id;

    const updated = await request(app)        .put(`/entries/${entryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'updated name' })
        .expect(200);
     expect(updated.body.data.horseName).toBe('updated name');
    });

    it('delete an entry with auth, return a 204', async() => {
         const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

         const classCreated = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${token}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classCreated.body.data.id;

       const newEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(201);

    const entryId = newEntry.body.data.id;

    await request(app).delete(`/entries/${entryId}`).set('Authorization', `Bearer ${token}`).expect(204);
    });

it('update an entry with auth, but field left blank, returns 400', async() => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

         const classCreated = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${token}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classCreated.body.data.id;

       const newEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(201);

    const entryId = newEntry.body.data.id;

    const updated = await request(app)        .put(`/entries/${entryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);

        expect(updated.body.error.code).toBe('bad_request');
});
it('update an entry with auth, but returns a 404', async() => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
        const token = await registerAndGetToken(app);

         const classCreated = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${token}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classCreated.body.data.id;

       const newEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(201);

    const entryId = newEntry.body.data.id;

    const updated = await request(app)        .put(`/entries/5`)
        .set('Authorization', `Bearer ${token}`)
        .send({ horseName: 'Cash' })
        .expect(404);

        expect(updated.body.error.code).toBe('not_found');
});
it('wrong owner cannot update, returns 403', async ()  => {
        const app = createApp({
            repos: await createRepos(),
            config: {
                JWT_SECRET: 'test-secret',
            },
        });
         const tokenA = await registerAndGetToken(app, { email: 'usera@test.com'});
    const tokenB = await registerAndGetToken(app, { email: 'userb@test.com'});

    const classCreated = await request(app)
        .post('/classes')
        .set('Authorization', `Bearer ${tokenA}`)
        .send ({ className: 'A' })
        .expect(201);

        const classId = classCreated.body.data.id;

       const newEntry = await request(app)
        .post(`/classes/${classId}/entries`)
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ horseName: 'Cash' })
        .expect(201);

    const entryId = newEntry.body.data.id;

    const updated = await request(app)        .put(`/entries/${entryId}`)
        .set('Authorization', `Bearer ${tokenB}`)
        .send({ horseName: 'updated horse' })
        .expect(403);

        expect(updated.body.error.code).toBe('forbidden');
        });
})
