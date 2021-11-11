const { getCurrent } = require('../../model/auth')

const authCurrent = async (req, res, next) => {
  const data = await getCurrent(req.user)

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: data
    }
  })
}

module.exports = authCurrent
