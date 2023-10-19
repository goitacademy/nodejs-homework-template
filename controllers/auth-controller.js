import bcrypt from "bcryptjs";
import User from "../models/user.js";
import httpError from "../helpers/httpError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs/promises"
import gravatar from "gravatar"
import Jimp from "jimp"
import path from "path";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars")

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw httpError(409, `Email in use`)
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarUrl});
    console.log(newUser)
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw httpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw httpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
}

const signout = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { token: "" })
    
    res.json({
        message: "No Content",
    })
}

const updateSubscriotion = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body);
      if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result);
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename)

   await Jimp.read(oldPath)
  .then((image) => {
    image.resize(250, 250),
        image.writeAsync(`${oldPath}`)
     })
    .catch((err) => {
      new Error;
    });
    await fs.rename(oldPath, newPath);
    
    const avatar = path.join("public", "avatars", filename)
    const result = await User.findByIdAndUpdate(_id, { avatarUrl: avatar })
    res.status(201).json(result)
}
 
export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateSubscriotion: ctrlWrapper(updateSubscriotion),
    updateAvatar: ctrlWrapper(updateAvatar)
}