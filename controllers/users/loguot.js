const { users: operations } = require("../../services");

const logout = async (req, res) => {
  const user = req.user;
  await operations.logout(user._id);

  res.status(204).json({});
};

module.exports = logout;
