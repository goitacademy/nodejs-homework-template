const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z. ']+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ -./0-9]*$/)
    .length(14)
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z. ']+$/)
    .min(3)
    .max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ -./0-9]*$/)
    .length(14),
}).min(1);

module.exports = { addSchema, updateSchema };
