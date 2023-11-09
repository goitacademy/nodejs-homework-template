import ModelUser from "../models/Model-user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { httpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const singup = async (req, res, next) => {
    const { email, password, subscription = "starter" } = req.body;
    const user = await ModelUser.findOne({ email });

    if (user) {
        throw httpError(409, `${email} in use`)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await ModelUser.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        user: {
            email,
            subscription,
        }
    })
}
const singin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await ModelUser.findOne({ email });
    if (!user) {
        throw httpError(401, 'Email or password is wrong')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw httpError(401, 'Email or password is wrong')
    }
    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '48h' });
    await ModelUser.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        'user': {
            email: user.email,
            subscription: user.subscription
        }
    })
}

const logout = async (req, res, next) => {
    const { _id } = req.user;
    await ModelUser.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        message: "Signout success"
    })
}

const current = async (req, res, next) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
}

export default {
    singup: ctrlWrapper(singup),
    singin: ctrlWrapper(singin),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current)
}