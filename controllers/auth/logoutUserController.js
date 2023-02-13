const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const logoutUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) throw new Unauthorized("Not authorized");

  res.status(204).json();
};

module.exports = logoutUserController;
