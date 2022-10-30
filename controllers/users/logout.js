const { users: usersOperations } = require("../../service");

const logout = async (req, res) => {
  const user = req.user;
  await usersOperations.logout(user._id);

  res.status(204).json({});
};


module.exports = logout;