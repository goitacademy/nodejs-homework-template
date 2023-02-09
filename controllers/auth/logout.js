const user = require('../../models/user');

const logout = async (req, res) => {
  const { _id } = req.user;

  await user.findByIdAndUpdate(_id, { token: '' });
  res.json({
    message: 'Logout success',
  });
};

module.exports = logout;
