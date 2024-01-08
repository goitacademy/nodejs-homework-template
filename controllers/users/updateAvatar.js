const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../models');

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {_id} = req.user;
    if(!req.file) {
        res.status(400).json("File upload error");
    }

    const { path: tempUpload, oriqinalname } = req.file;
    const extension = oriqinalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const userAvatar = await Jimp.read(resultUpload);
    userAvatar.resize(250, 250).write(resultUpload);

    const avatarURL = path.join(`http://localhost:5000/avatars`, filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.join({
        status: "success",
        code: 200,
        data: {avatarURL},
    });
};

module.exports = updateAvatar;