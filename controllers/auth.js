const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises')
const Jimp = require("jimp");

const { HttpErrors } = require('../helpers');
const {ctrlWrapper} = require('../decorators');
const { User } = require('../models/user');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, '../', 'public', 'avatars')

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const avatarDefault = gravatar.url(email);

    if (user) {
        throw HttpErrors(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: avatarDefault });
    
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
        throw HttpErrors(401, 'Email or password is wrong')
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
    login: ctrlWrapper(login),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}; 