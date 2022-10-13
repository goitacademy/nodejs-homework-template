const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../service");
const configImg = require("../../middleware/configImg");
const RequestError = require("../../helpers/RequestError");

// const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "no file");
  }
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    configImg(tempUpload, _id, extension);
    const filename = `${_id}.${extension}`;
    await fs.unlink(tempUpload);
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
