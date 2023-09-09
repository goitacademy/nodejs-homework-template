const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const token = authorizationHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'yourSecretKey')
        const user = await User.findById(decoded.userId)

        if (!user || user.token !== token) {
            throw new Error('Authentication failed')
        }

        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ message: 'Not authorized' })
    }
}

module.exports = authMiddleware
