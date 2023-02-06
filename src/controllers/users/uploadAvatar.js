// const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");


const uploadAvatar = async (req, res, next) => {
  const {path: tempUpload, originalname} = req.file;
const usersDir = path.join(__dirname, "../../", "public", "avatars" )
  try {
const resultUpload = path.join(usersDir, originalname); 
await fs.rename(tempUpload, resultUpload);

    res.json({
      status: "success",
      code: 200,
      // user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
