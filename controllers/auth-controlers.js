import ModelUser from "../models/Model-user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";

import { httpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import gravatar from 'gravatar';
import Jimp from "jimp";
import path from 'path'
import fs from 'fs/promises'
const { JWT_SECRET, BASE_URL } = process.env;

const singup = async (req, res, next) => {
    const { email, password, subscription = "starter" } = req.body;
    const user = await ModelUser.findOne({ email });
    if (user) {
        throw httpError(409, `${email} in use`)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();
    const avatarURL = gravatar.url(email, { s: '200', d: "wavatar" });

    const newUser = await ModelUser.create({ ...req.body, avatarURL, password: hashPassword, verificationCode });

    const verifyEmail = {
        to: email,
        contentType: "HTML",
        content: `<a target='_blank' href="http://${BASE_URL}/api/users/verify/${verificationCode}">Verify link</a>`,
        subject: "Verify email "

    }

    sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email,
            subscription,
        }
    })
}
const singin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await ModelUser.findOne({ email });
    if (!user) {
        throw httpError(401, 'Email or password is wrong')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw httpError(401, 'Email or password is wrong')
    }
    const payload = {
        id: user._id
    }

    if (!user.verify) {
        throw httpError(401, 'Email is not verify');
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '48h' });
    await ModelUser.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        'user': {
            email: user.email,
            subscription: user.subscription
        }
    })
}
const verify = async (req, res, next) => {
    const { verificationCode } = req.params;
    const user = await ModelUser.findOne({ verificationCode })
    if (!user) {
        throw httpError(404, 'verificationCode invalid')
    }

    await ModelUser.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' })

    res.status(200).json({
        message: 'Verification successful'
    })
}

const resendEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await ModelUser.findOne({ email })
    if (!user) {
        throw httpError(404, 'Email is not fund')
    }
    if (user.verify) {
        throw httpError(400, 'Verification has already been passed')
    }

    const verifyEmail = {
        to: email,
        contentType: "HTML",
        content: `<a target='_blank' href="http://${BASE_URL}/api/users/verify/${user.verificationCode}">Verify link</a>`,
        subject: "Repeated confirmation letter"

    }
    sendEmail(verifyEmail);

    res.status(200).json({
        message: 'Verify leter resended success'
    })
}
const logout = async (req, res, next) => {
    const { _id } = req.user;
    await ModelUser.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "Signout success"
    })
}


const changeAvatar = async (req, res, next) => {
    const { _id } = req.user;

    const saveImagePath = path.resolve('public', 'avatars', req.file.filename)
    Jimp.read(req.file.path).then((photo) => {
        return photo
            .resize(250, 250) // resize
            .write(saveImagePath); // save
    })

    const saveImageLink = path.join('avatars', req.file.filename)
    await ModelUser.findByIdAndUpdate(_id, { avatarURL: saveImageLink });
    await fs.unlink(req.file.path);

    res.status(200).json({
        avatarURL: saveImageLink
    })
}

const current = async (req, res, next) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
}

export default {
    singup: ctrlWrapper(singup),
    singin: ctrlWrapper(singin),
    verify: ctrlWrapper(verify),
    resendEmail: ctrlWrapper(resendEmail),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    changeAvatar: ctrlWrapper(changeAvatar)
}