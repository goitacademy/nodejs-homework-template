// const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../config/passport')
const secretKey = process.env.JWT_SECRET
const User = require('../models/users')
const { HttpError } = require('../helpers')

const middlewareToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        next(HttpError(401, "Not authorized"))
    }

    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer') {
        next(HttpError(401, "Not authorized"))
    }

    try {
        const { _id } = jwt.verify(token, secretKey)

        const user = await User.findById(_id)
        if (!user) {
            next(HttpError(401, "Not authorized"))
        }

        req.user = user
        next()
    } catch (err) {
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = middlewareToken