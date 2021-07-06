const Joi = require("joi");

const schemaAddContacts = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone:Joi.string().min(10).required
})

module.exports = {
    schemaAddContacts
}