const Jimp = require("jimp");

const resizedImg = async (path) => {
    Jimp.read(path)
      .then((img) => {
        return img
          .resize(250, 250) 
          .write(path); 
      })
      .catch((err) => {
        console.error(err);
      });
    
}

module.exports = resizedImg;