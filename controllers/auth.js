
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapeer.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

const { SECRET_KEY } = process.env;
const avatarDir = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email alredy in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        subscription: newUser.subscription,
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: { email: user.email, subscription: user.subscription },
    });
};

const getCurrent = async (req, res) => {
    const { email, name, subscription } = req.user;
    res.json({
        email,
        name,
        subscription,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: "Logout success",
    });
};

const patchUpdateSubscription = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, {
        subscription: req.body.subscription,
    });
    res.json(result);
};

const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { path: tmpUpload, originalname } = req.file;
        const fileName = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarDir, fileName);
        await fs.rename(tmpUpload, resultUpload);

        const avatarURL = path.join("avatars", fileName);

        Jimp.read(resultUpload, (err, lenna) => {
            if (err) throw err.message;
            lenna.resize(250, 250).write(resultUpload);
        });

        await User.findByIdAndUpdate(_id, { avatarURL });

        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
};

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    patchUpdateSubscription: ctrlWrapper(patchUpdateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};