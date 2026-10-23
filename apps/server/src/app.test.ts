import { describe, it, expect } from 'vitest';
import { createApp } from './app.js';
import { items } from './db/schema.js';

describe('General API Routes & PostgreSQL Guidance Tests', () => {
  it('GET /api/health returns 200 with operational status', async () => {
    const app = await createApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/health'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('ok');
    expect(body.data.service).toBe('talent-sync-api');
    await app.close();
  });

  it('verifies Drizzle ORM PostgreSQL schema definition', () => {
    expect(items).toBeDefined();
    expect(items.id).toBeDefined();
    expect(items.title).toBeDefined();
    expect(items.description).toBeDefined();
    expect(items.createdAt).toBeDefined();
  });

  it('POST /api/items validates required title field', async () => {
    const app = await createApp();
    const response = await app.inject({
      method: 'POST',
      url: '/api/items',
      payload: {
        description: 'Missing title property'
      }
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('VALIDATION_ERROR');
    await app.close();
  });

  it('GET /api/items/:id validates integer ID parameter', async () => {
    const app = await createApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/items/not-a-number'
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('INVALID_ID');
    await app.close();
  });

  it('GET /api/items handles database connection gracefully', async () => {
    const app = await createApp();
    const response = await app.inject({
      method: 'GET',
      url: '/api/items'
    });

    // When Postgres container is running -> 200; when offline -> 503 with helpful guide
    expect([200, 503]).toContain(response.statusCode);
    const body = JSON.parse(response.body);
    if (response.statusCode === 200) {
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
    } else {
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('DATABASE_UNAVAILABLE');
    }
    await app.close();
  });
});
