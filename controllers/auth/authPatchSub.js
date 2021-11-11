const { patchUserSub } = require('../../model/auth')

const authPatchSub = async (req, res, next) => {
  const { subscription } = req.body
  const data = await patchUserSub(req.user, subscription)
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = authPatchSub
