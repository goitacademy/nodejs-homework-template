require('dotenv').config();
const bcryt = require("bcrypt");
const jwt = require('jsonwebtoken');    
const fs = require('fs/promises');
const path = require("path");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const gravatar = require("gravatar");
const jimp = require("jimp");

const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const {ctrlWrapper, HttpError } = require('../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const createHashPass = await bcryt.hash(password, 10);
    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({ ...req.body, avatarUrl, password: createHashPass });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }
    const passCompare = await bcryt.compare(password, user.password);
    if (!passCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, {token})

    res.status(200).json({
        token
    })
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription
    })
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "No content",
    })
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.status(200).json(result);
};

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUploud, originalname } = req.file;
    const fileName = `${_id}_${originalname} `;
    const result = path.join(avatarsDir, fileName);
    await fs.rename(tmpUploud, result);

    const avatar = await jimp.read(result);
    await avatar.resize(250, 250);
    await avatar.writeAsync(result);
    
    const avatarUrl = path.join('avatars', fileName); 
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.status(200).json({
        avatarUrl,
    });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
};