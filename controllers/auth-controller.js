import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import "dotenv/config"

import {User} from "../models/User.js";
import {HttpError} from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res
        .status(201)
        .json({ email: newUser.email, subscription: newUser.subscription })
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcryptjs.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user: { email: user.email, subscription: user.subscription },
    });
};

export const signout = async (req, res, next) => {
    const user = req.user;
    const result = await User.findByIdAndUpdate(_id, { token: "" });
    if (!result) {
        return next(HttpError(401, "Not authorized"))
    }
    res.status(204)
};

export const current = async (req, res, next) => {
    const user = req.user;
    res.status(200).json(
        {
            email: user.email,
            subscription: user.subscription
        });
} 

export const updateSubscription = async (req, res, next) => {
    const subscription = req.body.subscription;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );
    res
        .status(200)
        .json({ email: result.email, subscription: result.subscription });
};