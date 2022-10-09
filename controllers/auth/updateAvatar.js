const createError = require("http-errors");
const path = require("path");
const { authServices } = require("../../services");
const reworkImg = require("../../services/reworkImg");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file)
    throw createError(
      400,
      "Either you forgot a file or it has wrong format, only images are allowed"
    );
  const { path: tempPath, originalname } = req.file;
  const fileUniqueName = `${_id}_${originalname}`;
  const resultPath = path.join(avatarsDir, fileUniqueName);
  await reworkImg(tempPath, resultPath);
  const avatarURL = path.join("public", "avatars", fileUniqueName);
  await authServices.updateAvatar(_id, { avatarURL });
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { avatarURL: avatarURL },
  });
};

module.exports = updateAvatar;
