const User = require("./schemas/users");

const sendVerificationEmail = require("../config/config-sendgrid");

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { nanoid } = require("nanoid");

const registerUser = async ({ email, password }) => {
  const gravatarHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;

  const verificationToken = nanoid();

  const newUser = new User({
    email,
    password,
    avatarURL: gravatarUrl,
    verificationToken,
    verify: false,
  });
  newUser.setPassword(password);

  try {
    await newUser.save();
    await sendVerificationEmail(newUser);
  } catch (err) {
    console.error("Error saving user:", error);
    throw error;
  }

  return newUser;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return null;
  }
  user.verificationToken = null;
  user.verify = true;
  await user.save();
  return user;
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email, verify: false });
  if (!user) {
    return null;
  }
  await sendVerificationEmail(user);
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

const updateToken = async (userId, token) => {
  return User.findByIdAndUpdate(userId, { token }, { new: true });
};

const logoutUser = async (userId) => {
  return updateToken(userId, null);
};

const getCurrentUser = async (userId) => {
  return User.findById(userId, "-password -token");
};

const updateSubscription = async (userId, subscription) => {
  return User.findByIdAndUpdate(userId, { subscription }, { new: true });
};

const updateAvatar = async (userId, avatarURL) => {
  return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
};

module.exports = {
  registerUser,
  loginUser,
  updateToken,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerificationEmail,
};
