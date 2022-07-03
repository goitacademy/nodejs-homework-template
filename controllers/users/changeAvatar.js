const { User } = require('../../models');
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");



const changeAvatar = async (req, res, next) => {
    
    const { path: tempUpload, originalname } = req.file;
    const [, typeFile] = originalname.split(".");
    const newName = uuidv4() + "." + typeFile;
    

    try {
        const resultUpload = path.join(avatarsDir, newName);
        const image = await jimp.read(tempUpload);
        await image.resize(250, 250).writeAsync(resultUpload);
        await fs.unlink(tempUpload);
        


        const avatarURL = path.join("avatars", newName);
        const result = await User.findByIdAndUpdate(
            req.user._id,
            { avatarURL },
            { new: true }
        );
        res.status(200).json({ avatarURL: result.avatarURL });
    } catch (err) {
        await fs.unlink(tempUpload);
        throw err;
    }
};


module.exports = changeAvatar;