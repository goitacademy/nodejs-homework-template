const Jimp = require("jimp");


async function resizeAvatar(primaryPath,mainPath) {
 
    const image = await Jimp.read(primaryPath);
   
    await image.resize(250, 250);
    
    await image.writeAsync(mainPath);
  }

  module.exports = resizeAvatar;