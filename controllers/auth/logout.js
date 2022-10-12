const { User } = require('../../models/users');

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json();
};

module.exports = logout;
