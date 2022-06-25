const fs = require('fs/promises')
const { HTTP_CODES, STATUS } = require('../../helpers/constants')

const { UploadCloudService } = require('../../services/uploaders')
const { userServices } = require('../../services')

const updateCloudUserAvatar = async (req, res, next) => {
  try {
    const userID = req.user.id

    if (req.file) {
      const uploads = new UploadCloudService()
      const { avatarURL, avatarCloudId } = await uploads.updateUserAvatar(
        req.file,
        req.user.avatarCloudId,
      )

      const user = await userServices.updateUserAvatar(
        userID,
        avatarURL,
        avatarCloudId,
      )
      await fs.unlink(req.file.path)
      if (user) {
        return res.status(HTTP_CODES.CREATED).json({
          status: STATUS.SUCCESS,
          code: HTTP_CODES.OK,
          data: {
            avatarURL: user.avatarURL,
          },
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = updateCloudUserAvatar