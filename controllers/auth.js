const { HttpError, ctrlrWrapper } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

const register = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user) throw HttpError(409, 'Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashedPassword, avatarURL});

    res.status(201).json({
        user: {
            email: newUser.email,
            subsciption: newUser.subscription
        }
    })
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'Invalid email or password');
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Invalid email or password');
    const payload = {
        id: user._id,

    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subsciption: user.subscription
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(204).json();
}

const updateById = async (req, res) => {
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!updatedUser) throw HttpError(404);
    res.status(200).json({
        email: updatedUser.email,
        subscription: updatedUser.subscription
    });
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const fileName = `${_id}_${originalname}`;
    (await Jimp.read(tempUpload)).resize(250,250).write(tempUpload);
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlrWrapper(register),
    login: ctrlrWrapper(login),
    getCurrent: ctrlrWrapper(getCurrent),
    logout: ctrlrWrapper(logout),
    updateById: ctrlrWrapper(updateById),
    updateAvatar: ctrlrWrapper(updateAvatar)
}