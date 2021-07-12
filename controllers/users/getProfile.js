const jwt = require('jsonwebtoken')
require('dotenv').config()

const { users: service } = require('../../services')

const getProfile = async (req, res, next) => {
  try {
    const { SECRET_KEY } = process.env
    const [, token] = req.headers.Authorization.split(' ')
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await service.getById(id)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: user
      }
    })
  } catch (error) {
    res.status(403).json({
      status: 'error',
      code: 403,
      message: 'Invalid token'
    })
  }
}

module.exports = getProfile

// const getProfile = async (req, res, next) => {
//   const { password, ...userInfo } = req.user
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       result: userInfo,
//     },
//   })
// }

// module.exports = getProfile
