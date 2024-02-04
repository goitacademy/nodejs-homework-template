import path from "path";
import fs from "fs/promises";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import Jimp from "jimp";


import { User } from "../models/User.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";

dotenv.config();
const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use")
    }

    
   const avatarURL = gravatar.url(email);


const hashPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({...req.body, password:hashPassword,avatarURL});
     res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription,  },
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401,"Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = {
        id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token})
    res.json({
           token,
         user: { user: user.email, subscription: user.subscription },
     
    })
}

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};


const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id, { token: "" })
     res.status(204).json();
}

const updateAvatar = async (req, res) => {
       if (!req.file) {
    throw HttpError(400, 'Avatar must be provided');
  }
    const {_id} = req.user
    const { path: tempUpload, filename } = req.file;
    const resultUpload = path.join(avatarPath, filename);

 Jimp.read(tempUpload, (err, image) => {
        if (err) throw HttpError(404, err);
        image.resize(250, 250)
            .write(resultUpload);
    });
   await fs.unlink(tempUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json ({avatarURL})
}
export default {
    signup: ctrlWrapper(register),
    signin: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar)
}