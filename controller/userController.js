const gravatar = require("gravatar");
const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { jwtSign } = require("../utils/jwt.util");
const { v4: uuidv4 } = require("uuid");
const { sendVerifyEmail } = require("../utils/verify.util");

const signUp = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return null;
  }
  const secureUrl = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    email,
    password: hashPassword(password),
    avatarURL: secureUrl,
    verificationToken,
  });

  const updatedUser = await User.findOneAndUpdate(
    { _id: newUser._id },
    {
      token: jwtSign({ _id: newUser._id }),
    },
    { new: true }
  );
  sendVerifyEmail(verificationToken, email);
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

const updateAvatar = async (_id, avatarURL) => {
  const user = await User.findByIdAndUpdate(
    { _id },
    { avatarURL },
    { new: true }
  );
  return user;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  console.log("user by token", user);
  if (!user) {
    return null;
  }
  const verifyUser = await User.findOneAndUpdate(
    { _id: user._id },
    { verificationToken: null, verify: true },
    { new: true }
  );
  return verifyUser;
};

const resendVerifyUser = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  if (user.verify) {
    return {
      status: 400,
      message: "Verification has already been passed",
    };
  }
  sendVerifyEmail(user.verificationToken, email);
};

module.exports = {
  signUp,
  signIn,
  logout,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerifyUser,
};
