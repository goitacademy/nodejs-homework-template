const User = require("../../models/userModel");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { imageStore } = require("../../midlewares/upload");


const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "There is no file" });
  }
  const { description } = req.body;
  const { path: temporaryName } = req.file;
  const fileName = path.join(imageStore, req.file.filename);

  const newUser = await User.updateUserAvatar(req.body.id, fileName);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }

  const isValid = await isCorrectResizedImage(fileName);
  if (!isValid) {
    await fs.unlink(fileName);
    return res
      .status(400)
      .json({ message: "File is not a photo or problem during resizing" });
  }

  res.json({
    description,
    fileName,
    avatarURL: newUser.avatarURL,
    message: "File uploaded correctly",
    status: 200,
  });
};

const isCorrectResizedImage = async (imagePath) =>
  new Promise((resolve) => {
    try {
      Jimp.read(imagePath, (error, image) => {
        if (error) {
          resolve(false);
        } else {
          image.resize(250, 250).write(imagePath);
          resolve(true);
        }
      });
    } catch (error) {
      resolve(false);
    }
	});
	
module.exports = { updateAvatar };