const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().allow(null),
  email: Joi.string().allow(null),
  phone: Joi.string().allow(null),
}).or("name", "email", "phone");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = { addSchema, postSchema };