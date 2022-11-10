const jwt = require('jsonwebtoken')

const { User } = require('../../models/user')

const { RequestError } = require('../../helpers/Errors')

const {JWT_SECRET} = process.env

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer')
        { throw RequestError('Not authorized', 401) }
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(payload.id)
        if (!user || user.token !== token)
        { throw RequestError('Not authorized', 401) }
        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
   
}

module.exports = authenticate;