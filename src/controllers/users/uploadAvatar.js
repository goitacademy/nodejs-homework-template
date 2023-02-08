// const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
// console.log(avatarsDir);
const {v4} = require("uuid");


const uploadAvatar = async (req, res, next) => {

  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
// const avatarURL = path.join("../../", "public", "avatars", originalname)
   



// res.json({
    //   status: "success",
    //   code: 200,
      // user,
    // });
  } catch (error) {
    await fs.unlink(tempUpload)
    // next(error);
  }
};

module.exports = uploadAvatar;
