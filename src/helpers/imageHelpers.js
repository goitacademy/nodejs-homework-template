const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const AVATARS_DIR = "./tmp";
const PUBLIC_DIR = "./public";

const resizeAndMoveImage = async (fileName) => {
  // Read the image from tmp folder
  const image = await Jimp.read(`${AVATARS_DIR}/${fileName}`);

  // Resize the image to 250x250
  image.resize(250, 250);

  // Generate a unique name for the image
  const newFileName = `${uuidv4()}.${image.getExtension()}`;

  // Save the image to public folder
  image.write(`${PUBLIC_DIR}/${newFileName}`);

  // Delete the original image from tmp folder
  fs.unlinkSync(`${AVATARS_DIR}/${fileName}`);

  return newFileName;
};

module.exports = { resizeAndMoveImage };
