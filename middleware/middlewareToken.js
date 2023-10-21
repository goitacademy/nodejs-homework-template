const jwt = require('jsonwebtoken')
require('../config/passport')
const secretKey = process.env.JWT_SECRET
const User = require('../models/users')
const { HttpError } = require('../helpers')

const middlewareToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return next(HttpError(401, "Not authorized"))
    }

    const [bearer, token] = authorization.split(' ')

    if (!token) {
        return next(HttpError(401, "Not authorized"))
    }

    if (bearer !== 'Bearer') {
        return next(HttpError(401, "Not authorized"))
    }

    try {
        const { _id } = jwt.verify(token, secretKey)

        const user = await User.findById(_id)
        if (!user) {
            return next(HttpError(401, "Not authorized"))
        }

        req.user = user
        next()
    } catch (err) {
        return next(HttpError(401, "Not authorized"))
    }
}

module.exports = middlewareToken