const Joi = require("joi");

const schemaAddContacts = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required()
})

const schemaUpdateContact=Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
})

const schemaSignupValidate = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(8).required()
})

module.exports = {
    schemaAddContacts,
    schemaUpdateContact,
    schemaSignupValidate
}