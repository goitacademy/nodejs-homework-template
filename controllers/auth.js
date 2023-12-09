const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const path = require("path")
const Jimp = require('jimp');
const fs = require('fs');
const {nanoid} = require('nanoid')

const {User} = require("../models/user");

const {HttpError, ctrlWrapper, sendEmail} = require('../helpers');

const {SECRET_KEY, BASE_URL} = process.env

const avatarsDir = path.resolve("public", "avatars")


const register = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(user){
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid()

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken})

    const veryfyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,

    }

    await sendEmail(veryfyEmail)
    
    res.status(201).json({
        user: {
             email: newUser.email,
             subscription: newUser.subscription,
        }
    })
}

const verifyEmail = async(req, res) => {
    const {verificationToken} = req.params
    const user = await User.findOne({verificationToken})
    if(!user){
        throw HttpError(404, 'User not found')
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""})

    res.json({
        message: "Verification successful"
    })
}

const resendVerifyEmail = async(req, res) =>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw HttpError(400, "missing required field email")
    }

    if(user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }
 
    const veryfyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,

    }
    await sendEmail(veryfyEmail)

    res.json({
        "message": "Verification email sent"
    })
}

const login = async(req, res) =>{
    const {email, password} = req.body;
 
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }

if(!user.verify) {
    throw HttpError(401, "Email not verified")
}

    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    }
    
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})

    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
        user: {
            email,
            subscription: user.subscription,
       }
    })
}

const getCurrent = async(req, res) => {       
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ''})
    res.status(204).end()
}

const updateSubscription = async(req, res) => {
    try {
        const { _id: userId } = req.user;
        const { subscription } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            throw HttpError(404, 'User is not found');
        }

        const allowedSubscriptions = ['starter', 'pro', 'business'];

        if (!allowedSubscriptions.includes(subscription)) {
            throw HttpError(400, 'Invalid subscription value');
        }

        user.subscription = subscription;
        await user.save();

        res.json({
            email: user.email,
            subscription: user.subscription,
        });

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

const updateAvatar = async(req, res) => {
    const {_id} = req.user

    if (!req.file) {
        throw HttpError(400, 'No avatar file provided');
    }

    const {path: tempUpload, filename} = req.file;
    const resultUpload = path.join(avatarsDir, filename)

    const image = await Jimp.read(tempUpload); 
    await image.cover(250, 250).write(resultUpload);  

    fs.unlink(tempUpload, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
        }
    });
    const avatarURL = path.join("avatars", filename)
    await User.findByIdAndUpdate(_id, {avatarURL} )

    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}