import { BadRequestError } from './app-error';

export const normalizeAndValidateUrl = (value: unknown): string => {
  if (typeof value !== 'string') {
    throw new BadRequestError('originalUrl is required and must be a string.');
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new BadRequestError('originalUrl is required.');
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(trimmed);
  } catch {
    throw new BadRequestError('originalUrl must be a valid URL.');
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new BadRequestError('Only http and https URLs are supported.');
  }

  return parsedUrl.toString();
};

export const validateShortCode = (value: unknown): string => {
  if (typeof value !== 'string') {
    throw new BadRequestError('shortCode is required.');
  }

  const shortCode = value.trim();

  if (!shortCode) {
    throw new BadRequestError('shortCode is required.');
  }

  if (!/^[A-Za-z0-9_-]+$/.test(shortCode)) {
    throw new BadRequestError('shortCode contains invalid characters.');
  }

  return shortCode;
};
