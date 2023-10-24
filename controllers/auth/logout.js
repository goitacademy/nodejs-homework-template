const { ctrlWrapper } = require("../../decorators");

const { User } = require("../../models/User");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "Logout successful" });
};

module.exports = ctrlWrapper(logout);
