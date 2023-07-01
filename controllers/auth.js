const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises');
const path = require('path');
const Jimp=require('jimp')
const User = require('../models/users')
const {SECRET_KEY} = process.env;

const contactsDir = path.join(__dirname, "../", "public", "avatars");

const register = async(req, res, next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({ message: "Email in use" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = await gravatar.url(email);
        const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    
        res.status(201).json({
            user: {
                email:newUser.email, 
                subscription:newUser.subscription,
                avatarURL,
              }
           
        })
    }
    catch(error){
        next(error);
    }

}

const login = async(req, res, next) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
}
const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
    return res.status(401).json({ message: "Email or password is wrong" });
}
const {_id:id, subscription} = user;
const payload = {
    id
}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
await User.findByIdAndUpdate(id, {token});
res.json({
    token,
    user: {
        email, 
        subscription,
      }
})
}

const getCurrent = async(req, res) =>{
const {email, subscription}=req.user;
 
res.json({
    email, 
    subscription,
})
}

const updateAvatar = async(req,res) => {
    const { id} = req.user;
    const { path: oldPath, filename} = req.file;
    const avatarName = `${id}_${filename}`;
    const newPath = path.join(contactsDir, avatarName);
    await Jimp.read(newPath).then(img=> {
        return img.resize(250, Jimp.AUTO).writeAsync(newPath);
    })
    .catch(err=>console.log(err));
    
    await fs.rename(oldPath, newPath);
   const avatarURL = path.join("avatars", avatarName)

    await User.findByIdAndUpdate(id, {avatarURL})
    res.status(201).json({avatarURL});
  }

const logOut = async(req,res)=>{
const {_id} = req.user;
await User.findByIdAndUpdate(_id, {token: ""});

res.status(204).json({ message: "No Content" });
}
module.exports={
    register,
    login,
    getCurrent,
    logOut,
    updateAvatar,
}