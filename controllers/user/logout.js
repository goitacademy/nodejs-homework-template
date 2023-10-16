const { handleReqError, HttpError } = require('../../helpers')
const User = require('../../models/users')
const jwt = require('jsonwebtoken')
require('../../config/passport')
const secretKey = process.env.JWT_SECRET

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Object} - Відповідь зі статусом 204, якщо вихід успішний, або помилку 401, якщо користувач не авторизований або сталася помилка.
 */
const logout = async (req, res, next) => {

    const token = req.header('Authorization')

    if (!token) {
        next(HttpError(401, "Not authorized"))
    }
    try {
        const { _id } = jwt.verify(token.replace('Bearer ', ''), secretKey)
        const user = await User.findById(_id)

        if (!user) {
            return next(HttpError(401, "Not authorized"))
        }

        user.token = ""
        await user.save()
        res.status(204).send()
    } catch (err) {
        return next(HttpError(401, "Not authorized"))
    }
}

module.exports = handleReqError(logout)