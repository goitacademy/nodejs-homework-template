const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const  User  = require('../models/userSchema');

const registration = async (email, password, subscription) => {
    const user = await User.findOne({ email });
    if (user) throw createError(409, `Email in use`);
    await User.create({ email, password, subscription });
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

module.exports = {
  registration,
  login,
  currentUser,
  logout
}
