const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string()
        .regex(/^((8|\+7)[ ]?)?(\(?\d{3}\)?[ ]?)?[\d\- ]{7,10}$/)
        .messages({
            'string.pattern.base': `Incorrect phone number.`,
        })
        .required(),
});

module.exports = {
    addSchema,
};
