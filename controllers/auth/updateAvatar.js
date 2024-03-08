const path = require("path");

const fs = require("fs/promises");

const {User} = require("../../models/user");

const Jimp = require("jimp")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const{_id} = req.user;
    const{path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    Jimp.read(tempUpload)
  .then((avatar) => {
    return avatar
      .resize(250, 250)
      .sepia()
      .write(resultUpload);
  })
  .catch((err) => {
    console.error(err);
  });
  
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename );
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;