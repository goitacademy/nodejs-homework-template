const path = require('path');
const fs = require('fs/promises');
const { User } = require('../models/schemas/user');
const Jimp = require('jimp');
const { NotFound } = require("http-errors");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const get = async (req, res, next) => {
    try {
        const user = req.user;
         res.status(201).json({
      status: 'success',
      code: 201,
      data: {
          user: {
              email: user.email,
             subscription: user.subscription
          }
      },
    });
    } catch (e) {
        next(e);
    }
}

const changeAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    try {
        
        const { _id: id } = req.user;
        const imageName = `${id}_${originalname}`;
        const result = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, result);
        const avatarURL = path.join("public", "avatars", imageName);
        Jimp.read(avatarURL, (err, avatar) => {
            if (err) throw err;
           avatar.resize(250, 250).write(avatarURL); 
         });
    
        await User.findByIdAndUpdate(req.user._id, { avatarURL });

        res.json({avatarURL});
    } catch (e) {
        await fs.unlink(tempUpload);
        throw e;
    
    }
}

const verifyEmail = async(req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if(!user){
        throw NotFound();
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

    res.json({
        status: 'success',
        code: 200,
        data: {
            message: "Verification successful",
        }
    });
}




module.exports = {
    get, changeAvatar, verifyEmail
}