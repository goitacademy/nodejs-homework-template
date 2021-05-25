const jwt = require('jsonwebtoken')

const Users = require('../../model/user.model')
const { secretKey } = require('../../config')
const handlerError = require('../../middlewares/notFound')

const validTokenUser = (req, res, next) => {
  if (!req.headers.authorization) { return res.status(401).json({ message: 'Not authorized' }) }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secretKey, (err, decode) => {
    if (err) { return res.status(401).json({ message: 'Not authorized' }) }

    const { id } = decode

    Users.findById(id)
      .then(user => {
        if (!user || user.token.length === 0) {
          return res
            .status(401)
            .json({ message: 'Not authorized' })
        }
        req.user = user
        next()
      })
      .catch(err => handlerError(res, err))
  })
}

module.exports = validTokenUser
