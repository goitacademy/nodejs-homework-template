const { HttpError, tokenGenerator } = require("../../helpers");
const { userSchema } = require("../../schemas");
const bcrypt = require("bcrypt");
const { UserServices } = require("../../services");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { email, password } = req.body;
  const user = await UserServices.login(email);
  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = tokenGenerator(user.id);
  await UserServices.updateUserToken(user.id, token);
  const resMesage = {
    status: 200,
    token,
    user: {
      email: user.email,
      subcription: user.subscription,
    },
  };
  res.status(200).json(resMesage);
});

module.exports = login;
