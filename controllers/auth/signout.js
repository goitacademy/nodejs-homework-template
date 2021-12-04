const logout = require("../../services/auth");

const signout = async (req, res) => {
  const { id } = req.user;
  await logout(id);

  res.status(204).json({ message: "You are loged out!" });
};

module.exports = signout;
