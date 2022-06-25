const { promisify } = require('util')
const cloudinary = require('cloudinary').v2
require('dotenv-expand')(require('dotenv').config())

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_DIR } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
})

const uploadCloudinary = promisify(cloudinary.uploader.upload)

class UploadCloudService {
  async updateUserAvatar({ path }, prevAvatarCloudId) {
    try {
      const { secure_url: avatarURL, public_id: avatarCloudId } =
        await uploadCloudinary(path, {
          public_id: prevAvatarCloudId?.replace(`${CLOUD_DIR}/`, ''),
          folder: CLOUD_DIR,
          transformation: {
            width: 250,
            height: 250,
            crop: 'fill',
          },
        })

      return { avatarURL, avatarCloudId }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = UploadCloudService