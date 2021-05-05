const { HttpCode } = require('./constants')

const role = (role) => (req, res, next) => {
    const roleUser = req.user.subscription
        if (roleUser !== role) {
            return res.status(HttpCode.FORBIDDEN).json({
            status: 'error',
            code: HttpCode.FORBIDDEN,
            message: 'Access is denied',
            })
        }
        return next()
    }

module.exports = role