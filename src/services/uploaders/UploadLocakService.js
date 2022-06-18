const mkFolder = require('../../helpers/mkFolder')
const fs = require('fs/promises')
const { join, normalize } = require('path')
const Jimp = require('jimp')

class UploadLocalService {
  constructor(folder) {
    this.folder = folder
  }

  async avatarPostProcessing(path) {
    const img = await Jimp.read(path)
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(path)
  }

  async updateUserAvatar(userId, { path, filename }) {
    try {
      await this.avatarPostProcessing(path)
      const userFolder = join(this.folder, userId)
      await mkFolder(userFolder)
      await fs.rename(path, join(userFolder, filename))
      return normalize(join(userId, filename))
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = UploadLocalService