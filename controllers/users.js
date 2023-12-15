const {User} = require('../models/user');
const HttpError = require('../helpers/HttpError');
const {ctrlWrapper} = require('../helpers/ctrWrapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
require('dotenv').config();

const {SECRET_KEY} = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email);
    const newUser = await User.create({...req.body, password:hashPassword, avatarURL});
    res.status(201).json(
     {
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
     });
}

const login = async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email});
   if(!user){
       throw HttpError(401, "Email or password is wrong");
}
const passwordCompare = await bcrypt.compare(password, user.password);
  
if(!passwordCompare){
    throw HttpError (401, "Email or password is wrong");
}

const payload = {
    id: user._id,
}
const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
await User.findByIdAndUpdate(user._id, {token});
res.json({
        token,
        user: {
          email:user.email,
          subscription:user.subscription
        }
})
}

const getCurrent = async (req, res, next) => {
        const user = req.user;
        const {token}  = req.params;
        if (user.token !== token) {
            throw HttpError(401, "Not authorized");
        }

        res.json({
            email: user.email,
            subscription: user.subscription
        })
   
}

const logout = async (req, res) => {
    const{id} = req.user;
   await User.findByIdAndUpdate(id, {token:" "});
     
    res.status(204).json(
        {message: 'Logout success'}
    )
}

const subscription = async (req, res) => {
    const{id} = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
     throw HttpError(400);
    }
    res.json(result);
}

const updateAvatar = async (req, res) => {
    const {path:tempUpload, originalname} = req.file;
    const {_id} = req.user;

    const resizeAvatar = await jimp.read(tempUpload);
    resizeAvatar
    .resize(250, 250, jimp.RESIZE_BEZIER)
    .write(tempUpload);

    const filename = `${_id}_${originalname}`;
    const restltUpload = path.join(avatarsDir, filename);
    await fs.rename (tempUpload, restltUpload);
    const avatarURL = path.join('avatars', filename);
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
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}