const User = require("../../models/users");
const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");
const { HttpError, cloudinary } = require("../../helpers");
const avatarPath = path.resolve("publick", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { email, avatarLink, avatarPublickId, avatarUrl } = await User.findById(
    _id
  );
  if (!req.file) {
    throw HttpError(404, "File missing");
  }

  if (req.file !== undefined && avatarLink.length !== 0) {
    console.log("sadasdasdasd");
    fs.unlink(avatarUrl);

    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);

    const sizeImg = await jimp.read(newPath);
    sizeImg.resize(250, 250);
    sizeImg.greyscale();
    sizeImg.writeAsync(newPath);

    await cloudinary.uploader.destroy(avatarPublickId, {
      folder: "avatars",
    });
    const uploadImg = await cloudinary.uploader.upload(newPath, {
      folder: "avatars",
    });

    await User.findByIdAndUpdate(_id, {
      avatarUrl: newPath,
      avatarLink: uploadImg.url,
      avatarPublickId: uploadImg.public_id,
    });
    res.status(200).json({
      email,
      avatarLink: uploadImg.url,
      avatarUrl: newPath,
    });
  }
  if (req.file !== undefined && avatarLink.length === 0) {
    const { path: oldPath, filename } = req.file;
    console.log(oldPath);
    console.log(filename);
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);

    const sizeImg = await jimp.read(newPath);
    sizeImg.resize(250, 250);
    sizeImg.greyscale();
    sizeImg.writeAsync(newPath);

    const uploadImg = await cloudinary.uploader.upload(newPath, {
      folder: "avatars",
    });
    await User.findByIdAndUpdate(_id, {
      avatarUrl: newPath,
      avatarLink: uploadImg.url,
      avatarPublickId: uploadImg.public_id,
    });
    res.status(200).json({
      email,
      avatarLink: uploadImg.url,
      avatarUrl: newPath,
    });
  }
};
module.exports = updateAvatar;
