const Jimp = require("jimp");

const resize = (req, res, next) => {
  console.log(req.file.path);
  const { path } = req.file;
  Jimp.read(path)
    .then((image) => {
      image.resize(250, 250);
      image.write(path);
      next();
    })
    .catch((err) => next(err));
};

module.exports = resize;
