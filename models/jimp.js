const Jimp = require("jimp");
const jimpConvert = (pathToTheFile) => {
    Jimp.read(pathToTheFile, (err, avatar) => {
        if (err) throw err;
        avatar.resize(350, 350).quality(60).write(pathToTheFile);
    });
};

module.exports = jimpConvert;
