const HttpError = require("../helpers/HttpError");
const sendEmail = require("../helpers/sendEmail");
const createVerifyEmail = require("../helpers/createVerifyEmail");
const ctrlWrapper = require("../utils/ctrlWrapper");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY, BASE_URL } = process.env;
const path = require("path");
const fs = require("fs/promises");
const resizeAvatar = require("../utils/resizeAvatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email, { protocol: "https" });
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = createVerifyEmail(verificationToken, email);
    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
        },
    });
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true });
    res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(400);
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = createVerifyEmail(user.verificationToken, email);
    await sendEmail(verifyEmail);
    res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const getCurrent = (req, res) => {
    const { name, email } = req.user;
    res.json({
        name,
        email,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
};

const updateSubcription = async (req, res) => {
    const { _id, subscription } = req.user;
    const { subscription: newSubscription } = req.body;
    if (subscription === newSubscription) {
        throw HttpError(400, "User already has this subscription");
    }

    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(result);
};

const avatarsDir = path.resolve("public", "avatar");

const updateAvatar = async (req, res) => {
    if (!req.file) {
        throw HttpError(404, "File is required");
    }
    const { path: temporaryPath, filename } = req.file;
    const { _id } = req.user;
    //Изменяет размер картинки
    await resizeAvatar(temporaryPath);
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(temporaryPath, newPath);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
};

module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubcription: ctrlWrapper(updateSubcription),
    updateAvatar: ctrlWrapper(updateAvatar),
};
