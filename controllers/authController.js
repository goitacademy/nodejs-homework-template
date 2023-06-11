const {User} = require("../models/users");
const ctrlWrapper = require("../utils/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require ("fs/promises");

const {SECRET_KEY} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars")


const register = async(req, res)=>{
const {email, password} = req.body;    
const user = await User.findOne({email});
if(user){
    throw new HttpError(409,"Email in use");
}
const hashPassword = await bcrypt.hash(password,10);
const avatarURL = gravatar.url.apply(email);
const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
res.status(201).json({
    user:{
      email:newUser.email,
    subscription: "starter"  
    }
  })
}

const login = async(req,res) =>{
 const {email, password} = req.body;
 const user = await User.findOne({email});
 if(!user){
    throw new HttpError(401,"Email or password invalid");
 }
 const passwordCompare = await bcrypt.compare(password,user.password);
 if(!passwordCompare){
    throw new HttpError(401,"Email or password invalid");
 }
const payload = {
    id: user._id,
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
await User.findByIdAndUpdate(user._id, { token});
res.json({
    token,
    user: {
        email: user.email,
        subscription: user.subscription,
    }
})

}

const getCurrent = async(req, res)=>{
    const {email, subscription } = req.user;
    res.json({
        email,
        subscription ,
    })
}
const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "logout success"
    })
}

const updateAvatar = async(req, res) =>{
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.files;
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
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    
}