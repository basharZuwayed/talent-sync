import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ApiResponse, Item, CreateItemInput } from '@talent-sync/shared';
import { defaultDb } from '../db/database.js';

interface ItemParams {
  id: string;
}

export async function itemsRouter(fastify: FastifyInstance) {
  // List all items from PostgreSQL database table
  fastify.get('/', async (_request, reply) => {
    try {
      const items = await defaultDb.getItems();
      const response: ApiResponse<Item[]> = {
        success: true,
        data: items,
        timestamp: new Date().toISOString()
      };
      return response;
    } catch (err: unknown) {
      reply.status(503);
      return {
        success: false,
        error: {
          code: 'DATABASE_UNAVAILABLE',
          message: 'PostgreSQL database connection unavailable. Ensure the Postgres Docker container is running (docker compose up -d).',
          details: err instanceof Error ? err.message : String(err)
        },
        timestamp: new Date().toISOString()
      };
    }
  });

  // Get single item by ID
  fastify.get('/:id', async (request: FastifyRequest<{ Params: ItemParams }>, reply: FastifyReply) => {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
      reply.status(400);
      return {
        success: false,
        error: { code: 'INVALID_ID', message: 'Item ID must be an integer' },
        timestamp: new Date().toISOString()
      };
    }

    try {
      const item = await defaultDb.getItemById(id);
      if (!item) {
        reply.status(404);
        return {
          success: false,
          error: { code: 'NOT_FOUND', message: `Item with id ${id} not found` },
          timestamp: new Date().toISOString()
        };
      }

      const response: ApiResponse<Item> = {
        success: true,
        data: item,
        timestamp: new Date().toISOString()
      };
      return response;
    } catch (err: unknown) {
      reply.status(503);
      return {
        success: false,
        error: {
          code: 'DATABASE_UNAVAILABLE',
          message: 'PostgreSQL database connection unavailable.',
          details: err instanceof Error ? err.message : String(err)
        },
        timestamp: new Date().toISOString()
      };
    }
  });

  // Create an item in PostgreSQL database table
  fastify.post('/', async (request: FastifyRequest<{ Body: CreateItemInput }>, reply: FastifyReply) => {
    const { title, description } = request.body || {};
    if (!title || typeof title !== 'string' || title.trim() === '') {
      reply.status(400);
      return {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Title is required and must not be empty' },
        timestamp: new Date().toISOString()
      };
    }

    try {
      const created = await defaultDb.createItem({
        title: title.trim(),
        description: description ? String(description).trim() : undefined
      });

      reply.status(201);
      const response: ApiResponse<Item> = {
        success: true,
        data: created,
        message: 'Item created successfully in PostgreSQL database',
        timestamp: new Date().toISOString()
      };
      return response;
    } catch (err: unknown) {
      reply.status(503);
      return {
        success: false,
        error: {
          code: 'DATABASE_UNAVAILABLE',
          message: 'PostgreSQL database connection unavailable. Ensure Postgres Docker container is running.',
          details: err instanceof Error ? err.message : String(err)
        },
        timestamp: new Date().toISOString()
      };
    }
  });
}
