// Імпортуємо "bcryptjs"
const bcrypt = require('bcryptjs')
const requestError = require('../../helpers/requestError')
const { User } = require('../../models/user')

// Хешуємо пароль
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10)
//   console.log(salt)

//   const result = await bcrypt.hash(password, 10)
//   console.log(result)
// }
// hashPassword('1234567')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw requestError(409, 'Email in use')
  }

  // Хешуємо пароль "hashPassword"
  const hashPassword = await bcrypt.hash(password, 10)

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
  })
  res.status(201).json({
    name: result.name,
    email: result.email,
    subscription: result.subscription,
  })
}

module.exports = register

// https://www.youtube.com/watch?v=HOPafUpkGdg
// 35 хвилина, 55 хвилина
// https://www.youtube.com/watch?v=e_ZQX6V7P0Y

// const { Conflict } = require('http-errors')
// const { User } = require('../../models/user')

// const register = async (req, res) => {
//   const { email, password, subscription } = req.params
//   const user = await User.findOne({ email })
//   if (user) {
//     throw new Conflict(409, 'Email in use')
//   }
//   const result = await User.create({ email, password, subscription })
//   res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       user: {
//         email,
//         subscription,
//       },
//     },
//   })
// }

// module.exports = register
