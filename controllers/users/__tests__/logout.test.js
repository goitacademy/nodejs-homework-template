/* eslint-disable no-undef */
const { User } = require('../../../models/user');
const logout = require('../logout');

describe('logout', () => {
  it('should logout the user and return a 204 status', async () => {
    const req = {
      user: { _id: 'user123' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue();

    await logout(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
      token: '',
    });
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
