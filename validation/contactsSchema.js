const Joi = require("joi");
const phoneValidator = require('joi-phone-validator');

// const schema = phoneValidator.phone().validate()
const joiContactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    // phone: Joi.validate('(294) 840-6685', schema)
});

module.exports = joiContactsSchema;