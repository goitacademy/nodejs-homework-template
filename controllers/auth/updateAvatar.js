const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');

const {User} = require("../../model");

const usersAvatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async(req, res)=> {

    const {path: tempPath, originalname} = req.file;
    const resultPath = path.join(usersAvatarsDir, originalname);
    const {_id} = req.user;

    // await Jimp.read(tempPath, (err, img)=>{ img.resize(250, 250).write(tempPath) }); - не смог разобратся, он жмет картинку копирует в новый путь и вешает скрипт нашлухо

    try {
        
        await fs.rename(tempPath, resultPath);
        const avatarURL = `avatars/${originalname}`;
        const user = await User.findByIdAndUpdate(_id, {avatarURL}, {new: true});
        res.json(user)

    } catch (error) {
        await fs.unlink(tempPath)
    }
}

module.exports = updateAvatar;