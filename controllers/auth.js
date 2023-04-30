const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar')
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const { User } = require('../models/users');
const { asyncMiddleware } = require('../middlewars');
const { httpError, sendEmail } = require('../helpers');
const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.resolve('public', 'avatars');

const AVATAR_SIZE = 250;

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw httpError(409, 'User with this email already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: 'Email verification',
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify your email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription }
    });
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw httpError(404, 'User not found')
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.status(200).json({
        message: 'Verification successful'
    })
}

const resendVerificationMail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
 
    if (user.verify) {
        throw httpError(400, 'Verification has already been passed');
    }

    const verifyEmail = {
        to: email,
        subject: 'Email verification',
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click here to verify your email</a>`
    }

    await sendEmail(verifyEmail);

    res.status(200).json({message: 'Verification email sent'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw httpError(401, 'Email or password is invalid');
    }

    if (!user.verify) {
        throw httpError(401, 'Your email is not verified! Please verify your email adress.');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw httpError(401, 'Email or password is invalid');
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: { email: user.email, subscription: user.subscription }
    })
};

const logoutUser = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
};
    
const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
    const {
        user: { _id },
        body,
    } = req;
    const { email, subscription } = await User.findByIdAndUpdate(_id, body, {new: true});

    res.json({ email, subscription });
};

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;
    const avatarName = `${_id}_${filename}`;

    try {
        const resultUpload = path.join(avatarsDir, avatarName);
        const image = await Jimp.read(tempUpload);
        await image
            .cover(AVATAR_SIZE, AVATAR_SIZE)
            .quality(75)
            .writeAsync(resultUpload);
    } catch (error) {        
        throw httpError(500, 'Failed to update avatar')
    }
    finally {
        await fs.unlink(tempUpload)
    }
    const avatarURL = path.join('avatars', avatarName)
    await User.findOneAndUpdate(_id, { avatarURL });


    res.json({ avatarURL });
}

module.exports = {
    register: asyncMiddleware(registerUser),
    verify: asyncMiddleware(verify),
    resendVerificationMail: asyncMiddleware(resendVerificationMail),
    login: asyncMiddleware(loginUser),
    logout: asyncMiddleware(logoutUser),
    getCurrent: asyncMiddleware(getCurrentUser),
    updateSubscription: asyncMiddleware(updateSubscription),
    updateAvatar: asyncMiddleware(updateAvatar)
}