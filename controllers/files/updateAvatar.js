const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../model/user");
const RequestError = require("../../helpers/requestError");
const Jimp = require("jimp");
const { isMainThread } = require("worker_threads");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "There is no file");
  }
  try {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;

    const image = await Jimp.read(tmpUpload);
    await image.resize(250, 250);
    await image.writeAsync(tmpUpload);

    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });
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
