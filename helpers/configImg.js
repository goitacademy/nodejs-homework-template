const Jimp = require("jimp");
const RequestError = require("./RequestError");

function configImg({
  tempUpload,
  filename,
  avatarsDir,
  width = 100,
  height = 100,
  quality,
}) {
  Jimp.read(tempUpload)
    .then((image) => {
      image
        .resize(width, height)
        .write(`${avatarsDir}/${filename}`)
        .quality(quality); // save
      // Do stuff with the image.
    })
    .catch(() => {
      throw RequestError(400, "Filed format file");
      // Handle an exception.
    });
}
module.exports = configImg;
