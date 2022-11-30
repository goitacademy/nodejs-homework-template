const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id: id } = req.user;

  await User.findByIdAndDelete(id, { token: '' });
  res.json({ message: 'Logout success' });
};

module.exports = logout;
