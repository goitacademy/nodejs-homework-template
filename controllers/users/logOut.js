const { User } = require('../../models');

const logOut = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: '' });
  res.status(204).json();
};
module.exports = logOut;
