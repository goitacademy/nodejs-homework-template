const jwt = require('jsonwebtoken');
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const Users = require('../model/users');
const { HttpCode } = require('../helper/constants');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is ready use',
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.validPassword(password);
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'Unauthorized',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
  await Users.updateToken(user.id, token);
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      token,
      user: { email: user.email, subscription: user.subscription },
    },
  });
};

const current = async (req, res, next) => {
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      user: { email: req.user.email, subscription: req.user.subscription },
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarUrl = await saveAvatarUsers(req);
  await Users.updateAvatar(id, avatarUrl);
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } });
};
const saveAvatarUsers = async req => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
  // req.file
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);

  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar),
    );
  } catch (e) {
    console.log(e.message);
  }

  return path.join(FOLDER_AVATARS, newNameAvatar);
};

module.exports = {
  reg,
  login,
  logout,
  current,
  updateAvatar,
};
