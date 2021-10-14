const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const register = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already register')
  }
  const newUser = new User({ email })
  //   newUser = {email}
  newUser.setPassword(password)
  //   newUser = {email, password}
  await newUser.save()
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //   const newUser = { email, password: hashPassword }
  //   await User.create(newUser)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register'
  })
}

module.exports = register
