const rateLimit = require('express-rate-limit')
const { HTTP_CODES, STATUS } = require('./constants')

const { request } = require('./../config/limits.json')

const appLimiter = rateLimit({
  windowMs: request.range,
  max: request.count,
  handler: (req, res, next) => {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      status: STATUS.ERROR,
      code: HTTP_CODES.BAD_REQUEST,
      message: `Request limit exceeded for ${request.range} ms.`,
    })
  },
})

module.exports = { appLimiter }