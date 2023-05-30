const asyncHandler = require("express-async-handler");

const current = asyncHandler(async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ status: 200, email, subscription });
});

module.exports = current;
