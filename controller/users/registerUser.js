const uuid = require("uuid").v4;
const gravatar = require("gravatar");

const service = require("../../model/users");

const { catchAsync } = require("../../utils/errorHandlers");
const Email = require("../../utils/emailService/emailService");

const register = catchAsync(async (req, res) => {
  const { email } = req.body;

  const avatarUrl = gravatar.url(email);
  const verificationToken = uuid();

  const newUser = await service.createUser({
    ...req.body,
    avatarUrl,
    verificationToken,
  });

  const emailsender = new Email(newUser, verificationToken);
  await emailsender.sendVerificationToken();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

module.exports = register;
