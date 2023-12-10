import fs from "fs/promises";
import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";

const avatarsPath = path.resolve("public", "avatars");

dotenv.config();
 

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "This email is already exists");
    }
    
    const url = gravatar.url(email)
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL: url });   

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: url, 
        }
    })
};
 

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
};


const avatars = async (req, res) => {
    const { _id, avatarURL } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

       Jimp.read(newPath)
        .then((image) => {
            image.resize(250, 250);
            image.write(newPath);
            console.log("successful")
        })
        .catch((err) => {
            console.log(err)
            HttpError(400, "Oops, something went wrong")
        });

    const result = await User.findByIdAndUpdate(_id, {avatarURL: avatar })
     if (!result) {
            throw HttpError(401, `Not authorized`);
        }
        res.status(200).json({
            avatarURL: avatar,
    })
};


const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
};

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({
        //message:"Signout success"
    })
}


export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    avatars: ctrlWrapper(avatars),
};