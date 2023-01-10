const { subscriptionValidation } = require('../../utils/validation/subscriptionValidation')

module.exports = {
    subscriptionMiddleware: (req, res, next) => {
        const schema = subscriptionValidation
        const {error} = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        next()
    },
}