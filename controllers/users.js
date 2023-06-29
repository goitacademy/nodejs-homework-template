const { User, hashPassword } = require("../models/user.js");
const gravatar = require("gravatar");

const createUser = async (email, password) => {
  const hashedPassword = hashPassword(password);
  const gravatarUrl = gravatar.url(email, { s: 250 });
  const newUser = new User({
    email: email,
    password: hashedPassword,
    avatarURL: gravatarUrl,
  });
  await newUser.save();
  return newUser;
};

const getUserById = async (_id) => {
  const user = await User.findById(_id);
  return user;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  return user;
};

const updateUser = async (_id, newData) => {
  const updatedUser = await User.findOneAndUpdate(_id, newData, { new: true });
  return updatedUser;
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserByEmail,
};