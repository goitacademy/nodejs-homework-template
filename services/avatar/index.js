const Jimp = require('jimp');

class AvatarService {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async update() {
    await this.transform(this.pathFile);
    const urlOfAvatar = await this.storage.save();
    return urlOfAvatar;
  }

  async transform(pathFile) {
    const pic = await Jimp.read(pathFile);
    await pic
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }
}

module.exports = AvatarService;
