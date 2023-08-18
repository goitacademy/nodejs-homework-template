const path = require("path");
const fs = require("fs").promises;
const { catchAsync, AppError } = require("../../utils/errorHandlers");
const service = require("../../model/users");
const Jimp = require("jimp");

const avatarDir = path.join(process.cwd(), "public", "avatars");

const updateAvatar = catchAsync(async (req, res, next) => {
  const { _id, email } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const avatar = await Jimp.read(tempUpload);

  try {
    await avatar.resize(250, 250).quality(90).writeAsync(resultUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new AppError(400, "File upload error");
  }
  await fs.unlink(tempUpload);

  const avatarUrl = path.join("avatars", filename);

  await service.updateAvatar(_id, avatarUrl);

  res.status(200).json({
    data: {
      user: {
        email: email,
        avatarUrl,
      },
    },
  });
});

module.exports = updateAvatar;
