import { describe, it, expect } from 'vitest';
import request from 'supertest';

import { createApp } from '#app';
import { createRepos } from '#repos/index';

describe('GET /health', () => {
  it('returns ok', async () => {
    const app = createApp({ repos: await createRepos() });
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
  });
});
