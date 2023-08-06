const Joi = require('joi');

const schemaPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const schemaPut = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
}).or('name', 'email', 'phone');

module.exports = {
    schemaPut,
    schemaPost,
};
