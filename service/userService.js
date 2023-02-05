const User = require('./schemas/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async ({email, password}) => {
    const newUser = new User({ email, password });
    newUser.setPassword(password);
    await newUser.save();
    return newUser;
}

const loginUser = async (user) => {
    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'});

     await User.findOneAndUpdate(
        { _id: user.id },
        {'token': token},
        { new: true }
        )
    return token;
}

const logoutUser = async (userId) => {
    const user = await User.findByIdAndUpdate(userId, {token: null})
    return user;
}

const updateUserSubscription = async( _id, sub) => {
    const subscriptionUpdated = await User.findOneAndUpdate(
        { _id: _id }, { subscription: sub }, { new: true });

    return subscriptionUpdated;
}

module.exports = {
    createUser,
    loginUser, 
    logoutUser,
    updateUserSubscription,
}