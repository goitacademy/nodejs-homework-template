const { User } = require("../../models/user");
require("dotenv").config();

const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

module.exports = {
  logout: ctrlWrapper(logout),
};
