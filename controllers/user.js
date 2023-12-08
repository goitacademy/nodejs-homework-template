const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const Jimp = require('jimp');
const fs = require('node:fs/promises');
const path = require('node:path');
const HttpError = require('../httpErrors/errors');
const { User } = require('../models/userSchema');
const secret = process.env.SECRET_KEY;

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    const id = newUser._id;
    const token = jwt.sign({ id }, secret, { expiresIn: '1h' });

    await User.findByIdAndUpdate(id, { token });

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}


async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, 'Email or password is wrong!');
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (!compareResult) {
      throw HttpError(401, 'Email or password is wrong!');
    }

    const id = user._id;
    const token = jwt.sign({ id }, secret, { expiresIn: '2h' });

    await User.findByIdAndUpdate(id, { token });
    res.status(201).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const { email, subscription } = req.user || {};

    if (!email || !subscription) {
      throw new HttpError(401, 'Unauthorized.');
    }

    res.json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateAvatar(req, res, next) {
  try {
    const { _id } = req.user;

    const avatarDir = path.join(__dirname, '../public/avatars');

    if (!req.file) {
      const defaultImage = path.join(
        __dirname,
        '../public/avatars/deafault-avatar.jpg'
      );
      const filename = `deafault-avatar.jpg`;
      await fs.copyFile(defaultImage, path.join(avatarDir, filename));
      const avatarURL = path.join('avatars', filename);
      await User.findByIdAndUpdate(_id, { avatarURL });
      return res.json({
        avatarURL,
      });
    }

    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;

    const resultUpload = path.join(avatarDir, originalname);

    const loadedImage  = await Jimp.read(tempUpload);
    await loadedImage .resize(250, 250).write(resultUpload);

    await fs.unlink(tempUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
};
