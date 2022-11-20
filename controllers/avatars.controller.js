const jimp = require("jimp");
const path = require("path");
const { nanoid } = require("nanoid");

const { avatarUpdate } = require("../service/authService");

async function avatarTransform(fileName) {
  const source = path.join(__dirname, "../tmp");
  const destination = path.join(__dirname, "../public/avatars");
  const image = await jimp.read(`${source}/${fileName}`);
  const [name, extention] = fileName.split(".");
  await image.resize(250, 250);
  const newAvatarPath = `${destination}/${name}-${nanoid(6)}.${extention}`;
  await image.writeAsync(newAvatarPath);
  return newAvatarPath;
}

async function uploadController(req, res, next) {
  const newAvatarPath = await avatarTransform(req.file.originalname);
  const result = await avatarUpdate(req.user, newAvatarPath);
  return res.json(result);
}

module.exports = {
  uploadController,
};
