import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockedNanoid = vi.hoisted(() => vi.fn((length: number) => `code-${length}`));
const mockedEnv = vi.hoisted(() => ({
  shortCodeLength: 8
}));

vi.mock('nanoid', () => ({
  nanoid: mockedNanoid
}));

vi.mock('../../src/config/env', () => ({
  env: mockedEnv
}));

import { generateShortCode } from '../../src/utils/generate-short-code';

describe('generateShortCode', () => {
  beforeEach(() => {
    mockedNanoid.mockClear();
    mockedEnv.shortCodeLength = 8;
  });

  it('uses the configured default length when no length is provided', () => {
    expect(generateShortCode()).toBe('code-8');
    expect(mockedNanoid).toHaveBeenCalledWith(8);
  });

  it('passes through an explicit length override', () => {
    expect(generateShortCode(12)).toBe('code-12');
    expect(mockedNanoid).toHaveBeenCalledWith(12);
  });
});