const { catchAsync, AppError } = require("../../utils/errorHandlers");
const Email = require("../../utils/emailService/emailService");
const service = require("../../model/users");

const verification = catchAsync(async (req, res) => {
  console.log("111111111");
  const { email } = req.body;

  const user = await service.findUserByEmail(email);
  if (!user) throw new AppError(401, "email or password is invalid");

  if (user.verify) {
    throw new AppError(400, "Verification has already been passed");
  }
  const emailsender = new Email(user, user.verificationToken);
  await emailsender.sendVerificationToken();

  res.status(200).json({
    user: {
      message: "Verification e-mail had been successfully sent",
    },
  });
});

module.exports = verification;
