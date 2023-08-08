const User = require("../../models/users");
const jimp = require("jimp");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const path = require("path");
const { HttpError, cloudinary } = require("../../helpers");
const avatarPath = path.resolve("publick", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 12);

  if (req.file !== undefined) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const sizeImg = await jimp.read(newPath);
    sizeImg.resize(250, 250);
    sizeImg.greyscale();
    sizeImg.writeAsync(newPath);

    const uploadImg = await cloudinary.uploader.upload(newPath, {
      folder: "avatars",
    });

    const newUser = await User.create({
      ...req.body,
      avatarLink: uploadImg.url,
      avatarPublickId: uploadImg.public_id,
      avatarUrl: newPath,
      password: hashPass,
    });

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = register;
