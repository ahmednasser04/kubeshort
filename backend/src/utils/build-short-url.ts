import { env } from '../config/env';

export const buildShortUrl = (shortCode: string): string => {
  if (env.publicBaseUrl) {
    const baseUrl = env.publicBaseUrl;

    if (baseUrl.endsWith('/r')) {
      return `${baseUrl}/${shortCode}`;
    }

    return `${baseUrl}/r/${shortCode}`;
  }

  return `/r/${shortCode}`;
};
