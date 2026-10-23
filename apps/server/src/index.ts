import { createApp } from './app.js';
import { config } from './config.js';

async function bootstrap() {
  const app = await createApp();

  try {
    await app.listen({ port: config.port, host: config.host });
    console.log(`🚀 TalentSync Fastify Server listening on http://localhost:${config.port}`);
    console.log(`✨ Health check: http://localhost:${config.port}/api/health`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
