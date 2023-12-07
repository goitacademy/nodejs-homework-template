const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const gravatar = require("gravatar");
const { JWT_SECRET } = process.env;
const sendEmail = require("../error/sendEmail");
const crypto = require("node:crypto");

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
        return res.status(409).json({ error: "Email already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const verifyToken = crypto.randomUUID();

    await sendEmail({
        to: email,
        subject: "Welcome to Phonebook",
        html: `To confirm your registration please click on the link: <a href="http://localhost:3000/api/auth/verify/${verifyToken}">Click me</a>`,
        text: `To confirm your registration please open this link: http://localhost:3000/api/auth/verify/${verifyToken}`,
    });

    const newUser = await User.create({
        ...req.body,
        verifyToken,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
        },
    });
};

const verify = async(req, res, next) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ verifyToken: token }).exec();

        if (user === null) {
            return res.status(404).send({ message: "User not found" });
        }

        await User.findByIdAndUpdate(user._id, {
            verifyToken: null,
            verify: true,
        });
        res.status(200).send({ message: "Verification successful" });
    } catch (error) {
        next(error);
    }
};

const reVerification = async(req, res, next) => {
    const { email } = req.body;
    try {
        if (email === undefined) {
            res.status(400).send({ message: "Missing required field email" });
        }
        const user = await User.findOne({ email }).exec();
        if (user.verify === false) {
            const verifyToken = user.verifyToken;
            await sendEmail({
                to: email,
                subject: "Welcome to Phonebook",
                html: `To confirm your registration please click on the link: <a href="http://localhost:3000/api/auth/verify/${verifyToken}">Click me</a>`,
                text: `To confirm your registration please open this link: http://localhost:3000/api/auth/verify/${verifyToken}`,
            });
            res.status(200).send({ message: "Check your email" });
        }
        if (user.verify === true) {
            res.status(404).send({ message: "Verification has already been passed" });
        }
    } catch (error) {
        next(error);
    }
};

const login = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(401).json({ error: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Email or password is wrong" });
    }

    if (user.verify === false) {
        return res.status(401).send({ message: "Your account is not verified :(" });
    }

    const payload = {
        id: user._id,
        name: user.name,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1w" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subcription: user.subcription,
        },
    });
};

const logout = async(req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({ message: "Logout success" });
};

const current = async(req, res, next) => {
    const { email, subcription } = req.user;
    res.json({ email, subcription });
};
module.exports = { register, verify, reVerification, login, logout, current };