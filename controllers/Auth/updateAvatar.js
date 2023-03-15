const User = require("../../db/users");
const path = require("path");
const fs = require("fs/promises");
const { updateUserAvatar } = require("../../services/authService");
const Jimp = require("jimp");


const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extention = originalname.split(".").pop();
  const filename = `${_id}.${extention}`;

  try {
    const resultUpload = path.join(avatarDir, filename);

    const originalAvatar = await Jimp.read(tempUpload);
    originalAvatar.resize(250, 250).write(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await updateUserAvatar(_id, avatarURL);



      
    res.status(200).json({ avatarURL });
   
  } catch (error) {
    res.status(401).json({
      message: "Not authorized"
    });
  }

     
};

module.exports = { updateAvatar };
