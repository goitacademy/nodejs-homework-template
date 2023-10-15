const User = require('../../models/users')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Object} - Відповідь повертає 200 з об'єктом користувача (email та subscription) або помилку 401, якщо користувач не авторизований.
 */
const current = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
    }

    const { _id } = req.user
    const user = await User.findById(_id)

    res.status(200).json({
        email: user.email,
        subscription: user.subscription
    })
}

module.exports = current