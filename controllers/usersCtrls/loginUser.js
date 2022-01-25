const { Unauthorized, BadRequest } = require('http-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { joiLoginSchema } = require('../../model/user')
const { User } = require('../../model/index')

const { SECRET_KEY } = process.env

const loginUser = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Unauthorized('Email is wrong')
    }
    const passwordMatching = await bcrypt.compare(password, user.password)
    if (!passwordMatching) {
      throw new Unauthorized('Password is wrong')
    }

    const { _id } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    if (Unauthorized) {
      error.status = 401
    }
    next(error)
  }
}

module.exports = {
  loginUser,
}
