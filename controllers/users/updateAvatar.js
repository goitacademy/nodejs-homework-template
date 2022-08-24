const Jimp = require("jimp");
const {User} = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
<<<<<<< Updated upstream

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

=======

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

>>>>>>> Stashed changes
const updateAvatar = async(req, res) => {
  try {
    const {_id} = req.user;
    const {path: tempPath, originalname} = req.file;
    const [extension] = originalname.split(".").reverse();
    const avatar = await Jimp.read(tempPath);
    await avatar.resize(250, 250).writeAsync(tempPath);
    const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarsDir, newName);
    await fs.rename(tempPath, uploadPath);  
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, {avatarURL});  
    res.json({
      avatarURL
    })
  } catch (error) {

    await fs.unlink(req.file.path);
    throw error;
   }
}

module.exports = updateAvatar