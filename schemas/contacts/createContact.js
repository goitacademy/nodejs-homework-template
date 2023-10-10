const Joi = require('joi');

const createContactBodySchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({"any.required": `missing required name field`}),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({"any.required": `missing required email field`}),
    
    phone: Joi.string()
        .length(10)
        .pattern(/^0\d{9}$/)
        .required()
        .messages({ "any.required": `missing required phone field` }),
    
    favorite: Joi.boolean(),
}).strict(true)


module.exports = createContactBodySchema;