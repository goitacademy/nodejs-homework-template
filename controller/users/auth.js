const bcrypt = require('bcryptjs');
const fs = require("fs/promises");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require("path");
const { SECRET_KEY } = process.env;
const Jimp = require("jimp");

const { User } = require('../../models');

const { HttpError, ctrlWrapper } = require("../../helper");

const avatarDir = path.join(__dirname, '../', '../', 'public', 'avatars');

const register = async (req, res) => {
const {email, password} = req.body;
const user = await User.findOne({email});

if(user){
    throw HttpError(409, "Email already in use");
}

const hashPassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);
const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

 res.status(201).json({
    email: newUser.email,
    name: newUser.name,
 })
} 

const login = async (req, res) => {

const { email, password } = req.body;

const user = await User.findOne({ email });

if(!user){
    throw HttpError(401, "Email or password invalid");
}

const passwordCompare = await bcrypt.compare(password, user.password);

if(!passwordCompare){
    throw HttpError(401, "Email or password invalid");
}

const payload = {
    id: user._id,
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
await User.findByIdAndUpdate(user.id, {token});

res.json({
    token,
})

}

const getCurrent = async(req,res)=>{
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
        })
}

const logout = async(req,res)=>{
 const {_id} = req.user;
 await User.findByIdAndUpdate(_id, {token: ""});

 res.json({
    mesaage: "Logout success"
 })
}

const updateAvatar = async(req, res) =>{
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    // await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
   
    const image = (await Jimp.read(tempUpload)).resize(250, 250);

    await image.writeAsync(resultUpload);
    await fs.unlink(tempUpload);

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




