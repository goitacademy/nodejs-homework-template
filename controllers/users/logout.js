const { removeToken } = require('../../services/users');

module.exports = async (req, res) => {
  await removeToken(req.user._id);

  res.status(204).json();
};
