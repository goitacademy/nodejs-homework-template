const { catchAsync } = require("../../utils/errorHandlers");

const current = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.Status(200).json({
    data: {
      email,
      subscription,
    },
  });
});

module.exports = current;
