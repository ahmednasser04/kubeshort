import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

const server = app.listen(env.port, () => {
  console.log(`KubeShort URL service listening on port ${env.port}`);
});

const shutdown = (signal: string): void => {
  console.info(`Received ${signal}, shutting down...`);

  server.close(async (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
      return;
    }

    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});
