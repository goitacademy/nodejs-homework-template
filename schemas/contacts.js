const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required Name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required Email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required Phone field" }),
});

module.exports = { addSchema };