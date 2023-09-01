import User from "../models/user.js";
import { HttpError, controllerWrapper } from "../helpers/index.js";
import bcryptjs from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res ) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, 'email already in use')
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json({ name: newUser.name, email: newUser.email, subscription: newUser.subscription });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'Email or password invalid');
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password invalid')
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
    });
};

const getCurrent = async (req, res) => { 
    const { email, name } = req.user;

    res.json({email, name});
}

const logout = async (req, res) => { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.json({ message: 'logged out' });
}

export default {
    createUser: controllerWrapper(createUser),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
};