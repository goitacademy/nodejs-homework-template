const Jimp = require("jimp");
const RequestError = require("../helpers/RequestError");

const jimpResize = async (req, _, next) => {
  const { path } = req.file;

  try {
    const img = await Jimp.read(path);
    await img.resize(250, 250).quality(60).greyscale().writeAsync(path);
    next();
  } catch (error) {
    throw RequestError(error.message);
  }
};

module.exports = jimpResize;
