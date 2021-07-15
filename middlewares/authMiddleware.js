const jwt = require('jsonwebtoken')
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)SENDGRID_API_KEY=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

const { NotAuthorizedError } = require('../errorHelpers/errors')

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      next(
        new NotAuthorizedError(
          'Please, provide a token in request authorization header',
        ),
      )
    }

    const [, token] = authorization.split(' ')

    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'))
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)

    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(new NotAuthorizedError('Invalid token'))
  }
}

module.exports = {
  authMiddleware,
}
