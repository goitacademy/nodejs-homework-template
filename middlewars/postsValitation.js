const Joi = require('joi');


module.exports = {
    addPostValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄґҐ']{3,20}$/)

                .required(),
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ua', 'org', 'net']}})
                .required(),
            phone: Joi.string()
                .pattern(/^[+0-9]{13}$/)

                .required(),
        })
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({status: validationResult.error.details[0].message})
        }

        next();
    },
    updatePostValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .pattern(/^[a-zA-Zа-яА-Я0-9іІЇєЄґҐ']{3,20}$/)
                .optional(),
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ua', 'org', 'net']}}),
            phone: Joi.string()
                .pattern(/^[+0-9]{13}$/)
                .optional(),
        })
        const validationResult = schema.validate(req.body);
        if (validationResult.error
        ) {
            return res.status(400).json({status: validationResult.error.details[0].message})
        }
        next();
    }
};
