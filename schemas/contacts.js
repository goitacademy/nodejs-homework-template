const Joi = require('joi');

const schemaPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});
  
const schemaPut = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
});

module.exports = {
    schemaPost,
    schemaPut,
}