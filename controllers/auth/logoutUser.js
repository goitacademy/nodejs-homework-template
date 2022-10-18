const { User } = require("../../service");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    code: 204,
    status: "success",
    message: "No Content",
  });
};
module.exports = logoutUser;
