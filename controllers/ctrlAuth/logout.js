const { authService } = require("../../services");

const logout = async (req, res) => {
  const { _id } = req.user;

  await authService.updateUser(_id, { token: "" });

  res.status(204).json({ message: "Logout successful" });
};

module.exports = logout;