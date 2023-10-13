const { handleReqError } = require('../../helpers')
const User = require('../../models/users')
const jwt = require('jsonwebtoken')
require('../../config/passport')
const secretKey = process.env.JWT_SECRET


const logout = async (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey)
    req.user = decoded

    const user = await User.getUserByEmail(req.user._id)
    if (!user) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    // Видалення токену користувача з бази даних або сервера
    // 204 No Content
    user.tokens = user.tokens.filter(token => token.token !== req.token)
    await user.save()
    res.status(204).send()
}

module.exports = handleReqError(logout)