import type { UrlStatus } from '@prisma/client';

export interface CreateUrlInput {
  originalUrl: string;
}

export interface UrlResponse {
  clicks: number;
  createdAt: Date;
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  status: UrlStatus;
  updatedAt: Date;
}
