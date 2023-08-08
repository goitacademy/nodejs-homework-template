const jimp = require("jimp");

const resize = async (req, res, next) => {
  const { path } = req.file;
  await jimp
    .read(path)
    .then((avatar) => avatar.resize(250, 250).write(path))
    .catch((err) => console.error(err));
  next();
};

module.exports = resize;
