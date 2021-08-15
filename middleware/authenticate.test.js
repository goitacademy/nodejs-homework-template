const authenticate = require('./authenticate');

describe('Unit testing authenticate middleware', () => {
  let req, res, next;
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });
  test('test: passport call', async () => {
    await authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});