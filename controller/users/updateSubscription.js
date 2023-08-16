const { AppError, catchAsync } = require("../../utils/errorHandlers");
const service = require("../../model/users");

const updateSubscription = catchAsync(async (req, res, next) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;

  if (!subscription) {
    if (!subscription) {
      throw new AppError(400, "No subscription info");
    }
  }

  await service.updateSubscription(_id, subscription);

  return res.status(200).json({
    data: {
      user: {
        email: email,
        subscription,
      },
    },
  });
});

module.exports = updateSubscription;
