const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    
    phone: Joi.string()
        .pattern(/^[+]?[(]?[0-9]{1,3}[)]?[-s.]?[0-9]{1,3}[-s.]?[0-9]{3,6}$/im)
        .min(5)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .required(),
});

module.exports = { schema };
