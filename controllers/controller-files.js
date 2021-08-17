const { code } = require('.././template/http-code-template')
const { updateAvatar } = require('.././sevices/fileService')

const avatarsController = async (req, res, next) => {
  try {
    const { id } = req.user

    const url = await updateAvatar(id, req.file)

    res.status(code.OK).json({
      status: 'Success',
      avatarURL: url,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  avatarsController,
}