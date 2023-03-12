const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../model/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");


const updateAvatar = async (req, res) => {
    const { _id: id } = req.user
    const { path: tempUpload, originalname } = req.file;
    const filename = `${id}_${originalname}`
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", filename);
    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({avatarUrl})
}

module.exports = updateAvatar;