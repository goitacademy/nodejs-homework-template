const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');


const registerUser = catchAsync(async (req, res) => {
 
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({"message": "Email in use"})
    }

    const avatarURL = gravatar.url(email);

    const result = await User.create({ email, password, avatarURL });

    
    res.status(201).json({
        user: result
    });
 
});


const loginUser = catchAsync(async (req, res) => {
 
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    const match = await bcrypt.compare(password, user.password);    
        
    if (!user || !match) {
        return res.status(401).json({"message": "Email or password is wrong"})
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

   
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user
    });
 
});


const currentUser = catchAsync(async (req, res) => {
 
    const { email, subscription } = req.user;

    res.status(200).json({        
        user:{email, subscription}
    });
 
});


const logoutUser = catchAsync(async (req, res) => {
 
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
 
});


const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {

    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    
    try {      

        const resultUpload = path.join(avatarDir, imageName);

        await jimp.read(tempUpload).then((img) => {
            return img.resize(250, 250).write(resultUpload);
        });


        const avatarURL = path.join("public", "avatars", imageName);

        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        res.status(200).json({avatarURL});

    } catch (error) {
        
        await fs.unlink(tempUpload);
        throw error;
 }
   
 
};

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser,
    updateAvatar
}