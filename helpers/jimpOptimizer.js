const Jimp = require('jimp');

async function jimpOtimizer (file) {
    await Jimp.read(file)
    .then((image)=>{
        image.cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER|Jimp.VERTICAL_ALIGN_MIDDLE).write(file);
    })
    .catch((error)=>{
        throw error;
    })
};

module.exports = jimpOtimizer;