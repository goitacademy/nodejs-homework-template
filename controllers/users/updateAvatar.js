const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
    
    const { path: tmpUpload, originalname } = req.file;
    const image = await Jimp.read(tmpUpload);
    image.resize(250, 250).write(tmpUpload);
    const { _id: id } = req.user;
    const avatarName = `${id}_${originalname}`;
    try { 
        const resultUpload = path.join(avatarsDir, avatarName);
        
        await fs.rename(tmpUpload, resultUpload)
        const avatarURL = path.join('public', 'avatars', originalname);
        
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.status(200).json({avatarURL})
    } catch (error) {
        await fs.unlink(tmpUpload);
        throw error;
    }
}

module.exports = updateAvatar;