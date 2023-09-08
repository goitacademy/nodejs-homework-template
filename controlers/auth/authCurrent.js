const { catchAsync } = require("../../utils");

const getCurrent = catchAsync(async (re, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = getCurrent;