const {User} = require ('../models/users.js');
const bcrypt = require('bcrypt');
const { HttpError, ctrlWrapper } = require("../helpers");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require ("jimp")

const {SECRET_KEY} =process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password : hashPassword, avatarURL});

    res.status(201).json({
        user: {
          email: newUser.email,
          subscription: 'starter',
        },
      });
}

const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong");
    }
     const payload = {
         id : user._id,
     }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn : "23h"});

    await User.findByIdAndUpdate(user._id, {token});    
     
    res.json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
}

const getCurrent = async (req, res)=>{
    const {email, subscription} = req.user;
    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res)=>{
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token : ""});

    res.status(204).json();
}

const updateAvatart = async (req, res)=>{
    const {_id} = req.user;
    const {path : tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);    
    await fs.rename(tempUpload, resultUpload);

    const image = await Jimp.read(resultUpload);
    image.resize(250, 250).write(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    });
}

module.exports = {
    register : ctrlWrapper(register),
    login : ctrlWrapper(login),
    getCurrent : ctrlWrapper(getCurrent),
    logout : ctrlWrapper(logout),
    updateAvatart : ctrlWrapper(updateAvatart)
}
