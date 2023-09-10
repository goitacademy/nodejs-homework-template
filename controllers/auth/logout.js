const { User } = require('../../models');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.json({
    status: 'success',
    code: 204,
    message: 'No Content',
  });
};

module.exports = logout;