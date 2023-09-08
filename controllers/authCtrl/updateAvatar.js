const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');

const avatarDir = path.join(__dirname, '..', '..', 'public', 'avatars');


const updateAvatar = async (req, res, next) => {
   
    const { originalname, path: tempUpload} = req.file;
    
   const fileName = `${req.user._id}${originalname}`;

    const resultUpload = path.join(avatarDir, fileName);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', originalname);
    await User.findByIdAndUpdate(req.user._id, {
        avatarURL
    });
    res.json({avatar:avatarURL})
    
};

module.exports = updateAvatar;