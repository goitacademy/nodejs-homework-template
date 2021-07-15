const jwt = require('jsonwebtoken')
require('dotenv').config()

const { users: service } = require('../../services')

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })
    if (!user || !user.validatePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect email or password',
      })
      return
    }
    const id = (user._id)
    const payload = { id }
    const { SECRET_KEY } = process.env

    const token = jwt.sign(payload, SECRET_KEY)
    await service.update(id, { token })

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: token,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
