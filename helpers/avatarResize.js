const Jimp = require("jimp");

const avatarResize = async ({ file, size = 250 }) => {
  try {
    const img = await Jimp.read(file.path);
    await img
      .autocrop()
      .cover(
        size,
        size,
        Jimp.VERTICAL_ALIGN_MIDDLE || Jimp.HORIZONTAL_ALIGN_CENTER
      )
      .writeAsync(file.path);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  avatarResize,
};
