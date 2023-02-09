const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
var Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir);

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, imageName);
    // rename avatar Name
await fs.rename(tempUpload, resultUpload);

    //  resize throw Jimp
    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image
        .resize(250, 250) // resize
        .write(resultUpload); // save
    });

    
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
    // next(error);
  }
};

module.exports = updateAvatar;
