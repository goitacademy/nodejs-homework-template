const { ctrlWrapper } = require("../../helpers");
const {
  userModel: { User },
} = require("../../models");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

module.exports = { logoutUser: ctrlWrapper(logoutUser) };
