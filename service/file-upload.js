const Jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
class UploadFileAvatar {
  constructor(destination) {
    this.destination = destination
  }

  async transformAvatar(pathFile) {
    const pic = Jimp.read(pathFile)
    await (
      await pic
    )
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile)
  }

  async save(file, idUser) {
    await this.transformAvatar(file.path)
    await fs.rename(file.path, path.join(this.destination, file.filename))
    return path.normalize(path.join(idUser, file.filename))
  }
}

module.exports = UploadFileAvatar