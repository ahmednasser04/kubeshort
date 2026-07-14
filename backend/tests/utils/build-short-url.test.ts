import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockedEnv = vi.hoisted(() => ({
  publicBaseUrl: null as string | null
}));

vi.mock('../../src/config/env', () => ({
  env: mockedEnv
}));

import { buildShortUrl } from '../../src/utils/build-short-url';

describe('buildShortUrl', () => {
  beforeEach(() => {
    mockedEnv.publicBaseUrl = null;
  });

  it('returns a relative redirect path when no public base URL is configured', () => {
    mockedEnv.publicBaseUrl = null;

    expect(buildShortUrl('abc123')).toBe('/r/abc123');
  });

  it('appends the short code to a configured base URL that does not already end with /r', () => {
    mockedEnv.publicBaseUrl = 'https://short.example.com';

    expect(buildShortUrl('abc123')).toBe('https://short.example.com/r/abc123');
  });

  it('does not duplicate the /r segment when the configured base URL already ends with /r', () => {
    mockedEnv.publicBaseUrl = 'https://short.example.com/r';

    expect(buildShortUrl('abc123')).toBe('https://short.example.com/r/abc123');
  });
});