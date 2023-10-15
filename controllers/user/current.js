const User = require('../../models/users')

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