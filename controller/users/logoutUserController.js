const { logoutUserService } = require("../../servises/users/logoutUserService");

const logoutUserController = async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  res.status(204).json("No Content");
};

module.exports = {
  logoutUserController,
};
