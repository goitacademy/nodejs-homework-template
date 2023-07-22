const jimp = require("jimp");


const normalizeAvatar = async (path, size) => {
    const image = await jimp.read(path);
    image.resize(size, jimp.AUTO);
    await image.writeAsync(path);
}

module.exports = normalizeAvatar;