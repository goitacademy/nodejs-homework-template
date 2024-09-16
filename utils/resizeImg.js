const jimp = require("jimp");

async function resizeImg(path) {
  try {
    // Read the image.
    const image = await jimp.read(path);
    // Resize the image
    image.resize(250, 250);
    // Save and overwrite the image
    await image.writeAsync(path);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { resizeImg };
