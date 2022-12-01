const fs = require("fs/promises")
const path = require("path")
const {User} = require("../../models/users")
const jimp = require('jimp');


const avatarsDir = path.join(__dirname,"../../", "public", "avatars")


const updateAvatar = async(req, res) =>{
try {
const {_id}= req.user;
    const {path: tempUpload, originalname}= req.file;

    const image = await jimp.read(tempUpload);
       image.resize(250, 250).writeAsync(tempUpload);

    const extention = originalname.split(".").pop();
    const filename =`${_id}.${extention}`
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload,resultUpload);
    const avatarURL = path.join("avatars",filename);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL
    })
    
} catch (error) {
    await fs.unlink(req.file.path);
    throw error;
}
}

module.exports = updateAvatar;
