require('dotenv').config();
const { User } = require('../models/user');
const bcryt = require("bcrypt");
const jwt = require('jsonwebtoken');


const { SECRET_KEY } = process.env;

const {ctrlWrapper, HttpError } = require('../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const createHashPass = await bcryt.hash(password, 10)

    const newUser = await User.create({ ...req.body, password: createHashPass });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401,"Email or password is wrong")
    }
    const passCompare = await bcryt.compare(password, user.password);
    if (!passCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
    id: user._id,
    };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        console.log(id)
    } catch (error) {
        console.log(error.message)
        };

    res.status(200).json({
        token,
        user: {
        email: user.email,
        subscription: user.subscription,
        }
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}