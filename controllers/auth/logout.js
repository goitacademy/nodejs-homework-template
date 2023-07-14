const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');

const logout = async (req, res) => {
  const { _id } = req.user;
//   console.log(_id);
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = { logout: ctrlWrapper(logout) };
