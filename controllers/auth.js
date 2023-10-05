const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises')
const Jimp = require("jimp");
const {nanoid} = require('nanoid');

const { HttpErrors, sendEmail } = require('../helpers');
const {ctrlWrapper} = require('../decorators');
const { User } = require('../models/user');
require('dotenv').config();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarDir = path.join(__dirname, '../', 'public', 'avatars')

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const avatarDefault = gravatar.url(email);
    const verificationToken = nanoid()

    if (user) {
        throw HttpErrors(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: avatarDefault, verificationToken });

    const emailVerify = {
        to: newUser.email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
    };

    await sendEmail(emailVerify);
    
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken })
    
    if (!user) {
        throw HttpErrors(404, 'User not found')
    };

    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true });

    res.json({
        message: 'Verification successful'
    });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpErrors(401, 'Email is wrong')
    };

    if (user.verify) {
        throw HttpErrors(400, 'Verification has already been passed')
    };

    const emailVerify = {
        to: user.email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(emailVerify);
    
    res.json({
        message: "Verification email sent"
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
        throw HttpErrors(401, 'Email or password is wrong')
    };

    if (!user.verify) {
        throw HttpErrors(401, "Email not verified");
    };
    
    const passwordCompare = await bcrypt.compare(password, user.password);

     if (!passwordCompare) {
        throw HttpErrors(401, 'Email or password is wrong')
    };

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: {
            "email": user.email,
            "subscription": user.subscription,
        },
    });
};

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.json({
        user: {
            "email": user.email,
            "subscription": user.subscription,
        },
    });
};

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    await (await Jimp.read(tmpUpload)).cover(250, 250).writeAsync(tmpUpload);

    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);

    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).json()
};

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}; 