const { User } = require('../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../helpers');
const path = require("path");
const fs = require("fs/promises");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require("gravatar");
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

require('dotenv').config();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const avatarSize = 250;

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await Jimp.read(tempUpload)
        .then(image => {
            return image.resize(avatarSize, avatarSize).write(resultUpload);
        })
        .catch(err => {
            console.error('Error resizing image:', err);
            throw err;
        });

    await fs.unlink(tempUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
        avatarURL,
    });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, 'Email in use');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });
    
    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);
    res.json({
        message: "Verify email send success"
    })
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, 'User not found');
    }
    await User.findByIdAndUpdate(user._id, {
        verificationToken: null,
        verify: true,
    });
    res.status(200).json({
        message: 'Verification successful',
    });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        throw HttpError(400, 'No user with this email');
    }
    if (user.verify) {
        throw HttpError(400, 'Verification has already been passed');
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);
    res.json({
        message: 'Verification email sent',
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }
    if (!user.verify) {
        throw HttpError(401, 'Email not verified');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
    });
};

const getCurrent = async (req, res) => {
    const { email, name } = req.user;
    res.status(200).json({
        email,
        name,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204);
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};