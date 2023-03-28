const catchAsync = require("../../utils/catchAsync");
console.log("getcurrent--------------------------------");
const getCurrent = catchAsync(async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
});

module.exports = getCurrent;
