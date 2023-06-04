const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const registerNewUSer = async (req, res) => {
  const { email, password } = req.body;

  const isAlreadyUsed = await User.findOne({ email });
  if (isAlreadyUsed) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const registeredUser = await User.create({ email, password: hashedPassword });

  res.status(201).json({
    email: registeredUser.email,
    subscription: registeredUser.subscription,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (isMatch === false) {
    throw HttpError(401, "Email or password is wrong");
  }

  res.status(200).json({
    token: "exampletoken",
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  registerNewUSer: ctrlWrapper(registerNewUSer),
  loginUser: ctrlWrapper(loginUser),
};
