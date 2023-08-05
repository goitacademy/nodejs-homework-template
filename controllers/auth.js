const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const {User} = require("../models/user");

const {HttpError, ctrlWrapper} = require("../helpers");

const {SECRET_KEY} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars"); 

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword}, avatarUrl);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })

}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong"); 
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sigh(payload, SECRET_KEY, {expiresIn: "23h"});

    res.json({
        token,
    })
} 

const updateAvatar = async(req, res) => {
    const{_id} = req.user;
   const {path: tempUpload, originalname} = req.file;
   const filename = `${_id}_${originalname}`;
   const resultUpload = path.join(avatarsDir, filename);
   await fs.rename(tempUpload, resultUpload);
   const avatarURL = path.join("avatars", filename);
   await User.findByIdAndUpdate(_id, {avatarURL});

   res.json({
    avatarURL,
   })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    updateAvatar: ctrlWrapper(updateAvatar),
}