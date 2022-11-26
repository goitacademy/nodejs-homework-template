
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(409).json({ "message": 'Email in use' });
    }

    try {
        const user = new User({ email, password });
        await user.save();
        return res.status(201).json({
            user: {
                email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!user || !passwordCheck) {
        return res.status(401).json({ "message": 'Email or password is wrong' });
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '15m' });
    user.token = token
    await User.findByIdAndUpdate(user._id, user)
    return res.status(200).json({
        token,
        user: {
            email,
            subscription: user.subscription,
        },
    });
};

const logout = async (req, res, next) => {
    const { user } = req;
    if (!user) {
        return res.status(401).json({ "message": 'Not authorized' });
    }
    user.token = null;
    await User.findByIdAndUpdate(user._id, user, { new: true });

    return res.status(204).json({ "message": 'No Content' });
};

const currentUser = async (req, res, next) => {
    const { user } = req;
    const currentUser = await User.findOne({ token: user.token });

    return res.status(200).json({
        user: {
            email: currentUser.email,
            subscription: currentUser.subscription,
        },
    });
};

const updateSubscription = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    const updatedUsersSubscription = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );

    return res.status(200).json({
        user: {
            email: updatedUsersSubscription.email,
            subscription: updatedUsersSubscription.subscription,
        }
    },);
};

module.exports = {
    register,
    login,
    logout,
    currentUser,
    updateSubscription,
};
