const { patchUserAvatar } = require('../../model/auth')

const authPatchAvatar = async (req, res, next) => {
  const data = await patchUserAvatar(req.user, req.file)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = authPatchAvatar
