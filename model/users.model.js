const User = require("./schemas/user");

const findById = async (userId) => {
  return await User.findOne({ _id: userId });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  const user = await new User(data);
  return await user.save();
};

const updateToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};

const updateSubscription = async (userId, body) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { ...body },
    { new: true }
  );
};

const updateAvatar = async (userId, avatar) => {
  return await User.updateOne({ _id: userId }, { avatar });
};

const findByVerifyToken = async ({ verificationToken }) => {
  return await User.findOne({ verificationToken });
};

const updateVerifyToken = async (userId, verify, verifyToken) => {
  return await User.updateOne({ _id: userId }, { verify, verifyToken });
};

module.exports = {
  findById,
  findByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
