const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const service = require("../../model/users");

const { catchAsync } = require("../../utils/errorHandlers");

const register = catchAsync(async (req, res) => {
  const { email } = req.body;

  const avatarUrl = gravatar.url(email);

  const newUser = await service.createUser({
    ...req.body,
    avatarUrl,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
});

module.exports = register;
