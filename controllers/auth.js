const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models/users');
const { asyncMiddleware } = require('../middlewars');
const { httpError } = require('../helpers');
const { SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw httpError(409, 'User with this email already exists')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription }
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw httpError(401, 'Email or password is invalid');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw httpError(401, 'Email or password is invalid');
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: { email: user.email, subscription: user.subscription }
    })
};

const logoutUser = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
};
    
const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
    const {
        user: { _id },
        body,
    } = req;
    const { email, subscription } = await User.findByIdAndUpdate(_id, body, {new: true});

    res.json({ email, subscription });
};


module.exports = {
    register: asyncMiddleware(registerUser),
    login: asyncMiddleware(loginUser),
    logout: asyncMiddleware(logoutUser),
    getCurrent: asyncMiddleware(getCurrentUser),
    updateSubscription: asyncMiddleware(updateSubscription),
}