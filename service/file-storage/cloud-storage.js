import { v2 as cloudinary } from 'cloudinary'
import { promisify } from 'util'
import { unlink } from 'fs/promises'
import Users from '../../repository/users'
import { CLOUD_FOLDER_AVATARS } from '../../lib/constants'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
})

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id
    this.filePath = file.path
    this.idAvatarCloud = user.idAvatarCloud
    this.folderAvatars = CLOUD_FOLDER_AVATARS
    this.uploadCloud = promisify(cloudinary.uploader.upload)
  }

  async save() {
    const { public_id: returnedIdAvatarCloud, secure_url: avatarUrl } =
      await this.uploadCloud(this.filePath, {
        public_id: this.idAvatarCloud,
        folder: this.folderAvatars,
      })

    console.log(
      '🚀 ~ file: cloud-storage.js ~ line 25 ~ CloudStorage ~ save ~ returnedIdAvatarCloud',
      returnedIdAvatarCloud,
    )
    const newIdAvatarCloud = returnedIdAvatarCloud.replace(
      `${this.folderAvatars}/`,
      '',
    )

    await Users.updateAvatar(this.userId, avatarUrl, newIdAvatarCloud)
    // Почистить за собой папку uploads
    await this.removeUploadFile(this.filePath)
    return avatarUrl
  }

  async removeUploadFile(filePath) {
    try {
      await unlink(filePath)
    } catch (error) {
      console.error(error.message)
    }
  }
}

export default CloudStorage
