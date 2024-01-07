const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");

// settings for upload
const storeImage = path.join(process.cwd(), "/public/avatars");

const uploadDir = path.join(process.cwd(), "uploads");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

exports.prepareEnvironment = () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
};

exports.proceedFile = async (filePath, originalName, userId) => {
  const fileExtension = originalName.split(".").pop();
  const newPath = path.join(storeImage, userId + "." + fileExtension);
  const img = await Jimp.read(filePath);
  await img
    .resize(256, 256) // resize
    .quality(60) // set JPEG quality
    .writeAsync(newPath); // save
  return newPath;
};

exports.storeImage = storeImage;

exports.uploadDir = uploadDir;
