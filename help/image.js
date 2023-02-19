const Jimp = require("jimp");
const RequestError = require("./ReqError");

const imgOpt = (filename) => {
  Jimp.read(filename, (error, image) => {
    if (error) throw RequestError(error.message);
    image.resize(256, 256).write(filename);
  });
};

module.exports = { imgOpt };
