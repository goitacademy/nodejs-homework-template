import Jimp from 'jimp'

class AvatarStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user)
    this.pathFile = file.path
  }

  async updateAvatar() {
    await this.transformAvatar(this.pathFile)
    const userUrlAvatar = await this.storage.save()
    return userUrlAvatar
  }

  async transformAvatar(pathFile) {
    const pic = await Jimp.read(pathFile)
    await pic
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile)
  }
}

export default AvatarStorage
