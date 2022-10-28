const { User } = require('../../models/user');

const logout = async (req, res) => {
  const { _id, token } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.json({
    message: `Bearer ${token}`,
  });
};

module.exports = logout;
