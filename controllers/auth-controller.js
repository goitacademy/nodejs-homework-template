import fs from "fs/promises";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";

import User, { userUpdateSubscriptionSchema, userSignupSchema, userSigninSchema } from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";


const { JWT_SECRET } = process.env;
const avatarsPath = path.resolve("public", "avatars");

const signUp = async (req, res) => {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: '404' });
    
    const { error } = userSignupSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    const { error } = userSigninSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    const { _id: id } = user;
    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
    const newUser = await User.findByIdAndUpdate(id, {token})

    res.json({
        token,
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    });
};

const signOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();
};

const updateSubs = async (req, res) => {
    const { error } = userUpdateSubscriptionSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    };

    const { _id } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, { subscription });

    res.json({
        message: "Subscription updated"
    });
};

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    
    await Jimp.read(oldPath)
    .then(img => {
        img
        .resize(250, 250)
                .quality(60);
                return img.writeAsync(oldPath);
        })
        .catch(error => {
            console.log(error);
        });
        
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL
    });
};


export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    getCurrent: ctrlWrapper(getCurrent),
    signOut: ctrlWrapper(signOut),
    updateSubs: ctrlWrapper(updateSubs),
    updateAvatar: ctrlWrapper(updateAvatar),
};