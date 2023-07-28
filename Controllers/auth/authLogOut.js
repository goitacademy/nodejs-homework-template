const { ctrlWraper } = require("../../Helpers");

const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    message: "Logout successfully",
  });
};

module.exports = ctrlWraper(logout);
