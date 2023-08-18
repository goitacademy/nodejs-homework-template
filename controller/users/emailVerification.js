const { AppError, catchAsync } = require("../../utils/errorHandlers");
const service = require("../../model/users");

const emailVerification = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  console.log("verificationToken", verificationToken);

  if (!verificationToken) {
    if (!verificationToken) {
      throw new AppError(404, "User not found");
    }
  }
  const user = await service.findUserByToken(verificationToken);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  await service.updateUser(user._id, { verificationToken: null, verify: true });

  res.status(200).json({
    message: "Verification successful",
  });
});
module.exports = emailVerification;
