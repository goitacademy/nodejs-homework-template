const asyncHandler = require("express-async-handler");
const { logoutUser } = require("../../services/authService");

const logOutUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await logoutUser(_id);
  res.status(204).json();
});

module.exports = {
  logOutUser,
};
