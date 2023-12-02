import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatar");
// var gravatar = require("gravatar");

// var url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
// //returns //www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404

// var unsecureUrl = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, false);
// //returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100&r=x&d=retro

// var secureUrl = gravatar.url('emerleite@gmail.com', {s: '100', r: 'x', d: 'retro'}, true);
// //returns https://s.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100&r=x&d=retro

// var httpUrl = gravatar.url('emerleite@gmail.com', {protocol: 'http', s: '100'});
// //returns http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100

// var httpsUrl = gravatar.url('emerleite@gmail.com', {protocol: 'https', s: '100'});
// //returns https://s.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=100

//returns https://secure.gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.json

// var profile2 = gravatar.profile_url('emerleite@gmail.com', {protocol: 'http', format:'qr'});
//returns http://www.gravatar.com/93e9084aa289b7f1f5e4ab6716a56c3b.qr

const register = async (req, res, next) => {
  const { email, password } = req.body;
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(avatarsPath, filename);
  // await fs.rename(oldPath, newPath);

  const avatar = gravatar.profile_url(
    email
    //   {
    //   format: "jpg",
    // }
  );
  // const avatar = path.join("avatars", filename);
  // const result = await Movie.create({ ...req.body, avatar, owner });

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    avatarURL: avatar,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarURL: avatar,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  // const { _id } = req.user;
  // // const user = await User.findByIdAndUpdate(_id, { token: "" },);
  // const user = await User.findOne( {token: "" });
  // if (!user || !token) {
  //   return res.status(401).json({
  //     message: "Not authorized",
  //   });
  // }
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { token: "" }, { new: true });

  if (!user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  res.status(204).end();
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
