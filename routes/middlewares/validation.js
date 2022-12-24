const Joi = require('joi')

const contactFormValidation = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string()
        .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
        .required()
})

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = contactFormValidation;
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({status: validationResult.error.details[0].message})
        }

        next()
    },
    changeContactValidation: (req, res, next) => {
        const schema = contactFormValidation;
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({status: 400,  "message": "missing fields" })
        }

        next()
    } 
}