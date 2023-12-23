const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('node:path');
const fs = require('node:fs/promises');
const { handleResizeAvatar } = require('../helpers');

const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) throw HttpError(409, 'Email in use');

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const avatarURL = gravatar.url(req.body.email);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription },
    });
};

const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) throw HttpError(401, 'Email or password is wrong');

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
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const avatarURL = path.join('avatars', filename);
    const resultUpload = path.join(avatarDir, filename);

    // await handleResizeAvatar(tempUpload);

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
};
