import { Prisma, UrlStatus } from '@prisma/client';

import { prisma } from '../config/prisma';

export interface CreateUrlRecordInput {
  originalUrl: string;
  shortCode: string;
}

class UrlRepository {
  async createUrl(input: CreateUrlRecordInput) {
    return prisma.url.create({
      data: {
        originalUrl: input.originalUrl,
        shortCode: input.shortCode,
        status: UrlStatus.ACTIVE
      }
    });
  }

  async findActiveByOriginalUrl(originalUrl: string) {
    return prisma.url.findFirst({
      where: {
        originalUrl,
        status: UrlStatus.ACTIVE
      }
    });
  }

  async findActiveByShortCode(shortCode: string) {
    return prisma.url.findFirst({
      where: {
        shortCode,
        status: UrlStatus.ACTIVE
      }
    });
  }

  async findByShortCode(shortCode: string) {
    return prisma.url.findFirst({
      where: {
        shortCode
      }
    });
  }

  async incrementClicksById(id: string) {
    return prisma.url.update({
      data: {
        clicks: {
          increment: 1
        }
      },
      where: {
        id
      }
    });
  }

  async softDeleteById(id: string) {
    return prisma.url.update({
      data: {
        status: UrlStatus.DELETED
      },
      where: {
        id
      }
    });
  }
}

export const urlRepository = new UrlRepository();

export const isUniqueConstraintError = (error: unknown): boolean =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
