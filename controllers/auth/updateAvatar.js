const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const {User} = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    const {path: tmpUpload, originalname} = req.file;
    try {
        const image = await Jimp.read(tmpUpload);
        image.resize(250, 250);
        image.quality(75);
        image.writeAsync(tmpUpload);
      } catch {
        throw HttpError(500, "Not supported mime-type");
      }
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
}

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };