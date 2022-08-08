const { User } = require("../../models")
const path = require("path")
const fs = require("fs/promises")
const Jimp = require('jimp');
// const avatarsDir = path.join(__dirname, '../../',"public","avatars")
const avatarsDir = path.join(__dirname,"../../","public","avatars")
const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user
    const imgName = `${id}_${originalname}`
try {
    Jimp.read(originalname)
        .then(img => {
            return img.resize(250, 250)
            .write(imgName)
        })
        .catch(error => {
            console.error(error)
        })
    const resultUpload = path.join(avatarsDir, imgName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join("public", "avatars", imgName)
    await User.findByIdAndUpdate(req.user._id, { avatarURL })
    res.json({
      "avatarURL":  avatarURL
    })
} catch (error) {
    await fs.unlink(tempUpload)
    throw error
}
}
module.exports = updateAvatar



    
      
  
