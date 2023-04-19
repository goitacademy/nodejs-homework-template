const { ctrlWrapper } = require("../../utils");
const { User } = require("../../models");
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "logout success",
  });
};

module.exports = {
  logout: ctrlWrapper(logout),
};
