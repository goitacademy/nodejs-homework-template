const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../service");
const configImg = require("../../helpers/configImg");
const RequestError = require("../../helpers/RequestError");

const avatarsDir = path.join("public", "avatars");
const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "no file");
  }
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const parameterAvatar = {
      tempUpload,
      filename,
      avatarsDir,
      // width: 250,
      // height: 250,
    };
    configImg(parameterAvatar);
    await fs.unlink(tempUpload);
    console.log(filename);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.status(200).json({
      code: 200,
      status: "success",
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = updateAvatar;
