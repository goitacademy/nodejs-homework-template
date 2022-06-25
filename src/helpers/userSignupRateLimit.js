const rateLimit = require('express-rate-limit')
const { HTTP_CODES, STATUS } = require('./constants')

const { signup } = require('./../config/limits.json')

const signupAccountLimiter = rateLimit({
  windowMs: signup.range,
  max: signup.count,
  handler: (req, res, next) => {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_CODES.BAD_REQUEST,
      message: `Too many accounts created from this IP, please try again after ${signup.range} ms`,
    })
  },
})

module.exports = { signupAccountLimiter }