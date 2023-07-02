const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises');
const path = require('path');
const Jimp=require('jimp')
const {nanoid} =require('nanoid')
const verificationToken = nanoid();
const {sendEmail} = require('../helpers')
const User = require('../models/users')
const {SECRET_KEY, BASE_URL} = process.env;

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
        const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});
    
        const verifyEmail = {
            to: email,
            subject: "Verify token email",
            html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to verify email</a>`
        }
        await sendEmail(verifyEmail);

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
        console.log(error);
    }

}

const verify = async (req,res) =>{
const {verificationToken} = req.params;
const user = await User.findOne({verificationToken})
if(!user){
    return res.status(404).json({ message: "User not found" });
}
await User.findByIdAndUpdate(user._id,{verify:true, verificationToken:null})

res.json({
    message:"Verification successful"
})
}


const resendVerify = async(req, res) =>{
    const {email} = req.body;
   
    const user = await User.findOne({email});
    const token = user.verificationToken;
    console.log(token);
    if(!user) {
        return res.status(400).json({ message: "missing required field email" });
    }
    if(user.verify) {
        return res.status(400).json({ message: "Verification has already been passed" });
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${token}">Click to verify email</a>`
    }
    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email send success"
    })
  
}

const login = async(req, res, next) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
}
if(!user.verify){
    return res.status(401).json({ message: "User not verify" });
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

   try{
    const newPath = path.join(contactsDir, avatarName);
    const image = await Jimp.read(`./tmp/${filename}`);
    await image.resize(250, 250);
    await image.writeAsync(`./tmp/${filename}`);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join('public', 'avatars', avatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL })
    res.status(201).json({avatarURL});
  } catch (error) {
    await fs.unlink(oldPath);
    console.log(error);
  }
}

const logOut = async(req,res)=>{
const {_id} = req.user;
await User.findByIdAndUpdate(_id, {token: ""});

res.status(204).json({ message: "No Content" });
}
module.exports={
    register,
    verify,
    resendVerify,
    login,
    getCurrent,
    logOut,
    updateAvatar,
}