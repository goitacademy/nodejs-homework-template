const path = require("path");
const fse = require("fs-extra");
const fs = require("fs").promises;
const jimp = require("jimp");
const { catchAsync, AppError } = require("../../utils");
const User = require("../../models/userModel");

const updateAvatars = catchAsync(async (req, res, next) => {
  const { file, user } = req;

  if (!file) return next(new AppError(404, "New avatar not found"));

  const { path: tmpUpload, filename } = req.file;
 
  const img = await jimp.read(tmpUpload);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(90)
    .writeAsync(tmpUpload);

  const { _id: id } = user;
  const AVATAR_DIR = path.join(process.cwd(), "public", "avatars", `${id}`);
  await fse.ensureDir(AVATAR_DIR);

  const resultUpload = path.join(AVATAR_DIR, filename);

  await fs.rename(tmpUpload, resultUpload);
  const avatarUrl = path.join("avatars", `${id}`, filename);
  
  const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatarUrl });

  res.json({
    status: "success",
    code: 200,
    data: {
      user: updatedUser,
    },
  });
});

module.exports = updateAvatars;