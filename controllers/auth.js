const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const path = require('node:path');
const fs = require('node:fs/promises');

const { User } = require('../models/user');
const {
    HttpError,
    ctrlWrapper,
    sendEmail,
    handleResizeAvatar,
} = require('../helpers');

const { SECRET_KEY, BASE_URL } = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) throw HttpError(409, 'Email in use');

    const hashPassword = await bcrypt.hash(password, 12);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<p>Please confirm your <i>Email</i></p><a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription },
    });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) throw HttpError(404, 'User not found!');

    if (user.verify)
        throw HttpError(400, 'Verification has already been passed');

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });

    res.json({
        message: 'Verification successful!',
    });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(404, 'User not found');

    if (user.verify) throw HttpError(400, 'Email already verify');

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<p>Please confirm your <i>Email</i></p><a href="${BASE_URL}/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent',
    });
};

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw HttpError(401, 'Email or password is wrong');

    if (!user.verify) throw HttpError(401, 'Email not verified');

    const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: { email: user.email, subscription: user.subscription },
    });
};

const logout = async (req, res) => {
    console.log(req.user);
    await User.findByIdAndUpdate(req.user._id, { token: '' });
    res.status(204).json();
};

const getCurrent = async (req, res) => {
    res.json({
        email: req.user.email,
        subscription: req.user.subscription,
    });
};

const updateSubscriptionUser = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
    });
    if (!result) throw HttpError(404, 'Not Found!');
    res.json({
        message: `Your subscription changed to ${req.body.subscription}!`,
    });
};

const updateAvatar = async (req, res) => {
    if (!req.file) throw HttpError(400, 'No file uploaded!');

    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const avatarURL = path.join('avatars', filename);
    const resultUpload = path.join(avatarDir, filename);

    await handleResizeAvatar(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    res.json({
        avatarURL,
    });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
