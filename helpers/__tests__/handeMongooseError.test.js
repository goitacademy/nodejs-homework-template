/* eslint-disable no-undef */
const handleMongooseError = require('../handleMongooseError');

describe('handleMongooseError', () => {
  it('should set the correct error status 409 and call next', () => {
    const error = {
      name: 'MongoServerError',
      code: 11000,
    };
    const data = {};
    const next = jest.fn();

    handleMongooseError(error, data, next);

    expect(error.status).toBe(409);
    expect(next).toHaveBeenCalled();
  });

  it('should set the default error status 400 and call next', () => {
    const error = {
      name: 'Any message',
      code: 24512,
    };
    const data = {};
    const next = jest.fn();

    handleMongooseError(error, data, next);

    expect(error.status).toBe(400);
    expect(next).toHaveBeenCalled();
  });

  it('should set the default error status 400 and call next (error.name=true)', () => {
    const error = {
      name: 'MongoServerError',
      code: 24512,
    };
    const data = {};
    const next = jest.fn();

    handleMongooseError(error, data, next);

    expect(error.status).toBe(400);
    expect(next).toHaveBeenCalled();
  });

  it('should set the default error status 400 and call next (error.code=true)', () => {
    const error = {
      name: 'Any message',
      code: 11000,
    };
    const data = {};
    const next = jest.fn();

    handleMongooseError(error, data, next);

    expect(error.status).toBe(400);
    expect(next).toHaveBeenCalled();
  });
});
