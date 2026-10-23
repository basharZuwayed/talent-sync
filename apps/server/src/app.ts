import Fastify, { FastifyInstance, FastifyError } from 'fastify';
import cors from '@fastify/cors';
import { healthRouter } from './routes/health.router.js';
import { itemsRouter } from './routes/items.router.js';

export async function createApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true
  });

  await app.register(cors, {
    origin: true
  });

  // Mount general basic routes
  await app.register(healthRouter, { prefix: '/api/health' });
  await app.register(itemsRouter, { prefix: '/api/items' });

  // 404 handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      error: { code: 'NOT_FOUND', message: `Route ${request.method} ${request.url} not found` },
      timestamp: new Date().toISOString()
    });
  });

  // Global error handler
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 500;
    reply.status(statusCode).send({
      success: false,
      error: { code: error.code || 'INTERNAL_ERROR', message: error.message || 'Internal server error' },
      timestamp: new Date().toISOString()
    });
  });

  return app;
}
