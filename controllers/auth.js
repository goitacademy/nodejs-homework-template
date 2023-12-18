const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) throw HttpError(409, 'Email in use');

    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({ ...req.body, password: hashPassword });

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

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};
// Оновлення підписки (subscription) користувача через ендпоінт PATCH /users. Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']
