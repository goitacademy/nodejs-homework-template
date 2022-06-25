const rateLimit = require('express-rate-limit')
const { HTTP_CODES, STATUS } = require('./constants')

const { login } = require('./../config/limits.json')

const loginAccountLimiter = rateLimit({
  windowMs: login.range,
  max: login.count,
  handler: (req, res, next) => {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_CODES.BAD_REQUEST,
      message: `Too many logins from this IP, please try again after ${login.range} ms`,
    })
  },
})

module.exports = { loginAccountLimiter }