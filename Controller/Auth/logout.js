const { User } = require("../../models/user");

const logout = async (req, res) => {
  console.log("req.user", req.user);
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = logout;