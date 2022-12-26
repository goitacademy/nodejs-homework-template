import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs/promises';
import Jimp from 'jimp';
import userServices from '../services/user.js';
import { createError } from '../helpers/error.js';

dotenv.config();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const schema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string()
    .pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
});

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validationResult = schema.validate({ email, password });
    if (validationResult.error) {
      throw createError(400, validationResult.error);
    }

    const user = await userServices.signup(email, password);

    if (!user) {
      throw createError(400, '"Email in use"');
    }

    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.login(email);
    if (!user) {
      throw createError(404, 'User not found');
    }

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw createError(401, 'Email or password is wrong');
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '24h',
    });

    const updateUser = await userServices.updateLogin(email, token);

    res.json({ updateUser });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await userServices.logout(_id);
    if (!user) {
      throw createError(401, 'Not authorized');
    }

    res.status(204).json({ message: 'No Content' });
  } catch (e) {
    next(e);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const userId = req.user._id;
  const { originalname, path: tempPath } = req.file;
  const newName = `${userId + '-' + originalname}`;
  const newPath = path.join(__dirname, '../public/avatars', newName);
  const avatarURL = `http://${process.env.MONGO_URL}:${process.env.PORT}/api/avatars/${newName}`;

  try {
    const img = await Jimp.read(tempPath);
    img.resize(250, 250);
    img.write(tempPath);

    await fs.rename(tempPath, newPath);
    await User.findOneAndUpdate({ email: req.user.email }, { avatarURL });

    res.json({
      avatarURL: avatarURL,
    });
  } catch (e) {
    await fs.unlink(tempPath);
    next(e);
  }
};

export default {
  signup,
  login,
  logout,
  updateUserAvatar,
};
