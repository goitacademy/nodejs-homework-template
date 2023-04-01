const {User} = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id: id} = req.user;
    const imageName = `${id}_${originalname}`;
    try {

        const resultUpload = path.join(avatarDir, imageName);
        const img = await jimp.read(tempUpload);
        await img
            .autocrop()
            .cover(
                250,
                250,
                Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP
            )
            .writeAsync(tempUpload);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars",imageName );
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

module.exports = updateAvatar;