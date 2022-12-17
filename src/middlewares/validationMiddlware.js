const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .regex(/^[a-z A-Z]{2,30}$/)
            .required(),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
        phone: Joi.string()
            .regex(/^[0-9]{10,15}$/)
            .required(),
        favorite: Joi.boolean()
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message });
    }

    next();
    },

    putContactValidation: (req, res, next) => {

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({message: 'missing fields'});
            return;
        }

        const schema = Joi.object({
            name: Joi.string()
                .regex(/^[a-z A-Z]{2,30}$/)
                .optional(),
            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
                .optional(),
            phone: Joi.string()
                .regex(/^[0-9]{10,15}$/)
                .optional(),
            favorite: Joi.boolean()
                .optional()
        });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message});
    }

    next();
    },

        updateContactFavoriteValidation: (req, res, next) => {

        const schema = Joi.object({
            favorite: Joi.boolean()
                .required()
        });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({
            message: validationResult.error.message,
        });
    }

    next();
    },

    userRegisterValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
            .required(),

        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),

        subscription: Joi.string()
            .optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message });
    }

    next();
    },

    userLoginValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
            .required(),

        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({ message: validationResult.error.message });
    }

    next();
    },
};
