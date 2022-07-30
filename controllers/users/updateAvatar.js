const {User} = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async(req, res) => {
    const {path: tempUpload, originalname} = req.file;
    try {
        Jimp.read(originalname)
        .then(img => {
            return img.resize(250, 250)
            .write(originalname)
        })
        .catch(error => {
            console.error(error)
        });
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl =  path.join("public", "avatars", originalname);
        await User.findByIdAndUpdate(req.user._id, {avatarUrl});
        res.json({avatarUrl})
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;