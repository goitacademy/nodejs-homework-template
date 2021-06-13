const fs = require('fs/promises')

class Upload {
  constructor(uploadCloud) {
    this.uploadCloud = uploadCloud
  }

  async saveAvatarToCloud(pathFile, userIdImg) {
    const { public_id, secure_url } = await this.uploadCloud(pathFile, {
      public_id: userIdImg?.replace('Images/', ''),
      folder: 'Images',
      transformation: { width: 250, crop: 'pad' },
    })
    await this.deleteTemporyFile(pathFile)
    console.log(public_id, secure_url)
    return { userIdImg: public_id, avatarURL: secure_url }
  }

  async deleteTemporyFile(pathFile) {
    try {
      await fs.unlink(pathFile)
    } catch (error) {
      console.log(error.message)
    }
  }
}
module.exports = Upload
