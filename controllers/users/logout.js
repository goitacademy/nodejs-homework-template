const asyncHandler = require("express-async-handler");
const userModel = require("../../models/userModel");

const logout = asyncHandler(async (req, res) => {
  const user = await userModel.getUser({ _id: req.user._id });
  if (!user) {
    res.status(401);
    throw new Error("Not authorized!");
  }
  
  user.setToken(null);
  await user.save();
  res.status(204).json({ status: "success", code: 204, data: {message: "No content"} });
});

module.exports = { logout };
