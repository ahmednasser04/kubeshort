import dotenv from 'dotenv';

dotenv.config();

const parsePort = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value ?? fallback);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('PORT must be a positive integer.');
  }

  return parsed;
};

const parseShortCodeLength = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value ?? fallback);

  if (!Number.isInteger(parsed) || parsed < 4) {
    throw new Error('SHORT_CODE_LENGTH must be an integer greater than or equal to 4.');
  }

  return parsed;
};

const normalizeBaseUrl = (value: string | undefined): string | null => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.replace(/\/+$/, '');
};

const normalizeFrontendUrl = (value: string | undefined): string | null => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  return trimmed.replace(/\/+$/, '');
};

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required.');
}

export const env = {
  databaseUrl,
  isProduction: process.env.NODE_ENV === 'production',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: normalizeFrontendUrl(process.env.FRONTEND_URL ?? 'http://localhost:5173'),
  port: parsePort(process.env.PORT, 3000),
  publicBaseUrl: normalizeBaseUrl(process.env.BASE_URL ?? process.env.PUBLIC_BASE_URL),
  shortCodeLength: parseShortCodeLength(process.env.SHORT_CODE_LENGTH, 8)
} as const;
