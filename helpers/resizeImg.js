const jimp = require("jimp");

async function resizeImg(imgPath, width, height) {
  try {
    // Read the image.
    const image = await jimp.read(imgPath);

    // Resize the image to width 150 and auto height.
    await image.resize(width, height || jimp.AUTO);

    // Save and overwrite the image
    await image.writeAsync(imgPath);
  } catch (error) {
    if (!error.status) {
      error.status = 400;
      error.message = "Wrong file mimetype";
    }
  }
}
module.exports = resizeImg;
