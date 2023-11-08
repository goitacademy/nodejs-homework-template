const Joi = require("joi");

const newContacts = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const editContacts = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
});

module.exports = {
    newContacts,
    editContacts
}