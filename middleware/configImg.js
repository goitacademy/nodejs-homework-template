const Jimp = require("jimp");
const RequestError = require("../helpers/RequestError");
const path = require("path");
const avatarsDir = path.join("public", "avatars");
console.log(avatarsDir);
function configImg(avatarImg, id, extension) {
  Jimp.read(avatarImg)
    .then((image) => {
      image
        .resize(250, 250)
        .quality(60) // set JPEG quality
        .write(`${avatarsDir}/${id}.${extension}`); // save
      // Do stuff with the image.
    })
    .catch((err) => {
      throw RequestError(400, `${err}`);
      // Handle an exception.
    });
}
module.exports = configImg;
