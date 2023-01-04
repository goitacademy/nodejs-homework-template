const Joi = require('joi');

module.exports = {
    postValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            phone: Joi.string()
                .min(5)
                .max(15)
                .required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing required name field" })
        }

        next();
    },

    putValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            phone: Joi.string()
                .min(5)
                .max(15)
                .required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing fields" })
        }

        next();
    },

    patchValidation: (req, res, next) => {
        const schema = Joi.object({
            favorite: Joi.boolean()
                .required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: "missing fields" })
        }

        next();
    }
}