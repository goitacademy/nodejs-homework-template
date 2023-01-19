const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { createFolderIsNotExist } = require("../helpers/helpers");
const { error } = require("../helpers/errors");
const { User } = require("../models/userModel");

const STORE_AVATARS = path.join(process.cwd(), "public/avatars");

const uploadAvatar = async (userId, { temporaryName, originalname }) => {
  await createFolderIsNotExist(STORE_AVATARS);

  const [fileName, extension] = originalname.split(".");
  const newFileName = `${fileName}-${userId}.${extension}`;
  const newFilePath = path.join(STORE_AVATARS, newFileName);

  Jimp.read(temporaryName, (err, userAvatar) => {
    if (err) throw err;
    userAvatar.resize(250, 250).quality(100).write(newFilePath);
    fs.unlink(temporaryName, (err) => {
      if (err) throw err;
    });
  });

  const avatarURL = path.join("/avatars", newFileName);

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { avatarURL } },
    { new: true }
  );

  if (!user) {
    throw error(404, "Not found");
  }

  return user;
};

module.exports = {
  uploadAvatar,
};
