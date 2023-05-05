const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const {User} = require('../models/user');
const {HttpError, ctrlWrapper, sendEmail} = require("../helpers");
const {nanoid} = require('nanoid');
require('dotenv').config();

const {SECRET_KEY, BASE_URL} = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target='_blank' href='${BASE_URL}/api/auth/verify/${verificationToken}'> Click verify email </a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

const verifyEmail = async (req, res) => {
    const {verificationToken} = req.params;

    const user = await User.findOne({verificationToken});
    if (!user) {
        throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
    res.json({
        message: "Verification successful"
    });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "Email not found");
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}"> Verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent",
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

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

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    })
}

const getCurrent = async (req, res) => {
    const {email, subscription} = req.user;
    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    res.json({message: "Logout success"})
}

const updateSubscription = async (req, res) => {
    const {_id} = req.user;
    const {subscription} = req.body;
    const result = await User.findByIdAndUpdate(_id, {subscription: subscription}, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
}

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, originalname);
    const image = await Jimp.read(req.file.path);
    await image
        .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(req.file.path);
    await fs.rename(tempUpload, resultUpload);
    const avatarsURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarsURL});
    res.json({
        avatarsURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail:ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}