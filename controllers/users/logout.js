const { User } = require("../../models");

const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

module.exports = { logout: ctrlWrapper(logout) };