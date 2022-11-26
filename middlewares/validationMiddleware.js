const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .pattern(/^[0-9-() +]+$/)
            .min(10)
            .max(30)
            .required(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },

    putContactValidation: (req, res, next) => {
        const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .optional(),
        email: Joi.string()
            .email()
            .optional(),
        phone: Joi.string()
            .pattern(/^[0-9-() +]+$/)
            .min(10)
            .max(30)
            .optional(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({message: validationResult.error.message});
        }
        next();
    },
}