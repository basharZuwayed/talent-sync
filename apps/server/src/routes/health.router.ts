import { FastifyInstance } from 'fastify';
import { ApiResponse, SystemHealth } from '@talent-sync/shared';
import { config } from '../config.js';

const startTime = Date.now();

export async function healthRouter(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    const healthData: SystemHealth = {
      status: 'ok',
      service: 'talent-sync-api',
      version: '1.0.0',
      uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
      environment: config.nodeEnv,
      timestamp: new Date().toISOString()
    };

    const response: ApiResponse<SystemHealth> = {
      success: true,
      data: healthData,
      message: 'TalentSync API service is operational',
      timestamp: new Date().toISOString()
    };

    return response;
  });
}
