import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";
import User from "../models/Users.js";

import { HttpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { nanoid } from "nanoid";

const postersPath = path.resolve("public", "avatars");
const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.profile_url(email, { protocol: 'https' });
    const verificationCode = nanoid();

    const newUser = await User.create({...req.body, avatarURL, password: hashPassword, verificationCode});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await User.findOne({ verificationCode });
    console.log(user);
    if(!user) {
        throw HttpError(400, "Email not found or already verify");
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        message: "Email veify success"
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }
    if(user.verify) {
        throw HttpError(400, "Email already verify");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
}

const signin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    if(!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;
    const payload = {
        id
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    const newUser = await User.findByIdAndUpdate(id, { token });

    res.json({
        token,
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Signout success"
    })
}

const avatarUpdate = async (req, res) => { 
    const { _id } = req.user;
    if (!req.file) {
        throw HttpError(400, `attached required file`);
    }

    const { path: oldPath, filename } = req.file;
    const newPath = path.join(postersPath, filename);

    const newsize = await Jimp.read(oldPath);
    await newsize.resize(250, 250).write(oldPath);

    await fs.rename(oldPath, newPath);

    const poster = path.join("public", "avatars", filename);

    const result = await User.findByIdAndUpdate({_id},{"avatarURL": poster}, {new: true});
    if (!result) {
        throw HttpError(404, `User with id=${contactId} not found`);
    }
    
    res.json(result);
}

const subscriptionUpdate = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate({_id}, req.body, {new: true});
    if (!result) {
         throw HttpError(404, `User with id=${contactId} not found`);
    }

    res.json(result);
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
    avatarUpdate: ctrlWrapper(avatarUpdate),
}