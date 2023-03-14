const { logoutUser } = require("../../service/users");

const logoutUserController = async (req, res) => {
  const { id } = req.user;
  await logoutUser(id);
  res.status(204).json({ status: "success" });
};
module.exports = logoutUserController;
