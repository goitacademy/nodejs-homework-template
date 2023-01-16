const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');   


const {User} = require("../models/user")

const { HttpError, ctrlWrapper } = require("../helpers")

const {SECRET_KEY} = process.env;

const register = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);
    
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatarURL,
    })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid"); // "Email invalid"
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid"); // "Password invalid"
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token, 
        email: user.email,
    })
}

const getCurrent = async(req, res)=> {
    const user = req.user;

    res.json({
        user,
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    const { path: tempUpload, filename } = req.file;   
    
     Jimp.read(tempUpload, (err, lenna) => {
  if (err) throw err;
  lenna
      .resize(250, 250) // resize
      .write(tempUpload)
   });

    
    const newFileName = `${_id}_${filename}`;
    const resultUpload = path.join(avatarsDir, newFileName);

    
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", newFileName);
    
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.status(200).json({
         avatarURL
    })
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}