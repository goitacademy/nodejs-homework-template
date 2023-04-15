
const path = require('path');
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require('../../service/users/userSchema');


// const tempDir = path.resolve('./tmp');
const avatarsDir= path.join(__dirname, "../../", "public","avatars")

const updateImgAvatar = async (path) => {
  const avatar = await Jimp.read(path);
  avatar.resize(250, 250);
  await avatar.writeAsync(path);
};


const uploadAvatarController = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", filename);
    updateImgAvatar(avatarURL);

    const publicUrl = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL: publicUrl});

    
    res.json({
        publicUrl,
    });
}



module.exports = {
    uploadAvatarController
}