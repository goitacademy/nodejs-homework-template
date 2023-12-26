const Jimp = require("jimp");

const { HttpError } = require("../helpers");

const avatarMan = (tmpDir) => {

  Jimp.read(tmpDir)
  .then((responce) => {
    responce
      .resize(250, 250) 
      .quality(60) 
      .write(tmpDir); 
  })
  .catch((err) => {
    throw HttpError(500, "Image error");
    // console.log(err.ENOENT);
  });
};

module.exports = avatarMan;