import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/HttpError.js";
dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email } );
    if (user) {
        throw HttpError(409, "Email in use")
    }
const hashPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({...req.body, password:hashPassword});
     res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401,"Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    const { _id: id } = user;
    const payload = {
        id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token})
    res.json({
           token,
         user: { user: user.email, subscription: user.subscription },
     
    })
}

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};


const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id, { token: "" })
     res.status(204).json();
}

export default {
    signup: ctrlWrapper(register),
    signin: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
}