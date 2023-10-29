const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const { User } = require('../models/User.js')
const HttpError = require("../helpers/HttpError.js");
const ctrlWrapper = require('../decorators/ctrlWrapper.js');
const sendEmail = require('../helpers/sendEmail.js');
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, `${email} already in use`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404)
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null})

    res.json({
        message: "Verify success",
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        throw HttpError(401, `Email or password is wrong`);
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verify")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, `Email or password is wrong`);
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).send();
}

module.exports = {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
}