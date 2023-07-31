const Joi = require('joi')


const contactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        
     email: Joi.string()
              .required()
              .email({ minDomainSegments: 2}),
            
    phone: Joi.number()
        .integer()
        .min(10)
       .required(),
})

module.exports = {
    contactSchema,
}