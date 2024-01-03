const { User } = require("../models");
const { HttpError } = require("../addoption/");
const jwt = require("jsonwebtoken");


exports.checkUserEmailExists = async (email) => {
  const emailExists = await User.exists(email);

  if (emailExists) throw HttpError(409, "Email in use");
};

exports.registerUser = async (data) => {
  const newUserData = {
    ...data,
  };
  const newUser = await User.create(newUserData);

  newUser.password = undefined;
  //   const token = signToken(newUser.id);
  return {
    user: newUser,
    // token,
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw HttpError(401, "Email or password is wrong");

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  await User.findByIdAndUpdate(user.id, { token });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};
