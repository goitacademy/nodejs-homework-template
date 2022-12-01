const Joi = require('joi');

module.exports = {
    addContactValidation: (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .regex(/^[a-zA-Z]{2,30}$/)
            .required(),

        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
        phone: Joi.string()
            .regex(/^[0-9]{10,15}$/)
            .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({
                'message': validationResult.error.details[0].message,
                'status': 400,
            });
    }

    next();
    },

    putContactValidation: (req, res, next) => {

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({'message': 'missing fields', 'status': 400});
            return;
        }

        const schema = Joi.object({
            name: Joi.string()
                .regex(/^[a-zA-Z]{2,30}$/)
                .optional(),
            

            email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
                .optional(),
            phone: Joi.string()
                .regex(/^[0-9]{10,15}$/)
                .optional(),
        });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({
            'message': validationResult.error.details[0].message,
            'status': 400,
        });
    }

    next();
    },
};
