const { subscribtionSchema } = require('../../utils/validation/subscriptionValidation')

module.exports = {
    subscriptionValidation: (req, res, next) => {
        const schema = subscribtionSchema
        const {error} = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        next()
    },
}