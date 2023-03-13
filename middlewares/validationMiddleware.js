const Joi = require('joi');

module.exports = {
    addContactValid: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(5)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            phone: Joi.string()
                .min(7)
                .max(30)
                .required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details })
        }

        next();
    },

    changeContactValid: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(5)
                .max(30),
            email: Joi.string()
                .email(),
            phone: Joi.string()
                .min(7)
                .max(30)
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details })
        }

        next();
    }

}