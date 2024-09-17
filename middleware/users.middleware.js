const jwt = require('jsonwebtoken')

const { userSchema } = require('../schemas/users.schema')
const { getUserById } = require('../service/users.service')

require('dotenv').config()

const JWT_KEY = process.env.JWT_KEY

const usersValidate = (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    next()
}

const isAuthorized = async (req, res, next) => {
    const { authorization = '' } = req.headers

    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const { id } = jwt.verify(token, JWT_KEY)

    const user = await getUserById(id)

    if (!user || user.token !== token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    req.user = user

    next()
}

module.exports = {
    usersValidate,
    isAuthorized,
}
