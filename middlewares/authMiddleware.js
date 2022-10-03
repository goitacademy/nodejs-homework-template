const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userSchema');

const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) throw createError(401, 'Not authorized: token not exist');
    const [tokenType, token] = req.headers.authorization.split(' ');
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) throw createError(401, 'Not authorized: user not identificated');
    const currentUser = await User.findById({ _id: user._id });
    if (!currentUser) throw createError(401, 'Not authorized: user not found');
    const {token: userToken} = await User.findById({ _id: user._id });
    if (userToken !== token) throw createError(401, 'Not authorized: token invalid');
    req.token = token;
    req.tokenType = tokenType;
    req.user = user;
    next();
}

module.exports = {
    authMiddleware
}