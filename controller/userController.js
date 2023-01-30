const { isAuthorized } = require("../middleware/auth");
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { jwtSign, jwtVerify } = require("../utils/jwt.util");

const signUp = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return null;
  }
  const newUser = await User.create({
    email,
    password: hashPassword(password),
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: newUser._id },
    {
      token: jwtSign({ _id: newUser._id }),
    },
    { new: true }
  );

  return updatedUser;
};

const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return null;
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};

const logout = async (_id) => {
  const user = await User.findOneAndUpdate(
    { _id },
    {
      token: null,
    },
    { new: true }
  );
  console.log("🚀 ~ file: userController.js:47 ~ logout ~ user", user);

  return user;
};

const updateSubscription = async (_id, subscription) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );
  return user;
};

module.exports = {
  signUp,
  signIn,
  logout,
  updateSubscription,
};
