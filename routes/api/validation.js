const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    phone: Joi.number().integer().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
        .required(),
});

const statusContactSchema = Joi.object({
    isVaccinated: Joi.boolean().required(),
});

const idSchema = Joi.object({
    id: Joi.string().pattern(/[a-zA-Z0-9_-]/).required(),
});

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: `Field ${err.message.replace(/"/g, '')}`,
        });
    }
};

module.exports.validateContact = validate(contactSchema);
module.exports.validateStatusContact = validate(statusContactSchema);
module.exports.validateId = validate(idSchema);
