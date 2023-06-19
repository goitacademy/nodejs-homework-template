const User = require('../models/user-schema.js')

const fs = require('fs/promises')
const path = require('path');
const avatarDir = path.resolve('public', "avatars")
 
const { HttpError } = require('../helpers/index.js');

const { cntrlWrapper } = require('../decorators/index.js');

const Joi = require('joi');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const gravatar = require('gravatar');
const Jimp = require("jimp");

const {SECRET_KEY} = require('../config.js')

const userRegisterSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(/^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.[a-zA-Z]{2,5}$/, 'this is not email').required(),
    subscription: Joi.string(),
})

const userLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(/^([a-zA-Z0-9_\-]+)@([a-zA-Z0-9_\-]+)\.[a-zA-Z]{2,5}$/, 'this is not email').required(),
})

const signUp = async(req, res) => {
    const { error } = userRegisterSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing required field`)
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user) {
        throw HttpError(409, `Email in use`)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarUrl = await gravatar.url(email)

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL: avatarUrl})
    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": newUser.subscription,
          }
    })
}

const login = async(req, res) => {
    const { error } = userLoginSchema.validate(req.body)
    if (error) {
        throw HttpError(400, `missing required field`)
    }

    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        throw HttpError(401, `Email or password is wrong`)
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, `Email or password is wrong`)
    }

    const { _id: id } = user;

    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findByIdAndUpdate(id, {token})

    res.json({
        "token": token,
        "user": {
            "email": user.email,
            "subscription": user.subscription
        }
    })
}

const getCurrent = async(req, res) => {
    const { subscription, email } = req.user

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ""})

    res.status(200).json({"message": "You logout"})
}

const avatars = async(req, res) => {
    const { _id, avatarURL} = req.user;
    const { path: oldImgPath, filename }= req.file;

    const newPath = path.join(avatarDir, filename)
    await fs.rename(oldImgPath, newPath)
    const avatar = path.join("public", "avatars", filename)

    const imgResize = await Jimp.read(avatar).then((img) => {
        img.resize(250, 250,).write(avatarURL)
        return img;
    }).catch(err=>{throw err})

    const image = await imgResize.getBufferAsync(Jimp.MIME_JPEG);
    console.log(image)

    fs.writeFile(avatar, image, (err)=>{
        if(err){
            console.error("nahuy")
            return;
        }
        console.log('ok')
    })

    const addAvatar = await User.findByIdAndUpdate(_id, {avatarURL: avatar}, req.body)
    res.status(200).json({avatarURL: addAvatar.avatarURL})
}

module.exports = {
    signup: cntrlWrapper(signUp),
    login: cntrlWrapper(login),
    getCurrent: cntrlWrapper(getCurrent),
    logout: cntrlWrapper(logout),
    avatars: cntrlWrapper(avatars)
}