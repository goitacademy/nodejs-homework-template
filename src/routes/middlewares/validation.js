const { contactFormValidation, updateStatusValidation } = require('../../utils/validation/contactFormValidation')
// const {ValidationError} = require('../../helpers/errors')
module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = contactFormValidation
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({message: error.details[0].message})
        // if (error) {
        //     next(new ValidationError(error.details[0].message))
        // }

        next()
    },
    changeContactValidation: (req, res, next) => {
        const schema = contactFormValidation
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })
        // if (error) {
        //     next(new ValidationError(error.details[0].message))
        // }

        next()
    },
    updateStatusValidation: (req, res, next) => {
        const schema = updateStatusValidation
        const {error} = schema.validate(req.body)
        if (error) return res.status(400).json({ "message": "missing field favorite" })
        // if (error) {
        //     next(new ValidationError("missing field favorite"))
        // }

        next()
    },

}