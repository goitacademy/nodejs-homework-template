const asyncHandler = require("express-async-handler");

const getCurrent =asyncHandler( async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
});

module.exports = getCurrent;