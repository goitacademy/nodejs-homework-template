import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import User from "../../models/user.js";

const avatarDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;

    const avatar = await Jimp.read(oldPath);
    await avatar.resize(250, 250).write(oldPath);

    const newPath = path.join(avatarDir, filename);
    await fs.rename(oldPath, newPath);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
};

export default updateAvatar;