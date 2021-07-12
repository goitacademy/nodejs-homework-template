const { uuid } = require('uuidv4');
const { User } = require('../schemas/userModel');
const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const updateToken = async ({ contactId, token }) => {
  return await User.findByIdAndUpdate(contactId, { token }, { new: true });
}

const createUser = async (email, password) => {
  const verifyToken = uuidv();
  const user = new User({ email, password, verifyToken });
  return await user.save();
};

const updateUserById = async (userId, body) => {
  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { ...body },
    },
    { new: true }
  );
  if (!result) {
    throw new CustomError(statusCode.NOT_FOUND, 'Not found');
  }
  return result;
};

const updateAvatar = async (userId, file, avatar, cb) => {
  const avatarURL = await cb(file, avatar);
  await User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
  return avatarURL;
};

const getUserByVerifyToken = async verifyToken => {
  const verifiedUser = await User.findOne({ verifyToken });
  if (!verifiedUser) {
    throw new CustomError(statusCode.NOT_FOUND, 'User not found');
  }
  return verifiedUser;
};

const updateVerifyToken = async (userId, verify, verifyToken) =>
  await User.findByIdAndUpdate(userId, { verify, verifyToken }, { new: true });

module.exports = {
  findUserByEmail,
  updateToken,
  createUser,
  updateUserById,
  updateAvatar,
  getUserByVerifyToken,
  updateVerifyToken
}