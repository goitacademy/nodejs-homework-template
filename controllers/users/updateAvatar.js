const {User} = require("../../model");
const path = require("path");
const fs = require('fs').promises;
const jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {path: tempUpload, originalname} = req.file;
    try {
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const file = await jimp.read(resultUpload);
        await file.resize(250, 250).write(resultUpload);
        const avatarURL = path.join("public", "avatars", originalname);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;
