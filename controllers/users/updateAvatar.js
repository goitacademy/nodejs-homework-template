const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');
const exp = require('constants');
const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    if(!req.file) {
        res.status(400).json("File upload error");
    }

    const { path: tempUpload, oriqinalname } = req.file;
    const filename = `${_id}_${oriqinalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const userAvatar = await Jimp.read(resultUpload);
    userAvatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.join({
        avatarURL,
    });
};

module.exports = updateAvatar;