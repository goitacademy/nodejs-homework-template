const User = require("./usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const createUser = async (userData) => {
  const avatarURL = gravatar.url(email);
  const user = new User({ ...userData, avatarURL });

  const hashedPass = bcrypt.hash(userData.password, 10).then((hash) => {
    return hash;
  });

  user.password = await hashedPass;
  await user.save();

  return user;
};

const verifyUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    return false;
  }

  const match = await bcrypt.compare(userData.password, user.password);
  if (!match) {
    return false;
  }

  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

  await User.findByIdAndUpdate(user._id, { token: token });
  const updatedUser = await User.findById(user._id);

  return updatedUser;
};

const updateUserData = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

module.exports = { createUser, verifyUser, updateUserData };
