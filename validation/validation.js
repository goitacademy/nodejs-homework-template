const Joi = require('joi');

const schemaAddContact = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl', 'ua', 'de', 'eu'] } })
    .required(),
    phone: Joi.number()
    .pattern(new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))
    .required()

});

const schemaUpdateContact = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl', 'ua', 'de', 'eu'] } })
    .optional(),
    phone: Joi.number()
    .pattern(new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im))
    .optional(),


});

const validationAddContact = (obj) => schemaAddContact.validate(obj);
const validationUpdateContact = (obj) => schemaUpdateContact.validate(obj);

module.exports = {
    validationAddContact,
    validationUpdateContact
}