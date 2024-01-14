import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import { JWT_SECRET } from "../server.js";

const signup = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const signin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    const {_id: id} = user;
    const payload = {
        id
    };
    console.log(JWT_SECRET);
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, {token});
    res.json({
        token,
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Signout success"
    })
}

const subscriptionUpdate = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate({_id}, req.body, {new: true});
    if (!result) {
         throw HttpError(404, `User with id=${contactId} not found`);
    }

    res.json(result);
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
}