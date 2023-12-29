const {User} = require ('../models/users.js');
const bcrypt = require('bcrypt');
const { HttpError, ctrlWrapper, sendEmail} = require("../helpers");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require ("jimp"); 
const { nanoid } = require('nanoid');



const {SECRET_KEY, BASE_URL} =process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password : hashPassword, avatarURL, verificationToken});
    const verifyEmail = {
        to : email, 
        subject : "Verify email",
        html : `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`

    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
          email: newUser.email,
          subscription: 'starter',
        },
      });
}

const verifyEmail = async(req, res)=>{
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        throw HttpError(404, 'User not found');
    }
    await User.findByIdAndUpdate(user._id, {verify : true, verificationToken : null});

    res.json({
        message: 'Verification successful',
      });
}

const resendVerifyEmail = async(req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError (404, 'Email not found');        
    }
    
    if(user.verify){
        throw HttpError(400, 'Verification has already been passed');    
    }

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
      };
    
      await sendEmail(verifyEmail);
    
      res.json({
        message: 'Verification email sent',
      });
}

const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }

    if(!user.verify){
        throw HttpError(401, "Email not verified");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    
    if(!passwordCompare){
        throw HttpError(401, 'Email or password is wrong');
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
    verifyEmail : ctrlWrapper(verifyEmail),
    resendVerifyEmail : ctrlWrapper(resendVerifyEmail),
    login : ctrlWrapper(login),
    getCurrent : ctrlWrapper(getCurrent),
    logout : ctrlWrapper(logout),
    updateAvatart : ctrlWrapper(updateAvatart)
}
