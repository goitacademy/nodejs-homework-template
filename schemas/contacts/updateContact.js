const Joi = require('joi');

const updateContactBodySchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30),
  
    
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    
    phone: Joi.string()
        .length(10)
        .pattern(/^0\d{9}$/),

    
    favorite: Joi.boolean(),
});


module.exports = updateContactBodySchema;



