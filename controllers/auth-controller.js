import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";

import User from "../models/Users.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import { JWT_SECRET } from "../server.js";

const postersPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.profile_url(email, { protocol: 'https' });

    const newUser = await User.create({...req.body, avatarURL, password: hashPassword});

    res.json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
    })
}

const signin = async (req, res) => {
    console.log(1);
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    console.log(2);
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;
    const payload = {
        id
    };
    console.log(id);
    
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    const newUser = await User.findByIdAndUpdate(id, { token });
    console.log(newUser);
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

const avatarUpdate = async (req, res) => { 
    const { _id } = req.user;
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(postersPath, filename);

    await fs.rename(oldPath, newPath);

    const poster = path.join("public", "avatars", filename);

    const newsize = await Jimp.read(newPath);
    await newsize.resize(250, 250);
    console.log("new - ", newsize);

    const result = await User.findByIdAndUpdate({_id},{"avatarURL": poster}, {new: true});
    if (!result) {
        throw HttpError(404, `User with id=${contactId} not found`);
    }
    res.json(result);
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
    avatarUpdate: ctrlWrapper(avatarUpdate),
}