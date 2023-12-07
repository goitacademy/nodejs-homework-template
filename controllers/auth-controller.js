import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import path from 'path';
import fs from 'fs/promises';
import Jimp from "jimp";
import "dotenv/config"
import gravatar from 'gravatar'

import {User} from "../models/User.js";
import {HttpError} from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve('public', 'avatars');

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
    const hashPassword = await bcryptjs.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", r: "g", d: "retro" }, true);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
  
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
        }  
    });
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcryptjs.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });
    
    res.status(200).json({
        user: { email: user.email, subscription: user.subscription },
        token,
    });
};

export const signout = async (req, res, next) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, { token: "" });

    if (!result) {
        return next(HttpError(401, "Not authorized"));
    }

    res.status(204).end();
};

export const current = async (req, res, next) => {
    const user = req.user;
    res.status(200).json(
        {
            email: user.email,
            subscription: user.subscription
        });
} 

export const updateSubscription = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    
    const result = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );
    res.status(200).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
        
    });
};

export const updateAvatar = async (req, res, next) => {
    const id = req.user._id;
    const { path: tempPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    const phone = await Jimp.read(tempPath);
    phone.resize(250, 250).write(newPath);
    fs.unlink(tempPath);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(id, { avatarURL });

    res.status(200).join({ avatarURL });
}