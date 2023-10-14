// const { handleReqError } = require('../../helpers')
const User = require('../../models/users')
const jwt = require('jsonwebtoken')
require('../../config/passport')
const secretKey = process.env.JWT_SECRET


const logout = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    try {
        const { _id } = jwt.verify(token.replace('Bearer ', ''), secretKey)
        const user = await User.findById(_id)

        if (!user) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        user.token = []
        await user.save()

        res.status(204).send()
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        })
    }
}

module.exports = logout