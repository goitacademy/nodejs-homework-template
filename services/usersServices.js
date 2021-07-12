const jwt = require('jsonwebtoken');
const { HttpCode } = require('../helpers/constants');
const { uuid } = require('uuidv4');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const {
  findUserByEmail,
  updateToken,
  createUser,
  updateUserById
} = require('../model/users');

const { sendVerifyEmail } = require('./email');

const signup = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new CustomError(HttpCode.CONFLICT, 'This email is already use');
  }
  const newUser = await createUser(email, password);
  const { verifyToken } = newUser;
  sendVerifyEmail(email, verifyToken);
  return newUser;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  const isValidPassword = await user?.validPassword(password);
  if (!user.verify) {
    throw new CustomError(statusCode.UNAUTHORIZED, 'Invalid credentials');
  }
  if (!user || !isValidPassword) {
    throw new CustomError(
      HttpCode.UNAUTHORIZED,
      'Email or password is wrong'
    );
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
  const result = await updateToken(user._id, token);
  return result;
}

const logout = async (id) => await updateToken(userId, null);

const getCurrent = async userId => await getUserById(userId);

const updateUser = async (userId, body) => await updateUserById(userId, body);

const finalAvatarsFolder = path.join(
  process.cwd(),
  'public',
  process.env.AVATARS_FOLDER
);

const saveUserAvatar = async (file, avatar) => {
  const pathName = file.path;
  const newAvatar = `${uuid()}-${file.originalname}`;
  const img = await Jimp.read(pathName);
  await img.autocrop().cover(250, 250).writeAsync(pathName);
  try {
    await fs.rename(pathName, path.join(`${finalAvatarsFolder}`, newAvatar));
  } catch (error) {
    await fs.unlink(pathName);
    throw error;
  }
  if (avatar.includes(`${process.env.AVATARS_FOLDER}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', avatar));
  }
  return path.join(process.env.AVATARS_FOLDER, newAvatar).replace('\\', '/');
};

const resendVerificationToken = async email => {
  const user = await getUserByEmail(email);
  if (user.verify) {
    throw new CustomError(
      statusCode.BAD_REQUEST,
      'Verification has already been passed'
    );
  }
  console.log(user);
  const { verifyToken } = user;
  sendVerifyEmail(email, verifyToken);
};

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateUser,
  saveUserAvatar,
  resendVerificationToken
}