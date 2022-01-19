
   
import Jimp from 'jimp'

class UploadFileService {
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
      .cover(200,200,Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile)
  }
}

export default UploadFileService