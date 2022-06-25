const path = require('path')
const fs = require('fs/promises')
const { HTTP_CODES, STATUS } = require('../../helpers/constants')
const { AVATARS } = require('../../helpers/uploadPath')

const { UploadLocalService } = require('../../services/uploaders')
const { userServices } = require('../../services')

const updateUserAvatar = async (req, res, next) => {
  try {
    const userID = req.user.id
    if (req.file) {
      const uploads = new UploadLocalService(AVATARS)
      const avatarURL = await uploads.updateUserAvatar(userID, req.file)
      const user = await userServices.updateUserAvatar(userID, avatarURL)
      try {
        await fs.unlink(path.join(AVATARS, req.user.avatarURL))
      } catch (error) {
        // console.log(error)
      }

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

module.exports = updateUserAvatar