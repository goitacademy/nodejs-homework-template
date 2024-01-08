const { RequestError } = require('../../helpers')

const currentUser = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            throw RequestError(401, "Not authorized")
        }

        res.json({
            email: user.email,
            subscription: user.subscription
        })
    } catch (error) {
        next(error)
    }
}

module.exports = currentUser