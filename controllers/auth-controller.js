import fs from 'fs/promises';
import path from 'path';
import gravatar from 'gravatar';
import jimp from 'jimp';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ctrlWrapper } from "../decorator/index.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve('public', 'avatars')


const registered = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
   const avatarURL = gravatar.url(email);
   console.log(avatarURL);

  const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword });
  
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password wrong"); //
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    email: user.email,
    subscription: user.subscription,
  });
};

const current = async (req, res, next) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout ssucess",
  });
};


const updateAvatar =async(req, res) => {
  const { _id } = req.user;
  const {path: tempUpload, originalname} = req.file; 
  const fileName = `${_id}_${originalname}`
  
  const newPath = path.join(avatarPath, fileName)

  await fs.rename(tempUpload, newPath) 
 const avatarURL = path.join('avatars', fileName)


  const newAvatar = await User.findByIdAndUpdate(_id, {avatarURL });
  if (!newAvatar) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  
  res.status(200).json({avatarURL: newAvatar.avatarURL});
};


export default {
  registered: ctrlWrapper(registered),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  updateAvatar: ctrlWrapper(updateAvatar),
  logout: ctrlWrapper(logout),
};
