const { Users } = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const registerUser = async ({ email, password }) => {
  const newUser = new Users({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email),
  });
  await newUser.save();
  return newUser;
};

const findUser = async ({ email }) => {
  const user = await Users.findOne({ email });
  if (user) {
    return user;
  }
};

const findById = async (id) => {
  const user = await Users.findById(id);
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordGood = await bcrypt.compare(password, user.password);
  if (!isPasswordGood) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();
  return user;
};

const findByIdAndAvatarUpdate = async (id, avatarURL) => {
  const user = await Users.findByIdAndUpdate(id, { avatarURL });
  return user;
};
module.exports = {
  findUser,
  findById,
  findByIdAndAvatarUpdate,
  registerUser,
  loginUser,
};
