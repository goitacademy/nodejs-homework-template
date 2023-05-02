const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const {User} = require('../models/user');
const {HttpError, ctrlWrapper} = require("../helpers");
require('dotenv').config();

const {SECRET_KEY} = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

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
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}