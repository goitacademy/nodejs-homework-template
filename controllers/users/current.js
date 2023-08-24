const asyncHandler = require("express-async-handler");
const userModel = require("../../models/userModel");

const current = asyncHandler(async (req, res) => {
  const user = await userModel.getUser({ _id: req.user._id });
  if (!user) {
    res.status(401);
    throw new Error("Not authorized!");
  }

  res.status(200).json({ status: "success", code: 200, data: user });
  // res.send("current");
});

module.exports = { current };
