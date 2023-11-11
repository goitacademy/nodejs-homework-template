const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
    const savedUser = await User.create({
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        user: {
            email,
            subscription: savedUser.subscription,
            id: savedUser._id,
        },
    });
    } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
        throw Conflict("User with this email already exists!");
    }
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;

    const storedUser = await User.findOne({
        email,
    });

    if (!storedUser) {
    throw Unauthorized("Email is note valid");
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!isPasswordValid) {
    throw Unauthorized("Email or password is wrong");
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

    await User.findByIdAndUpdate(storedUser._id, { token });

    return res.status(200).json({
    token: token,
    user: {
        email,
        subscription: storedUser.subscription,
        id: storedUser._id,
    },
    });
}

async function logout(req, res, next) {
    const storedUser = req.user;

    await User.findByIdAndUpdate(storedUser._id, { token: "" });

    return res.status(204).end();
}

async function userInfo(req, res, next) {
    const { user } = req;
    const { email, subscription } = user;

    return res.status(200).json({
    user: {
        email,
        subscription,
    },
    });
}

async function upSubscription(req, res, next) {
    const { id } = req.user;
    console.log("id", id);

    const { subscription } = req.body;
    console.log("subscription", subscription);

    const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(upUser);
}

module.exports = {
    register,
    login,
    logout,
    userInfo,
    upSubscription,
};