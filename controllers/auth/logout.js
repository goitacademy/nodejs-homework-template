const { HTTPError } = require('../../helpers');
const { User } = require('../../models/user');

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  next(HTTPError(204, 'No Content'));
};

module.exports = logout;
