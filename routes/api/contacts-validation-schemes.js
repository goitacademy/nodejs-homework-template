const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string().required(),
})

  
module.exports = {schemaCreateContact}