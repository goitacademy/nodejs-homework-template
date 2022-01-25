const { BadRequest, Conflict } = require('http-error')
gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { joiRegisterSchema } = require('../../model/user')
const { User } = require('../../model/index')

const signupUser = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { password, email, subscription } = req.body
    const image = gravatar.url(email)
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hashingPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      password: hashingPassword,
      avatarURL: image,
      email,
      subscription,
    })
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        image: newUser.image,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signupUser,
}
