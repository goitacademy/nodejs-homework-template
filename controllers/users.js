const Users = require('../repository/users');
const jwt = require('jsonwebtoken');
// const fs = require ('fs/promises')
const path = require('path');
const UploadService = require('../services/fileUpload');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { HttpCode } = require('../config/constants');
const mkdirp = require('mkdirp');


const {
  OK,
  CREATED,
  ACCEPTED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = HttpCode;

const registration = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);

  if (user) {
    return res.status(CONFLICT).json({
      status: 'error',
      code: CONFLICT,
      message: 'Email is use',
    });
  }

  try {
    const newUser = await Users.createUser({
      name,
      email,
      password,
      subscription,
    });
    return res.status(CREATED).json({
      status: 'success',
      code: CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }

  res.json();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);

  if (!user || !isValidPassword) {
    return res.status(UNAUTHORIZED).json({
      status: 'error',
      code: UNAUTHORIZED,
      message: 'Invalid login or password',
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await Users.updateToken(id, token);

  return res.status(OK).json({
    status: 'success',
    code: OK,
    data: {
      token,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(NO_CONTENT).json();
};

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  return res.status(OK).json({
    status: 'success',
    code: OK,
    data: { email, subscription },
  });
};

const uploadAvatar = async (req, res, next) => {
  const id = String(req.user._id);
  const file = req.file;
  const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
  const destination = path.join(AVATAR_OF_USERS, id);
  await mkdirp(destination)
  const uploadService = new UploadService(destination);
  const avatarURL = await uploadService.save(file, id);
  await Users.updateAvatar(id, avatarURL);
  // try {
  //   await fs.unlink(file.path)
  // } catch (err) {
  //   console.log(err.message);
  // }

  return res.status(OK).json({
    status: 'success',
    code: OK,
    data: { avatarURL },
  });
};

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  uploadAvatar,
};
