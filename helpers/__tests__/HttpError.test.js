/* eslint-disable no-undef */
const HttpError = require('../HttpError');

describe('HttpError', () => {
  it('should be make error 400: "Bad Request" ', () => {
    const error = HttpError(400);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(400);
    expect(error.message).toBe('Bad Request');
  });

  it('should be make error 401: "Not authorized" ', () => {
    const error = HttpError(401);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(401);
    expect(error.message).toBe('Not authorized');
  });

  it('should be make error 403: "Forbidden" ', () => {
    const error = HttpError(403);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(403);
    expect(error.message).toBe('Forbidden');
  });

  it('should be make error 404: "Not found" ', () => {
    const error = HttpError(404);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(404);
    expect(error.message).toBe('Not found');
  });

  it('should be make error 409: "Conflict" ', () => {
    const error = HttpError(409);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(409);
    expect(error.message).toBe('Conflict');
  });

  it('should be make custom error 500 and custom message ', () => {
    const status = 500;
    const message = 'Custom error message';

    const error = HttpError(status, message);

    expect(error instanceof Error).toBe(true);
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  });
});
