import { PrismaClient } from '@prisma/client';

import { env } from './env';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: env.isProduction ? ['error'] : ['warn', 'error']
  });

export const prisma = globalThis.prisma ?? createPrismaClient();

if (!env.isProduction) {
  globalThis.prisma = prisma;
}
