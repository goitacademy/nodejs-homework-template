const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const gravatar = require('gravatar');
const User = require('../models/userSchema');


const registration = async (email, password, subscription) => {
    const user = await User.findOne({ email });
    if (user) throw createError(409, `Email in use`);
    const avatarURL = gravatar.url(email, {protocol: 'https', s: '100', d: 'mp'});
    await User.create({ email, password, avatarURL, subscription });
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw createError(401, `Email is wrong`);
    if (!await bcrypt.compare(password, user.password))
        throw createError(401, `Password is wrong`);
    const token = jwt.sign({
        _id: user._id, 
    }, process.env.JWT_SECRET);
    await User.findOneAndUpdate({ email }, { token: token })
    return { token, subscription: user.subscription } ;
}

const currentUser = async (userId) => {
    return await User.findOne({ _id: userId });
}

const logout = async (userId) => {
    await User.findOneAndUpdate({ _id: userId }, { token: null })
}

const setUserAvatar = async (userId, avatar) => {
    await User.findOneAndUpdate({ _id: userId }, { avatarURL: avatar });
}

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  setUserAvatar,
}
