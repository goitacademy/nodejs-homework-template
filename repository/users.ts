const { nanoid } = require("nanoid");
const User = require("../models/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const createUser = async (body) => {
  const user = await User(body);
  user.verificationToken = nanoid();
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const verifyUser = async (id) => {
  return await User.findByIdAndUpdate(id, {
    verify: true,
    verificationToken: null,
  });
};

const updateUser = async (id, body) => {
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const updateAvatar = async (id, avatar) => {
  return await User.findByIdAndUpdate(id, { avatar });
};

module.exports = {
  findById,
  findByEmail,
  findByToken,
  createUser,
  updateToken,
  verifyUser,
  updateUser,
  updateAvatar,
};
export {};
