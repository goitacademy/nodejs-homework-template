const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;

  if (!req.user) {
    throw HttpError(401, 'Not authorized');
  }

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({
    message: 'Logout success',
  });
};

module.exports = {
  logout,
};
