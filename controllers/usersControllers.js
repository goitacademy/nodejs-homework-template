import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/schemas/userModel.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import Jimp from 'jimp';

import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../models/services/users.js";
import createError from '../utilites/createErrorHandler.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await registerUser(email, password);

        if (!user) {
            throw createError(409, 'Email in use');
        }
        res.status(201).json({
            user: { email: user.email, subscription: user.subscription },
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }, 'password');

        if (!user) {
            throw createError(404, 'User not found');
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
            throw createError(401, 'Email or password is wrong');
        }

        const payload = {
            _id: user._id,
        };

        const SECRET = process.env.JWT_SECRET;
        const token = jwt.sign(payload, SECRET);

        const loggedInUser = await loginUser(email, token);

        res.json({
            token: token,
            user: {
                email: loggedInUser.email,
                subscription: loggedInUser.subscription,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    const { _id } = req.user;

    try {
        const user = await logoutUser(_id);

        if (!user) {
            throw createError(401, 'Not authorized');
        }
        res.status(204).json({
            message: 'success',
        });
    } catch (err) {
        next(err);
    }
};

export const getCurrentUser = async (req, res, next) => {
    res.json({
        user: {
            email: req.user.email,
            subscription: req.user.subscription,
        },
    });
};

export const updateStatus = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await updateUser(_id, req.body);
        res.json({
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const updAvatar = async (req, res, next) => {
    const userId = req.user._id;
    const { originalname, path: tempPath } = req.file;
    const newName = `${userId + '-' + originalname}`;
    const newPath = path.join(__dirname, '../public/avatars', newName);
    const avatarURL = `http://localhost:${process.env.DB_PORT}/api/avatars/${newName}`;

    try {
        const img = await Jimp.read(tempPath);
        img.resize(255, 255);
        img.write(tempPath);

        await fs.rename(tempPath, newPath);

        await User.findOneAndUpdate({ email: req.user.email }, { avatarURL });

        res.json({
            avatarURL: avatarURL,
        });
    } catch (err) {
        await fs.unlink(tempPath);
        next(err);
    }
};
