
const asyncHandler = require("express-async-handler");
const { User } = require("../../models/userModel");


const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.rfindByIdAndUpdate(_id, { token: '' });

  res.status(204).json();
});

module.exports = logout;