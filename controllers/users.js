const Users = require('../model/users')
const { HttpCode }=require('../helpers/constants')
const { create } = require('../model/shemas/user')
const jwt = require('jsonwebtoken');
const User = require('../model/shemas/user');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const reg = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: "Email is already exist"
    })
  }
    try {
      const newUser = await Users.create(req.body)
      const {email,  subscription } = newUser
  console.log('QWEQRQWERE', email, subscription);
      
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
          user: {
            email,
            subscription,
            // gender,
          }
        },
        message: 'successfully created'
       })
    }
    catch (e) {
      next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'Unauthorized',
      code: HttpCode.UNAUTHORIZED,
      // message: "user has been already logged"
      // message: "invalid credentials"
      message: "emai or password is wrong"
    })
  }
  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' })
  if (!token) {
    next()
    
  }

  await Users.updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { token },
    message: 'logged successfully'
  })
}

const getCurrent = async (req, res, next) => {
  const { token } = req.user
  const currenUser = await Users.findByToken(token);
  const { email, subscription}= currenUser
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      email,
      subscription,
    }
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

module.exports  =  { reg, login, logout, getCurrent}
    