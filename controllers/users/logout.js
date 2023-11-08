const User = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const logout = async (req, res) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { token: '' });
  res.statusMessage = 'No Content';
  res.status(204).end();
};

module.exports = { logout: ctrlWrapper(logout) };
