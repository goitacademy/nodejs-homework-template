const User = require('../../models/user.js');
const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const storeImage = path.join(process.cwd(), 'public/avatars');

const updateAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    const avatarURL = path.join(storeImage, imageName);
    try {
        const image = await Jimp.read(tempUpload);
        image.resize(150, 150);
        await image.writeAsync(avatarURL);
        await fs.unlink(tempUpload);
        await User.findByIdAndUpdate(id, { avatarURL });
        return res.status(200).json({ message: "succes", avatarURL });
    } catch (err) {
        await fs.unlink(tempUpload);
        return next(err);
    }
};

module.exports = updateAvatar;