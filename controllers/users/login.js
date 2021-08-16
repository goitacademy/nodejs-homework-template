const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user: service } = require('../../services')

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'Error',
        code: 401,
        message: 'Email or password is wrong',
      })
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY)

    await service.updateById(payload.id, { token })

    res.status(200).json({
      status: 'Success',
      code: 200,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
