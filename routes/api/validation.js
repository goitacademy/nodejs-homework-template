const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    phone: Joi.number().integer().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
        .required(),
});

const updatedContactSchema = Joi.object({
  name: Joi.string().min(1).max(20),
  phone: Joi.number().integer(),
  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
  isVaccinated: Joi.boolean().required(),
});

const statusContactSchema = Joi.object({
    isVaccinated: Joi.boolean().required(),
});

const idSchema = Joi.object({
    id: Joi.string().pattern(/[a-zA-Z0-9_-]/).required(),
});

const validate = (schema) => async (id) => {
    try {
        await schema.validateAsync(req.body);
    } catch (err) {
        return err;
    }
};

module.exports = {
    contactSchema,
    updatedContactSchema,
    statusContactSchema,
    idSchema,
    validateContact: validate(contactSchema),
    validateStatusContact: validate(statusContactSchema),
    validateId: validate(idSchema),
};
