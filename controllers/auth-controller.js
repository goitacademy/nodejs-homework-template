import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/user.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const {JWT_SECRET} = process.env;

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        user:{
            email: newUser.email,
            subscription: "starter",
        }
        })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token: token,
        user:{
            email: email,
            subscription: "starter",
        }
    })
}

const getCurrent = (req, res)=> {
    const {name, email} = req.user;

    res.json({
        name,
        email,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});
    
    res.status(204);
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}