import { describe, expect, it } from 'vitest';

import { BadRequestError } from '../../src/utils/app-error';
import { normalizeAndValidateUrl, validateShortCode } from '../../src/utils/url-validation';

describe('normalizeAndValidateUrl', () => {
  it('trims whitespace and returns a normalized http URL', () => {
    expect(normalizeAndValidateUrl('  http://example.com/some-path?query=1  ')).toBe(
      'http://example.com/some-path?query=1'
    );
  });

  it('rejects non-string input', () => {
    expect(() => normalizeAndValidateUrl(null)).toThrow(BadRequestError);
    expect(() => normalizeAndValidateUrl(null)).toThrow('originalUrl is required and must be a string.');
  });

  it('rejects malformed URLs', () => {
    expect(() => normalizeAndValidateUrl('not-a-url')).toThrow(BadRequestError);
    expect(() => normalizeAndValidateUrl('not-a-url')).toThrow('originalUrl must be a valid URL.');
  });

  it('rejects unsupported URL protocols', () => {
    expect(() => normalizeAndValidateUrl('ftp://example.com')).toThrow(BadRequestError);
    expect(() => normalizeAndValidateUrl('ftp://example.com')).toThrow('Only http and https URLs are supported.');
  });
});

describe('validateShortCode', () => {
  it('trims whitespace and returns a validated short code', () => {
    expect(validateShortCode('  aB_9-  ')).toBe('aB_9-');
  });

  it('rejects empty or whitespace-only values', () => {
    expect(() => validateShortCode('   ')).toThrow(BadRequestError);
    expect(() => validateShortCode('   ')).toThrow('shortCode is required.');
  });

  it('rejects values containing invalid characters', () => {
    expect(() => validateShortCode('abc/123')).toThrow(BadRequestError);
    expect(() => validateShortCode('abc/123')).toThrow('shortCode contains invalid characters.');
  });
});