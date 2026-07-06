import { env } from '../config/env';

export const buildShortUrl = (shortCode: string): string => {
  if (env.publicBaseUrl) {
    return `${env.publicBaseUrl}/${shortCode}`;
  }

  return `/${shortCode}`;
};
