const { User } = require('../../models');
const { ctrlWrapper } = require('../../utils');

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json('No Content');
};

module.exports = ctrlWrapper(logout);
