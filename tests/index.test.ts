import request from 'supertest';

import { app } from '../app/app';

describe('GET /api-docs/', () => {
    it('returns api docs.`', async () => {
        const data = await request(app).get('/api-docs/');
        expect(data.statusCode).toBe(200);
    });
});