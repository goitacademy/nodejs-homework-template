const { HttpError, ctrlrWrapper } = require('../helpers');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user) throw HttpError(409, 'Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashedPassword});

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

module.exports = {
    register: ctrlrWrapper(register),
    login: ctrlrWrapper(login),
    getCurrent: ctrlrWrapper(getCurrent),
    logout: ctrlrWrapper(logout),
    updateById: ctrlrWrapper(updateById)
}