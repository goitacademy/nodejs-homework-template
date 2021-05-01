const Users = require('../model/users')
const {HttpCode} = require('../helper/constans')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  const {email} = reg.body
  const user = await Users.findUserByEmail(email)  
  if (user) {
      return res.status(HttpCode.CONFLICT).json({
          status: 'error',
          code: HttpCode.CONFLICT,
          message: 'Email is already use',
      })
  }
  try {
      const {newUser} = await Users.addUser(reg.body)
      return res.status(HttpCode.CREATED).json({
          status: 'success',
          code: HttpCode.CREATED,
          data: {
              id: newUser.id,
              email: newUser.email,
              subscription: newUser.subscription,
          }
      })
} catch(e) {
    next(e)
}
  }

  const login = async (req, res, next) => {
    const {email, password} = reg.body
  const user = await Users.findUserByEmail(email)
  const isValidPassport = await user?.validPassword(password)
  if (!user || !isValidPassport) {
    return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
    })
}
const payload = {id: user.id}
const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: '2h'})
await Users.updateUserToken(user.id, token)
return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {token},
})
}

const logout = async (req, res, next) => {
    const id = reg.user.id
    await Users.updateUserToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

module.exports = {
    reg,
    login,
    logout,
}