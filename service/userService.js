const User = require("./schemas/users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const registerUser = async ({ email, password }) => {
  const gravatarHash = crypto
    .createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;

  const newUser = new User({ email, password, avatarURL: gravatarUrl });
  newUser.setPassword(password);
  try {
    await newUser.save();
  } catch (err) {
    console.error("Error saving user:", error);
    throw error;
  }
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
};
