const jwt = require('jsonwebtoken');
const HttpError = require('../helpers/httpError');

const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const Jimp = require('jimp');

const fs = require('fs');
const path = require('path');

const { STATIC_URL, PORT } = process.env;

async function registration(req, res, next) {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email, { s: '250', r: 'x', d: 'retro' }, true);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword, avatarURL });
    const responseData = {
      user: {
        email,
        subscription: newUser.subscription,
      },
    };

    res.status(201).json({ ...responseData });
  } catch (error) {
    if (error.code === 11000) {
      throw new HttpError(409, 'Email in use');
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { JWT_SECRET } = process.env;

    const storedUser = await User.findOne({ email });
    if (!storedUser) {
      throw new HttpError(401, 'Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!isPasswordValid) {
      throw new HttpError(401, 'Email or password is wrong');
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    await User.findByIdAndUpdate(storedUser._id, { token });

    const responseData = {
      token,
      user: {
        email: storedUser.email,
        subscription: storedUser.subscription,
      },
    };
    res.status(200).json({ ...responseData });
  } catch (error) {
    next(error);
  }
}

async function currentUser(req, res, next) {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
}

async function logout(req, res, next) {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
}

async function updateSubscription(req, res, next) {
  const { id } = req.user;
  const { subscription } = req.body;

  if (subscription !== 'starter' && subscription !== 'pro' && subscription !== 'business') {
    throw new HttpError(400, 'Subscription must be < starter >, < pro > or < business >');
  }

  await User.findByIdAndUpdate(id, { subscription });
  res.status(201).json({ message: `Suscription updated to < ${subscription} >` });
}

async function changeAvatar(req, res, next) {
  const { filename } = req.file;
  const { id } = req.user;

  const splitedFilename = filename.split('.');
  const fileExt = splitedFilename[splitedFilename.length - 1];
  const newFilename = id + '.' + fileExt;

  const tmpPath = path.resolve(__dirname, '../tmp', filename);
  const publicPath = path.resolve(__dirname, '../public/avatars', newFilename);

  await Jimp.read(tmpPath)
    .then(async image => {
      await image.resize(250, Jimp.AUTO).writeAsync(tmpPath);
    })
    .then(() => {
      fs.renameSync(tmpPath, publicPath);
    })
    .catch(error => {
      throw new Error(error);
    });

  const avatarURL = STATIC_URL + PORT + '/avatars/' + newFilename;
  const user = await User.findByIdAndUpdate(id, { avatarURL: avatarURL }, { new: true });
  res.status(200).json(user.avatarURL);
}

module.exports = {
  registration,
  login,
  currentUser,
  logout,
  updateSubscription,
  changeAvatar,
};
