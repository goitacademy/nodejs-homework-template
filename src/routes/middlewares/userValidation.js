const { userFormValidation } = require('../../utils/validation/userFormValidation')

module.exports = {
    userValidation: (req, res, next) => {
        const schema = userFormValidation
        const {error} = schema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        
        next()
    },
}