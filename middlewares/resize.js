const Jimp = require('jimp')
const resize = (req, res, next) => {
  const { path } = req.file
  Jimp.read(path)
    .then((image) => {
      image.resize(250, 250)
      image.write(path)
      next()
    })
    .catch((error) => next(error))
}

module.exports = resize
