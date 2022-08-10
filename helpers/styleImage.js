const Jimp = require('jimp');
const styleImage = async path => {
  await Jimp.read(path)
    .then(image => {
      return image.resize(250, 250).write(path);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = styleImage;
