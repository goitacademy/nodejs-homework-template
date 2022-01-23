const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()    
    .min(2)
    .max(15)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()   
    .min(10)
    .max(20)
    .required(),
});

module.exports = contactSchema;