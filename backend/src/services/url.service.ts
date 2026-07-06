import type { Url } from '@prisma/client';

import { env } from '../config/env';
import { urlRepository, isUniqueConstraintError } from '../repositories/url.repository';
import { buildShortUrl } from '../utils/build-short-url';
import { ConflictError, NotFoundError } from '../utils/app-error';
import { generateShortCode } from '../utils/generate-short-code';
import { normalizeAndValidateUrl, validateShortCode } from '../utils/url-validation';
import type { CreateUrlInput, UrlResponse } from '../types/url';

const MAX_SHORT_CODE_ATTEMPTS = 5;

class UrlService {
  private mapToResponse(url: Url): UrlResponse {
    return {
      clicks: url.clicks,
      createdAt: url.createdAt,
      id: url.id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: buildShortUrl(url.shortCode),
      status: url.status,
      updatedAt: url.updatedAt
    };
  }

  async createUrl(input: CreateUrlInput): Promise<UrlResponse> {
    const originalUrl = normalizeAndValidateUrl(input.originalUrl);

    const existingUrl = await urlRepository.findActiveByOriginalUrl(originalUrl);

    if (existingUrl) {
      return this.mapToResponse(existingUrl);
    }

    for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt += 1) {
      const shortCode = generateShortCode(env.shortCodeLength);

      try {
        const createdUrl = await urlRepository.createUrl({
          originalUrl,
          shortCode
        });

        return this.mapToResponse(createdUrl);
      } catch (error) {
        if (isUniqueConstraintError(error)) {
          continue;
        }

        throw error;
      }
    }

    throw new ConflictError('Unable to generate a unique short code. Please try again.');
  }

  async getUrlByShortCode(shortCodeInput: unknown): Promise<UrlResponse> {
    const shortCode = validateShortCode(shortCodeInput);
    const url = await urlRepository.findByShortCode(shortCode);

    if (!url) {
      throw new NotFoundError('Short code not found.');
    }

    return this.mapToResponse(url);
  }

  async deleteUrlByShortCode(shortCodeInput: unknown): Promise<UrlResponse> {
    const shortCode = validateShortCode(shortCodeInput);
    const url = await urlRepository.findActiveByShortCode(shortCode);

    if (!url) {
      throw new NotFoundError('Short code not found.');
    }

    const deletedUrl = await urlRepository.softDeleteById(url.id);

    return this.mapToResponse(deletedUrl);
  }

  async resolveShortCode(shortCodeInput: unknown): Promise<string> {
    const shortCode = validateShortCode(shortCodeInput);
    const url = await urlRepository.findActiveByShortCode(shortCode);

    if (!url) {
      throw new NotFoundError('Short code not found.');
    }

    await urlRepository.incrementClicksById(url.id);

    return url.originalUrl;
  }
}

export const urlService = new UrlService();
