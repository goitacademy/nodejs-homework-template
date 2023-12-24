const fs = require("fs/promises");
const path = require("path");

const { ctrlWrapper } = require("../helpers");

const User = require("../models/user");

// path to avatars dir
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const updateAvatar = async (req, res) => {

    const { _id } = req.user;

    // get from data field 'avatar'
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;

    // path to public dir (with tmp to public/avatars)
    const newUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, newUpload);

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, {avatarURL});

    res.status(200).json({avatarURL,});

};

module.exports = {
    
    updateAvatar: ctrlWrapper(updateAvatar),
};

