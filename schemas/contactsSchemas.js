const Joi = require("joi") ;

const createContactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, })
        .required(),    
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required(),
});

const updateContactSchema = Joi.object({
    name: Joi.string()
        .min(3),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
}).min(1).messages({ "object.min": "Body must have at least one field" });

module.exports = {
    createContactSchema,
    updateContactSchema
}