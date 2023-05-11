const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models");
const { HttpError, modifyImage } = require("../../helpers");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const avatarExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];

const updateAvatar = async (requirement, response) => {
  console.log(requirement.file);
  const { _id } = requirement.user;
  const { path: tempUpload, originalname } = requirement.file;
  const avatarName = `${_id}_${originalname}`;

  const fileExtension = originalname.substring(
    originalname.lastIndexOf(".") + 1
  ); // Check extension of avatar

  if (!avatarExtensions.includes(fileExtension.toLowerCase())) {
    throw HttpError(
      400,
      `${originalname} includes an invalid file extension! Must be: ${avatarExtensions.join(
        ", or "
      )}`
    );
  }

  const resultUpload = path.join(avatarDir, avatarName);

  await modifyImage(tempUpload); // Use Jimp to modify the image

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  response.json({ avatarURL });
};

module.exports = updateAvatar;
