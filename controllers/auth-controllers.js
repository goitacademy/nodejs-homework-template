import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { resize } from "../middlewares/index.js";

import gravatar from "gravatar";

import User from "../models/user.js";

import { HttpError, ctrlWrapper } from "../helpers/index.js";

// console.log(process.env.JWT_SECRET)

const { JWT_SECRET } = process.env;

// const signup = async (req, res) => {
//   const newUser = await User.create(reg.body);

//   res.status(201).json({
//     name: newUser.name,
//     email: newUser.email,
//   })
// }

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) { 
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  })
}

const signin = async(req, res)=> {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) { 
    throw HttpError(401, "email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid");
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token});

  res.json({
    token,
  })
}

const getCurrent = (req, res) => { 
  const { name, email } = req.user;
  res.json({
    name,
    email,
  })
}

const signout = async(req, res) => { 
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  
  res.json({
    message: "Signout success"
  })
}

const updateAvatar = async (req, res) => { 

  const {_id} = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  resize(avatarURL);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  })

}

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
}