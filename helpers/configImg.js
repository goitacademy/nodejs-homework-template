const Jimp = require("jimp");
const RequestError = require("./RequestError");

function configImg({
  tempUpload,
  filename,
  avatarsDir,
  width = 100,
  height = 100,
}) {
  Jimp.read(tempUpload)
    .then((image) => {
      image.resize(width, height).write(`${avatarsDir}/${filename}`); // save
      // Do stuff with the image.
    })
    .catch((err) => {
      throw RequestError(400, `${err}`);
      // Handle an exception.
    });
}
module.exports = configImg;
