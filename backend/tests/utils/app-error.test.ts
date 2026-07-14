import { describe, expect, it } from 'vitest';

import { AppError, BadRequestError, ConflictError, NotFoundError } from '../../src/utils/app-error';

describe('AppError', () => {
  it('stores the message, status code, details, and operational flag', () => {
    const details = { field: 'originalUrl', reason: 'invalid format' };
    const error = new AppError('Validation failed', 422, details);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
    expect(error.name).toBe('AppError');
    expect(error.message).toBe('Validation failed');
    expect(error.statusCode).toBe(422);
    expect(error.details).toBe(details);
    expect(error.isOperational).toBe(true);
  });
});

describe('BadRequestError', () => {
  it('creates a 400 operational error', () => {
    const error = new BadRequestError('Bad request');

    expect(error).toBeInstanceOf(AppError);
    expect(error.name).toBe('BadRequestError');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad request');
  });
});

describe('NotFoundError', () => {
  it('creates a 404 operational error', () => {
    const error = new NotFoundError('Missing resource');

    expect(error.name).toBe('NotFoundError');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Missing resource');
  });
});

describe('ConflictError', () => {
  it('creates a 409 operational error', () => {
    const error = new ConflictError('Duplicate entry');

    expect(error.name).toBe('ConflictError');
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe('Duplicate entry');
  });
});