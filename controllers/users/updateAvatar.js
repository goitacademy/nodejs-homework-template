const {User} = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const {Unauthorized} = require("http-errors");
const Jimp = require('jimp');

const avatarsDirectory = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res)=> {
    const {path: tempDir, originalname} = req.file;
    const {_id: id} = req.user;
    const imageName =  `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDirectory, imageName);
        await Jimp.read(tempDir).then(avatar => avatar.resize(250,250).write(tempDir));
        await fs.rename(tempDir, resultUpload);
        const avatarURL = path.join("avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});

        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw new Unauthorized("Not authorized");
    }
};

module.exports = updateAvatar;
