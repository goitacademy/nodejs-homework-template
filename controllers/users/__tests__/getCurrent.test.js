/* eslint-disable no-undef */
const getCurrent = require('../getCurrent');

describe('getCurrent', () => {
  it('should return the current user details', async () => {
    const req = {
      user: {
        email: 'test@example.com',
        subscription: 'premium',
      },
    };
    const res = {
      json: jest.fn(),
    };

    await getCurrent(req, res);

    expect(res.json).toHaveBeenCalledWith({
      email: 'test@example.com',
      subscription: 'premium',
    });
  });
});
