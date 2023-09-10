const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const Jimp = require('jimp');
const asyncHandler = require('express-async-handler');

const avatarDir = path.join(__dirname, '..', '..', 'public', 'avatars');


const updateAvatar = asyncHandler(async (req, res) => {
   
    const { originalname, path: tempUpload } = req.file;
    
    const fileName = `${req.user._id}${originalname}`;


    const resultUpload = path.join(avatarDir, fileName);

    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload, (err, fileName) => {
        if (err) {
            throw err;
        }

        fileName.resize(250, 250).write(resultUpload);
    });


    const avatarURL = path.join('avatars', originalname);
    await User.findByIdAndUpdate(req.user._id, {
        avatarURL
    });
    res.json({ avatar: avatarURL })
    
});

module.exports = updateAvatar;