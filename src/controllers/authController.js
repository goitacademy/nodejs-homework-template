const { User } = require('../models');
const { RequestError } = require('../utils');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;


const registerController = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }
    const user = await User.findOne({ email });
        
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash("password", 10);

    const newUser = await User.create({ email, password: hashPassword, subscription });

    res.status(201).json({user: {email, subscription: newUser.subscription}});
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
        throw RequestError(400, "missing require fields")
    }

    const user = await User.findOne({ email });
        
    if (!user) {
        throw RequestError(401, "Email or password is wrong");
    }

    const checkedpassword = bcrypt.compare(password, user.password);

    if (!checkedpassword) {
        throw RequestError(401, "Email or password is wrong");
    }

    // create token

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, {token})

    res.status(200).json({ token, user: {email, subscription: user.subscription }});
};

const currentUserController = async (req, res, next) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
}

const logoutUserController = async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null }) 
    res.status(204).json()
}

module.exports = {registerController, loginController, currentUserController, logoutUserController};