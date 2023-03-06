const { findUserById, removeToken } = require("../../services");

const logoutController = async (req, res) => {
  const { id: owner } = req.user;

  const user = await findUserById(owner);

  await removeToken(owner);

  return res.status(204).json({ data: "No Content" });
};

module.exports = logoutController;
