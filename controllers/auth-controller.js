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
import { nanoid } from "nanoid";
import sendEmail from "../helpers/SendEmail.js";

dotenv.config();
const { JWT_SECRET, BASE_URL } = process.env;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use")
    }
const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10)
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
        
}
    await sendEmail(verifyEmail);
     res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription,  },
  });
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, 'User not found')
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        message: "Verification successful"
    })
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
        
    }
    await sendEmail(verifyEmail)
    res.json({
        message: "Verification email sent"
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verify")
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
    await User.findByIdAndUpdate(id, { token })
    res.json({
        token,
        user: { user: user.email, subscription: user.subscription },
     
    })
};




const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};


const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id, { token: "" })
    res.status(204).json();
};

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw HttpError(400, 'Avatar must be provided');
    }
    const { _id } = req.user
    const { path: tempUpload, filename } = req.file;
    // const filename = `${Date.now()}-${originalname}`;
    const resultUpload = path.join(avatarPath, filename);

    Jimp.read(tempUpload, (err, image) => {
        if (err) throw HttpError(404, err);
        image.resize(250, 250)
            .write(resultUpload);
    });
    await fs.unlink(tempUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL })
    res.json({ avatarURL })
};


export default {
    signup: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
      resendVerifyEmail:ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar)
  
}