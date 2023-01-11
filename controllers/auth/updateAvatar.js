const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  
  jimp
    .read(tempUpload)
    .then(avatar => {
      return avatar
      .resize(250, 250)
      .write(resultUpload); // save;
      
    })
    .catch((err) => {
      console.error(err);
    }); 
    
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
