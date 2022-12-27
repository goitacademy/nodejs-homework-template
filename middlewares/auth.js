const jwt = require('jsonwebtoken')
const { createError } = require('../helpers');
const User = require('../models/user');

const { SECRET_KEY } = process.env

const authorize = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const [bearer, token] = authorization.split(' ')
        if (bearer !== 'Bearer') {
            throw createError(401, 'Not authorized')
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY)
            const user = await User.findById(id)
            if (!user || !user.token || user.token !== token) {
                throw createError(401, 'Not authorized')
            }
            req.user = user
        } catch (e) {
            throw createError(401, e.message)
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = authorize