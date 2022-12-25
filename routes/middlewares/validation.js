const { contactFormValidation } = require('../../utils/validation/contactFormValidation')

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = contactFormValidation
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({"message": error.details[0].message})

        next()
    },
    changeContactValidation: (req, res, next) => {
        const schema = contactFormValidation
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({"message": "missing fields" })

        next()
    } 
}